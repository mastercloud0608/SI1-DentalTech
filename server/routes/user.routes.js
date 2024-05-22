const { Router } = require('express');

const {
  registerUser,
  loginUser,
  restorePassword,
  changePassword,
  updateProfileById
} = require('../controllers/user.controller');

const {
  validateLogin,
  validateRegister,
  validateRestorePassword,
  validateChangePassword,
  validateUpdateProfileById
} = require('../middlewares/user.validator')

const router = Router();

router.post('/api/register', validateRegister, registerUser)
router.post('/api/login', validateLogin, loginUser)
router.post('/api/restore/password', validateRestorePassword, restorePassword)
router.put('/api/restore/password/change',validateChangePassword,changePassword)
router.put('/api/profile',validateUpdateProfileById,updateProfileById)

module.exports = router;