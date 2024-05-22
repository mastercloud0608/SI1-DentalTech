const pool = require('../../db');
const io = require('../../socket/SocketManager')

/**
 * @param res ( listTimeLine ) 
 * Lista de los eventos recientes que ocuren en la web
 */

const getTimeLine = async (_, res) => {
    const { rows, rowcount } = await pool.query('SELECT * FROM log_usuario ORDER BY id DESC LIMIT 4');
    if (rowcount === 0) return res.json({ message: 'No hay eventos en la linea del tiempo' })
    const time = rows;
    io.emitEvent('timeline',time)
    res.json(time);
}

/**
 * @param res ( count ) 
 * Cantidad de usuarios por dia
 */

const getCountUsersForDay = async (_, res) => {
    // const { rows,rowcount } = await pool.query('SELECT contar_usuarios_nuevos_por_dia() as count_users;');
    const { rows,rowcount } = await pool.query('SELECT * FROM contar_usuarios_nuevos_por_dia() as count_users;');
    if (rowcount === 0) return res.json({ message: 'No hay eventos en los usuarios por dia' })
    const count_users = rows[0];
    io.emitEvent('usercountday',count_users)
    res.json(count_users);
}


module.exports = {
    getTimeLine,
    getCountUsersForDay
}
