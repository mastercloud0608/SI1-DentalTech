const { body, validationResult } = require('express-validator');

const validateLogin = [
    body('username')
        .notEmpty()
        .withMessage('El nombre de usuario es requerido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es requerida'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next(); // Pasar al siguiente middleware o al controlador
    }
];

const validateRegister = [
    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('correo').notEmpty().withMessage('El correo es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next(); // Pasar al siguiente middleware o al controlador
    }
]

const validateRestorePassword = [
    body('correo')
        .notEmpty()
        .withMessage('El correo es requerido'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next(); // Pasar al siguiente middleware o al controlador
    }
];

const validateChangePassword = [
    body('password')
        .notEmpty()
        .withMessage('La nueva contraseña es requerida').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('confirm_password')
        .notEmpty()
        .withMessage('La contraseña de confirmacion debe ser igual a la nueva contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Las contraseñas no coinciden');
            }
            return true;
        }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });
        next(); // Pasar al siguiente middleware o al controlador
    }
];

const validateUpdateProfileById = [
    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('correo').notEmpty().withMessage('El correo es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('id').notEmpty().withMessage('El id es requerido'),
    (req, res, next) => {
        const { username, password, nombre, apellido, ci, telefono, correo, direccion, id } = req.body;
        req.body = {
            ...(username && { username }),
            ...(password && { password }),
            ...(nombre && { nombre }),
            ...(apellido && { apellido }),
            ...(correo && { correo }),
            ...(telefono && { telefono }),
            ...(direccion && { direccion }),
            ...(ci && { ci }),
            ...(id && { id }),
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]


module.exports = {
    validateLogin,
    validateRegister,
    validateRestorePassword,
    validateChangePassword,
    validateUpdateProfileById
}
