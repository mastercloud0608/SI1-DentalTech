const pool = require('../db');


/**
 * @param req ( fecha_cita )
 * El dato que se recibe es el dia que el paciente selecciona en el calendario
 * @param res ( cita ) 
 * Si hay campo disponible en la fecha que selecciono el paciente se manda un mensaje de oc,
 * pero si no lo hay se le avisa pora que selecciona otro dia.
 */
const createQuote = async (req, res) => {
    const { fechacita,id_paciente,id_agenda,observaciones } = req.body;
    await pool.query('INSERT INTO cita(fecharegistro,fechacita,id_paciente,id_agenda,estado,observaciones) values (current_timestamp,$1,$2,$3,$4,$5)', [fechacita,id_paciente,id_agenda,true,observaciones]);
    res.status(200).json({ message: 'Cita creada con exito' });
}


/**
 * @param req ( id )
 * El dato que recibe es el id del usuario actual en la web
 * @param res ( id_paciente ) 
 */
const getPatientById = async (req, res) => {
    const { id } = req.params;
    const {rows,rowCount} =await pool.query('select paciente.id from usuario,paciente where paciente.usuarioid = $1', [id]);
    if(rowCount===0) return res.json({message:"El paciente no existe"});
    const patient = rows[0];
    res.json(patient);
}


module.exports = {
    createQuote,
    getPatientById
}