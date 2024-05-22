const { body, validationResult } = require('express-validator');

const updateUserDataValidator = [
    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('correo').notEmpty().withMessage('El correo es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    (req, res, next) => {
        const { id, username, nombre, apellido, correo, telefono, direccion, ci, rol, password } = req.body;
        req.body = {
            ...(id && { id }),
            ...(username && { username }),
            ...(nombre && { nombre }),
            ...(apellido && { apellido }),
            ...(correo && { correo }),
            ...(telefono && { telefono }),
            ...(direccion && { direccion }),
            ...(ci && { ci }),
            ...(rol && { rol }),
            ...(password && { password }),
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]

const updateSupplieDataValidator = (req, _, next) => {
    const { id, nombre, cantidad, descripcion } = req.body;
    req.body = {
        ...(id && { id }),
        ...(nombre && { nombre }),
        ...(cantidad && { cantidad }),
        ...(descripcion && { descripcion }),
    };
    next();
};


const createSupplieDataValidator = [
    body('nombre').notEmpty().withMessage('El nombre del material es requerido'),
    body('cantidad').notEmpty().withMessage('La cantidad es requerido'),
    (req, res, next) => {
        const { nombre, cantidad, descripcion } = req.body;
        req.body = {
            ...(nombre && { nombre }),
            ...(cantidad && { cantidad }),
            ...(descripcion && { descripcion }),
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]


const createUserDataValidator = [
    body('username').notEmpty().withMessage('El nombre de usuario es requerido'),
    body('correo').notEmpty().withMessage('El correo es requerido'),
    body('password').notEmpty().withMessage('La contraseña es requerida').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('rol').notEmpty().withMessage('El rol es requerido'),
    (req, res, next) => {
        const { username, password, nombre, apellido, ci, telefono, correo, direccion, rol } = req.body;
        req.body = {
            ...(username && { username }),
            ...(password && { password }),
            ...(nombre && { nombre }),
            ...(apellido && { apellido }),
            ...(correo && { correo }),
            ...(telefono && { telefono }),
            ...(direccion && { direccion }),
            ...(ci && { ci }),
            ...(rol && { rol }),
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]


module.exports = {
    updateUserDataValidator,
    updateSupplieDataValidator,
    createUserDataValidator,
    createSupplieDataValidator,
}
