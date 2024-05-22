const { body, validationResult } = require('express-validator');

const createQuoteDataValidator = [
    body('fechacita').notEmpty().withMessage('La fecha de cita es requerida'),
    (req, res, next) => {
        const { fechacita,id_paciente,id_agenda,observaciones } = req.body;
        req.body = {
            ...(fechacita && { fechacita }),
            ...(id_paciente && { id_paciente }),
            ...(id_agenda && { id_agenda }),
            ...(observaciones && { observaciones }),
        };
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        next();
    }
]

module.exports = {
    createQuoteDataValidator
}