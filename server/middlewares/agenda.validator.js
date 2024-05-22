const { body, validationResult } = require('express-validator');

const AgendaByIdValidator = (req, _, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
};

module.exports = {
    AgendaByIdValidator
}
