const { Router } = require('express');

const {
  getTimeLine,
  getCountUsersForDay
} = require('../controllers/Admin/admin.dashboard.controller')

const {
 createUsers,
 deleteUserId,
 getListAllUsers,
 getUserId,
 updateUserId
} = require('../controllers/Admin/admin.users.controler')

const {
  createUsersDataValidator
} =require('../middlewares/admin/admin.users.validator')

const {
  getListAllDiarysOdontologists
} = require('../controllers/Admin/admin.diarys.controller')

const {
  getListAllSupplies,
  getSupplieId,
  deleteSupplieId,
  updateSupplieId,
  createSupplie,
} = require('../controllers/Admin/admin.supplies.controller');

const {
  getListAllTreatments,
  createTreatment,
  getTreatmentId,
  updateTreatment,
  deleteTreatment
} = require('../controllers/Admin/admin.treatment.controller')

const {
  getListAllMedicine,
  createMedicine,
  getMedicineId,
  updateMedicine,
  deleteMedicine
} = require('../controllers/Admin/admin.medicine.controller');

const {
  updateUserDataValidator,
  updateSupplieDataValidator,
  createSupplieDataValidator
} = require('../middlewares/admin.validator');


const router = Router();

/**
 * !Dashboard
 */
router.get('/api/admin/timeline', getTimeLine);
router.get('/api/admin/top_services', getCountUsersForDay);


/**
 * !Users
 */
router.get('/api/admin/users', getListAllUsers);
router.get('/api/admin/user/:id', getUserId);
router.delete('/api/admin/user/delete/:id', deleteUserId);
router.put('/api/admin/user/update', updateUserDataValidator, updateUserId);
router.post('/api/admin/users/create', createUsersDataValidator, createUsers);


/**
 * !Supplies
 */
router.get('/api/admin/supplies', getListAllSupplies);
router.get('/api/admin/supplie/:id', getSupplieId);
router.delete('/api/admin/supplie/delete/:id', deleteSupplieId);
router.put('/api/admin/supplie/update', updateSupplieDataValidator, updateSupplieId);
router.post('/api/admin/supplie/create', createSupplieDataValidator, createSupplie);

/**
 * !Diarys
 */
router.get('/api/admin/diarys/odontologist', getListAllDiarysOdontologists);

/**
 * Tratamiento
 */

router.get('/api/admin/treatments', getListAllTreatments);
router.get('/api/admin/treatment/:id', getTreatmentId);
router.post('/api/admin/treatment/create', createTreatment);
router.put('/api/admin/treatment/update', updateTreatment);
router.delete('/api/admin/treatment/delete/:id', deleteTreatment);

/**
 * Medicine  (Medicamento)
 */
router.get('/api/admin/medicines', getListAllMedicine);
router.get('/api/admin/medicine/:id', getMedicineId);
router.put('/api/admin/medicine/update', updateMedicine);
router.post('/api/admin/medicine/create', createMedicine);
router.delete('/api/admin/medicine/delete/:id', deleteMedicine);

module.exports = router;