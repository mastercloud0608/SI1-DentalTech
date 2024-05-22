const express = require('express');

// const {
//     upload,
//     uploadFile
// } = require('../controllers/reportes/upload.controller');

const {
    getReporte
} = require('../controllers/reports.controller');


const router = express.Router();

// router.post(
//     '/api/upload',
//     upload,
//     uploadFile
// );

router.post('/api/reporte', getReporte);


module.exports = router;