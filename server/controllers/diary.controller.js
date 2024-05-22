const pool = require('../db');


/**
 * @param req ( id )
 * Recibe el id del odontologo del cual buscar su agenda
 * @param res ( agenda ) 
 * Responde con los datos necesarios que viene de la tabla agenda.
 */
const getAgendaById = async (req, res) => {
    const { id } = req.params;
    const { rows, rowcount } = await pool.query('select * from odontologo,agenda where  agenda.id_odontologo = $1 and odontologo.id = $1', [id]);
    if (rowcount === 0) return res.status(400).json({ message: "La agenda no existe" });
    const agenda = rows[0];
    res.json(agenda);
}


/**
 * @param req ( idespecialidad )
 * Recibe el id del odontologo del cual buscar su agenda
 * @param res ( odontologid ) 
 * Responde con los datos necesarios que viene de la tabla agenda.
 */
const getAgendaByIdEspecialism = async (req, res) => {
    const { id } = req.params;
    const { rows, rowcount } = await pool.query('select agenda.id as id_agenda,agenda.*,odontologo.*, odontologo_especialidad.* from  agenda,odontologo,odontologo_especialidad where agenda.id_odontologo=odontologo.id and odontologo_especialidad.id_especialidad = $1 and odontologo_especialidad.id_odontologo = odontologo.id', [id]);
    if (rowcount === 0) return res.status(400).json({ message: "El id no existe" });
    const odontologid = rows[0];
    res.json(odontologid);
}



module.exports = {
    getAgendaById,
    getAgendaByIdEspecialism
}