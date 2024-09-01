const async = require('async')
const { Op, Trasaction } = require("sequelize")
const { sequelize } = require("../index")
const { Transaction } = require("sequelize")
const callback = require('../helpers/callback')
const jurusans_model = require('../models/jurusan')

class jurusanController {
    static jurusan_entity(jurusan) {
        return {
            id: jurusan.id,
            nama_jurusan: jurusan.nama_jurusan,
            kode_jurusan: jurusan.kode_jurusan
        }
    }
    static async get_list_jurusan(req, res) {
        async.waterfall([
            (next) => {
                jurusans_model.findAll()
                .then((result) => {
                    next(null, { jurusan: result })
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
        ], (err, result) => {
            if (err) {
                res.status(500).json({ error: err.message });
            } else {
                const jurusans = []
                for (let i = 0; i < result?.jurusan?.length; i++) {
                    let jurusan = result.jurusan[i]
                    jurusan = jurusanController.jurusan_entity(jurusan)
                    jurusans.push(jurusan)
                }
                res.json({results: jurusans});
            }
        })
    }

    static async create_jurusan(req, res) {
        const { body } = req
        const { nama_jurusan, kode_jurusan } = body

        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                jurusans_model.findOne({
                    where: {
                        [Op.or]: [
                            { nama_jurusan },
                            { kode_jurusan }
                        ]
                    },
                    transaction: trx
                })
                .then((result) => {
                    if (result && result?.nama_jurusan == nama_jurusan) return next(callback.nama_jurusan_already_exist())
                    if (result && result?.kode_jurusan == kode_jurusan) return next(callback.kode_jurusan_already_exist())
                    next()
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
            (next) => {
                jurusans_model.create({
                    nama_jurusan,
                    kode_jurusan,
                }, { transaction: trx })
                .then((result) => {
                    next(null, { jurusan: result })
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
                res.json(jurusanController.jurusan_entity(data?.jurusan));
            }
        })
    }

    static async update_jurusan(req, res) {
        const { params, body } = req
        const id = params.id
        const nama_jurusan = body?.nama_jurusan
        const kode_jurusan = body?.kode_jurusan

        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                jurusans_model.findOne({
                    where: {
                        [Op.or]: [
                            { id },
                            { nama_jurusan },
                            { kode_jurusan }
                        ]
                    }, transaction: trx
                })
                .then((result) => {
                    if (!result) return next(callback.data_not_found())
                    if (result.nama_jurusan == nama_jurusan) return next(callback.nama_jurusan_already_exist())
                    if (result.kode_jurusan == kode_jurusan) return next(callback.kode_jurusan_already_exist())
                    next()
                })
                .catch((err) => {
                    return res.json(err)
                })
            },
            (next) => {
                const payload = {}
                if (nama_jurusan) payload.nama_jurusan = nama_jurusan
                if (kode_jurusan) payload.kode_jurusan = kode_jurusan

                jurusans_model.update(payload, {
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

    static async delete_jurusan(req, res) {
        const { params } = req
        const id = params.id

        const trx = await sequelize.transaction({ isolationLevel: Transaction.ISOLATION_LEVELS.READ_UNCOMMITTED })
        async.waterfall([
            (next) => {
                jurusans_model.findOne({
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
                jurusans_model.destroy({
                    where: {
                        id
                    }
                })
                .then((result) => {
                    next()
                })
                .catch((err) => { return res.json(err) })
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

module.exports = jurusanController