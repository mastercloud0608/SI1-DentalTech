const pool = require('../../db');

/**
 * @param req ( username,password,telefono )
 * @param res ( user ) 
 * Si el usuario se crea o no,se envia un mensaje al clinete
 */
const createUsers = async (req, res) => {
    const { users, rol } = req.body;
    for (const user of users) {
        const { username, password, correo, selectedEspecialidadId } = user;
        const { rows } = await pool.query('INSERT INTO usuario (username, password, correo,rol) VALUES ($1, $2, $3, $4) RETURNING id', [username, password, correo, rol]);
        if (rol === 'odontologist') {
            const usuarioId = rows[0].id;
            const odontologoIdResult = await pool.query('SELECT odontologo.id FROM usuario,odontologo where $1 = odontologo.usuarioid and usuario.id = odontologo.usuarioid', [usuarioId]);
            const odontologoId = odontologoIdResult.rows[0].id;

            selectedEspecialidadId.forEach(async (especialidadId) => {
                await pool.query('INSERT INTO odontologo_especialidad (id_especialidad, id_odontologo) VALUES ($1, $2)', [especialidadId, odontologoId]);
            });
        }
    }
    res.status(200).json({ message: 'Usuarios guardados correctamente' });
};


/**
 * @param res ( listusers ) 
 */
const getListAllUsers = async (_, res) => {
    const { rows } = await pool.query('SELECT * FROM usuario ORDER BY id');
    const user = rows;
    res.json(user);
}

/**
 * @param req ( id ) 
 * @param res ( user ) 
 * Si el usuario existe o no,se envia un mensaje al clinete
 */
const getUserId = async (req, res) => {
    const { id } = req.params;
    const { rows, rowCount } = await pool.query('SELECT * FROM usuario where id=$1', [id]);
    if (rowCount === 0) return res.status(400).json({ message: "El usuario no existe" });
    const user = rows[0];
    res.json(user);
}


/**
 * @param req ( id )
 * @param res ( user delete ) 
 * Si el usuario se elimina o no,se envia un mensaje al clinete
 */
const deleteUserId = async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM usuario where id=$1', [id]);
    if (rowCount === 0) return res.status(400).json({ message: "El usuario no existe" });
    res.status(200).json({ message: 'usuario eliminado' });
}


/**
 * @param req ( id, username, nombre, apellido, correo, telefono, direccion, ci )
 * Estos datos no son  obligatorio que se envien todos,pero el body admite esos por parametro
 * @param res ( user ) 
 * Si el usuario se actualiza o no,se envia un mensaje al clinete
 */
const updateUserId = async (req, res) => {
    const { id, username, nombre, apellido, correo, telefono, direccion, ci, rol, password } = req.body;
    await pool.query('UPDATE usuario SET username=$2, nombre=$3, apellido=$4,correo=$5,telefono=$6,direccion=$7,ci=$8,password=$9,rol=$10  WHERE id=$1', [id, username, nombre, apellido, correo, telefono, direccion, ci, password, rol]);
    res.status(200).json({ message: 'datos del usuario actualizados' });
}



module.exports = {
    createUsers,
    deleteUserId,
    getUserId,
    updateUserId,
    getListAllUsers
}