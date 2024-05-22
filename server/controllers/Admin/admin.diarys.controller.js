const pool = require('../../db');
const io = require('../../socket/SocketManager')

/**
 * @param res ( listsodontologists) 
 */
const getListAllDiarysOdontologists = async (_, res) => {
    const { rows, rowcount } = await pool.query('select * from usuario,odontologo where usuario.id = odontologo.usuarioid order by odontologo.id');
    if (rowcount === 0) return res.json({ message: "No hay odontologos" });
    const list = rows;
    io.emitEvent('listdiarys',list)
    res.json(list);
}

module.exports = {
    getListAllDiarysOdontologists
}