const { body,validationResult } = require('express-validator');

const createUsersDataValidator = [
    body('users')
      .isArray({ min: 1 })
      .withMessage('Se debe enviar al menos un usuario en forma de objeto'),
    body('users.*.username')
      .notEmpty()
      .withMessage('El nombre de usuario es requerido'),
    body('users.*.password')
      .notEmpty()
      .withMessage('La contraseña es requerida')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('users.*.correo').notEmpty().withMessage('El correo es requerido'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
      next();
    },
  ];


module.exports = {
    createUsersDataValidator
}
