const { Router } = require('express');

const {
    getServices,
    getListAllPatients,
    getListAllSpecialisms
} = require('../controllers/odontologist.controller');

// const {
//   createQuoteDataValidator
// } = require('../middlewares/.validator');

const router = Router();

router.get('/api/odontologist/services', getServices);
router.get('/api/odontologist/patients', getListAllPatients);
router.get('/api/odontologist/specialisms', getListAllSpecialisms);


module.exports = router;