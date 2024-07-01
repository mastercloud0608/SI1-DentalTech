const pool = require('../db');


/**
 * @param res ( tratamiento ) 
 * Manda una lista 
 */
const getServices = async (_, res) => {
    const { rows,rowcount } = await pool.query('SELECT * FROM tratamiento ORDER BY id');
    const services = rows;
    if(rowcount ===0) return res.json({mesage:"No hay data"})
    res.json(services);
}

/**
 * @param res ( listusers ) 
 */
const getListAllPatients = async (_, res) => {
    const { rows,rowcount } = await pool.query("select * from usuario where rol='patient'");
    if(rowcount ===0) return res.json({mesage:"No hay data"})
    const user = rows;
    res.json(user);
}

/**
 * @param res ( listspecialism ) 
 */
const getListAllSpecialisms = async (_, res) => {
    const { rows,rowcount } = await pool.query("select * from especialidad");
    if(rowcount ===0) return res.json({mesage:"No hay data"})
    const specialisms = rows;
    res.json(specialisms);
}


module.exports = {
    getServices,
    getListAllPatients,
    getListAllSpecialisms
}

