const { Router } = require('express');

const {
    getAgendaById,
    getAgendaByIdEspecialism
} = require('../controllers/diary.controller');

const {
    AgendaByIdValidator
} = require('../middlewares/agenda.validator');

const router = Router();

router.get('/api/diary/:id', getAgendaById);
router.get('/api/diary/odontologist/:id', getAgendaByIdEspecialism);

module.exports = router;

