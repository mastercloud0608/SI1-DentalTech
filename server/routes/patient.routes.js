const { Router } = require('express');

const {
  createQuote, getPatientById
} = require('../controllers/patient.controller');

const {
  createQuoteDataValidator
} = require('../middlewares/patient.validator');

const router = Router();

router.post('/api/patient/create/quote',createQuoteDataValidator, createQuote);
router.get('/api/patient/:id',getPatientById);


module.exports = router;