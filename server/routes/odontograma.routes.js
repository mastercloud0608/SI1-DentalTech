const express = require('express');
const router = express.Router();
const odontogramaController = require('../controllers/odontogramaController');

router.get('/:patientId', odontogramaController.getOdontograma);
router.post('/', odontogramaController.saveOdontograma);

module.exports = router;
