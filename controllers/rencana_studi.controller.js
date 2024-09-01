const async = require('async')
const { Op, Trasaction } = require("sequelize")
const { sequelize } = require("../index")
const { Transaction } = require("sequelize")
const callback = require('../helpers/callback')
require('dotenv').config()
const { env } = process;
const { MAX_MATA_KULIAH, MAX_MAHASISWA } = process.env

const rencana_studi_mahasiswas_model = require('../models/rencana_studi_mahasiswa')
const mahasiswa_model = require('../models/mahasiswa')
const mata_kuliahs_model = require('../models/mata_kuliah')
const jurusans_model = require('../models/jurusan')

const mata_kuliahController = require('./mata_kuliah.controller')
const mahasiswaController = require('./mahasiswa.controller')

class rencana_kuliahController {
    static rencana_kuliah_entity(rk_kuliah){
        return {
            id: rk_kuliah.id,
            mahasiswa: mahasiswaController.mahasiswa_entity(rk_kuliah?.mahasiswa) || null,
            mata_kuliah: mata_kuliahController.mata_kuliah_entity(rk_kuliah?.mata_kuliah) || null
        }
    }

    static async get_list_rencana_studi(req, res) {
        async.waterfall([
            (next) => {
                rencana_studi_mahasiswas_model.findAll({
                    include: [
                        {model: mahasiswa_model},
                        {
                            model: mata_kuliahs_model,
                            include: { model: jurusans_model }
                        }
                    ]
                })
                .then((result) => {
                    next(null, {rencana_studi: result})
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
        ], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                const rencana_studis = []
                for (let i = 0; i < result?.rencana_studi?.length; i++) {
                    let rencana_studi = result.rencana_studi[i].dataValues
                    rencana_studi = rencana_kuliahController.rencana_kuliah_entity(rencana_studi)
                    rencana_studis.push(rencana_studi)
                }
                res.json({results: rencana_studis});
            }
        })
    }

    static async get_rencana_studi_by_mahasiswa(req, res) {
        const { params } = req
        const mahasiswa_id = params?.mahasiswa_id
        async.waterfall([
            (next) => {
                rencana_studi_mahasiswas_model.findOne({
                    where: {
                        mahasiswa_id
                    },
                    include: [
                        {model: mahasiswa_model},
                        {
                            model: mata_kuliahs_model,
                            include: { model: jurusans_model }
                        }
                    ]
                })
                .then((result) => {
                    next(null, {rencana_studi: result})
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
        ], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({result: rencana_kuliahController.rencana_kuliah_entity(result?.rencana_studi)});
            }
        })
    }

    static async create_rencana_studi(req, res) {
        const { body } = req
        const mahasiswa_id= body?.mahasiswa_id
        const mata_kuliah_id= body?.mata_kuliah_id

        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                mahasiswa_model.findOne({
                    where: {
                        id: mahasiswa_id
                    },
                    transaction: trx
                })
                .then((result) => {
                    if(!result) return next(callback.mahasiswa_not_found())
                    next(null, {mahasiswa: result.dataValues})
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
            (data, next) => {
                mata_kuliahs_model.findOne({
                    where: { 
                        id: mata_kuliah_id
                    },
                    include: { model: jurusans_model },
                    transaction: trx
                })
                .then((result) => {
                    if(!result) return next(callback.max_mata_kuliah_taken())
                    next(null, {...data, mata_kuliah: result.dataValues})
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
            (data, next) => {
                rencana_studi_mahasiswas_model.findAll({
                })
                .then((result) => {
                    const max_mahasiswa_take_mk = result.filter(val => val.mahasiswa_id == mahasiswa_id).map(val => val.id)
                    const max_mk_taken_by_mahasiswa = result.filter(val => val.mata_kuliah_id == mata_kuliah_id).map(val => val.id)
                    /* Validation max mahasiswa take mata kuliah*/
                    if(max_mahasiswa_take_mk?.length >= +MAX_MAHASISWA ) return next(callback.max_take_mata_kuliah())
                    
                    /* Validation max matakuliah taken by mahasiswa */
                    if(max_mk_taken_by_mahasiswa?.length >= +MAX_MATA_KULIAH) return next(callback.matakuliah_already_max())
                    for (let i = 0; i < result?.length; i++) {
                        let rk = result[i].dataValues
                    }
                    
                    next(null, data)
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
            (data, next) => {
                rencana_studi_mahasiswas_model.create({
                    mahasiswa_id,
                    mata_kuliah_id,
                })
                .then((result) => {
                    next(null, {...data, rencana_studi_mahasiswa: result.dataValues})
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
        ], (err, data) => {
            if (err) {
                trx.rollback()
                res.status(500).json({ error: err.message });
            } else {
                trx.commit()
                const result = {}
                result.rencana_studi_mahasiswa = data?.rencana_studi_mahasiswa
                result.rencana_studi_mahasiswa.mahasiswa = data?.mahasiswa
                result.rencana_studi_mahasiswa.mata_kuliah = data?.mata_kuliah
                res.json(rencana_kuliahController.rencana_kuliah_entity(result?.rencana_studi_mahasiswa));
            }
        })
    }

    static async update_rencana_studi(req, res) {
        const { params, body } = req
        const id = params.id
        const mahasiswa_id = body?.mahasiswa_id
        const mata_kuliah_id = body?.mata_kuliah_id

        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                rencana_studi_mahasiswas_model.update({
                    mahasiswa_id,
                    mata_kuliah_id
                }, {
                    where: {
                        id
                    }
                })
                .then((result) => {
                    next()
                })
                .catch((err) => {
                    return res.json(err)
                })
            }
        ], (err, data) => {
            if (err) {
                trx.rollback()
                res.status(500).json({ error: err.message });
            } else {
                trx.commit()
                res.json({ result: 'data success updated' });
            }
        })
        
    }

    static async delete_rencana_studi(req, res) {
        const { params  } = req
        const id = params.id
        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                rencana_studi_mahasiswas_model.findOne({
                    where: { id },
                    transaction: trx
                })
                .then((result) => {
                    if (!result) return next(callback.data_not_found())
                    next()
                })
                .catch((err) => { return res.json(err) })
            },
            (next) => {
                rencana_studi_mahasiswas_model.destroy({
                    where: {
                        id
                    }
                })
                .then((result) => {
                    next()
                })
                .catch((err) => {
                    return res.json(err)
                })
            }
        ], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ result: 'data success deleted' });
            }
        })
        
    }

}

module.exports = rencana_kuliahController