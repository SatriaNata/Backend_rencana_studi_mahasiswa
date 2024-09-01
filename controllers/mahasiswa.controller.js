const async = require('async')
const { Op, Trasaction } = require("sequelize")
const { sequelize } = require("../index")
const { Transaction } = require("sequelize")
const callback = require('../helpers/callback')
const utils = require('../helpers/utils')

const mahasiswa_model = require('../models/mahasiswa')


class mahasiswaController {
    static mahasiswa_entity(mahasiswa){
        return {
            id: mahasiswa?.id,
            nim: mahasiswa?.nim || null,
            nama: mahasiswa?.nama || null,
            email: mahasiswa?.email || null,
            no_hp: mahasiswa?.no_hp || null,
            alamat: mahasiswa?.alamat || null
        }
    }
    static async get_list_mahasiswa(req, res) {
        async.waterfall([
            (next) => {
                mahasiswa_model.findAll()
                .then((result) => {
                    next(null, { mahasiswa: result })
                })
                .catch((err) => {
                    return res.json(err)
                })
            }
        ], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                const mahasiswas = []
                for (let i = 0; i < result?.mahasiswa?.length; i++) {
                    let mahasiswa = result.mahasiswa[i]
                    mahasiswa = mahasiswaController.mahasiswa_entity(mahasiswa)
                    mahasiswas.push(mahasiswa)
                }
                res.json({results: mahasiswas});
            }
        })
    }

    static async get_mahasiswa_by_id(req, res) {
        const { params } = req
        const id = params?.id
        async.waterfall([
            (next) => {
                mahasiswa_model.findOne({
                    where: {
                        id
                    }
                })
                .then((result) => {
                    if(!result) return next(callback.data_not_found())
                    next(null, { mahasiswa: result })
                })
                .catch((err) => {
                    return res.json(err)
                })
            }
        ], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {                    
                res.json({result: mahasiswaController.mahasiswa_entity(result?.mahasiswa)});
            }
        })
    }

    static async create_mahasiswa(req, res) {
        const { body } = req
        const { nim, nama, email, no_hp, alamat } = body
        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        
        async.waterfall([
            (next) => {
                /* check validation format */
                if(email && !utils.check_format_format(email)) return next(callback.wrong_format_email())
                if(nim && !utils.check_format_nim(nim)) return next(callback.wront_format_nim())
                next()
            },
            (next) => {
                mahasiswa_model.create({
                    nim,
                    nama,
                    email,
                    no_hp,
                    alamat
                })
                .then((result) => {
                    next(null, { mahasiswa: result })
                })
                .catch((err) => {
                    return res.json(err)
                })
            }
        ], (err, result) => {
            if (err) {
                trx.rollback()
                res.status(500).json({ error: err.message });
            } else {
                trx.commit()
                res.json({result: mahasiswaController.mahasiswa_entity(result?.mahasiswa?.dataValues)});
            }
        })
        
    }

    static async update_mahasiswa(req, res) {
        const { params, body } = req
        const id = params.id
        const nim = body?.nim
        const nama = body?.nama
        const email = body?.email
        const no_hp = body?.no_hp
        const alamat = body?.alamat
        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        
        async.waterfall([
            (next) => {
                /* check validation format */
                if(email && !utils.check_format_format(email)) return next(callback.wrong_format_email())
                if(nim && !utils.check_format_nim(nim)) return next(callback.wront_format_nim())
                next()
            },
            (next) => {
                mahasiswa_model.findOne({
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
                const payload = {}
                if (nim) payload.nim = nim
                if (nama) payload.nama = nama
                if (email) payload.email = email
                if (no_hp) payload.no_hp = no_hp
                if (alamat) payload.alamat = alamat
                
                mahasiswa_model.update(payload, {
                    where: {
                        id
                    }, transaction: trx
                })
                .then((result) => {
                    next()
                })
                .catch((err) => { return res.json(err) })
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

    static async delete_mahasiswa(req, res) {
        const { params  } = req
        const id = params.id
        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                mahasiswa_model.destroy({
                    where: {
                        id
                    }
                })
                .then((result) => {
                    res.json(result)
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

module.exports = mahasiswaController