const async = require('async')
const { Op, Trasaction } = require("sequelize")
const { sequelize } = require("../index")
const { Transaction } = require("sequelize")
const callback = require('../helpers/callback')
const jurusanController = require('./jurusan.controller')
const mata_kuliahs_model = require('../models/mata_kuliah')
const jurusans_model = require('../models/jurusan')

class mata_kuliahController {
    static mata_kuliah_entity(mata_kuliah) {
        console.log("abcccc===>",mata_kuliah)
        return {
            id: mata_kuliah.id,
            jurusan: mata_kuliah.jurusan?.nama_jurusan || null,
            kode_jurusan: mata_kuliah.jurusan?.kode_jurusan || null,
            nama_mata_kuliah: mata_kuliah.nama_mata_kuliah
        }
    }
    static async get_list_mata_kuliah(req, res) {
        async.waterfall([
            (next) => {
                mata_kuliahs_model.findAll({
                    where: {},
                    include: [
                        { model: jurusans_model }
                    ]
                })
                .then((result) => {
                    next(null, { mata_kuliah: result })
                })
                .catch((err) => {
                    return res.json(err)
                })
            }
        ], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                const mata_kuliahs = []
                for (let i = 0; i < result?.mata_kuliah?.length; i++) {
                    let mata_kuliah = result.mata_kuliah[i]
                    mata_kuliah = mata_kuliahController.mata_kuliah_entity(mata_kuliah)
                    mata_kuliahs.push(mata_kuliah)
                }
                res.json({results: mata_kuliahs});
            }
        })
    }

    static async create_mata_kuliah(req, res) {
        const { body } = req
        const { jurusan_id, nama_mata_kuliah } = body

        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                jurusans_model.findOne({
                    where: { id: jurusan_id }
                }, { transaction: trx })
                .then((result) => {
                    next(null, { jurusan: result })
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
            (data, next) => {
                mata_kuliahs_model.create({
                    jurusan_id,
                    nama_mata_kuliah,
                }, { transaction: trx })
                .then((result) => {
                    next(null, { ...data, mata_kuliah: result })
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
                console.log("data==>", data)
                let mata_kuliah = {}
                mata_kuliah = data?.mata_kuliah
                mata_kuliah.jurusan = data?.jurusan

                console.log("mata_kuliah 222==>", mata_kuliah)
                res.json(mata_kuliahController.mata_kuliah_entity(mata_kuliah));
            }
        })
    }

    static async update_mata_kuliah(req, res) {
        const { params, body } = req
        const id = params.id
        const jurusan_id = body?.jurusan_id
        const nama_mata_kuliah = body?.nama_mata_kuliah

        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                mata_kuliahs_model.findOne({
                    where: {
                        id
                    }, transaction: trx
                })
                .then((result) => {
                    if (!result) return next(callback.data_not_found())
                    next()
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
            (next) => {
                mata_kuliahs_model.update({
                    jurusan_id,
                    nama_mata_kuliah
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

    static async delete_mata_kuliah(req, res) {
        const { params  } = req
        const id = params.id
        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                mata_kuliahs_model.destroy({
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
        ],(err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                res.json({ result: 'data success deleted' });
            }
        })
        
    }

}

module.exports = mata_kuliahController