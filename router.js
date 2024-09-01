var express = require('express')
var router = express.Router()
const multer = require('multer')

const upload = multer()

const mahasiswaController = require('./controllers/mahasiswa.controller')
const jurusanController = require('./controllers/jurusan.controller')
const mata_kuliahController = require('./controllers/mata_kuliah.controller')
const rencana_studiController = require('./controllers/rencana_studi.controller')

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('connect to server');
});

/* mahasiswa */
router.get('/mahasiswa', mahasiswaController.get_list_mahasiswa)
router.get('/mahasiswa/:id', mahasiswaController.get_mahasiswa_by_id)
router.post('/mahasiswa', upload.none(), mahasiswaController.create_mahasiswa)
router.patch('/mahasiswa/:id', upload.none(), mahasiswaController.update_mahasiswa)
router.delete('/mahasiswa/:id', upload.none(), mahasiswaController.delete_mahasiswa)

/* jurusan */
router.get('/jurusan', jurusanController.get_list_jurusan)
router.post('/jurusan', upload.none(), jurusanController.create_jurusan)
router.patch('/jurusan/:id', upload.none(), jurusanController.update_jurusan)
router.delete('/jurusan/:id', upload.none(), jurusanController.delete_jurusan)

/* mata kuliah */
router.get('/mata_kuliah', mata_kuliahController.get_list_mata_kuliah)
router.post('/mata_kuliah', upload.none(), mata_kuliahController.create_mata_kuliah)
router.patch('/mata_kuliah/:id', upload.none(), mata_kuliahController.update_mata_kuliah)
router.delete('/mata_kuliah/:id', upload.none(), mata_kuliahController.delete_mata_kuliah)

/* rencana_studi */
router.get('/rencana_studi', rencana_studiController.get_list_rencana_studi)
router.get('/rencana_studi/:mahasiswa_id', rencana_studiController.get_rencana_studi_by_mahasiswa)
router.post('/rencana_studi', upload.none(), rencana_studiController.create_rencana_studi)
router.patch('/rencana_studi/:id', upload.none(), rencana_studiController.update_rencana_studi)
router.delete('/rencana_studi/:id', upload.none(), rencana_studiController.delete_rencana_studi)



module.exports = router;
