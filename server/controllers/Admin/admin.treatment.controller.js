const pool = require('../../db');


/**
 * @param res ( listusers ) 
 */
const getListAllTreatments = async (_, res) => {
    const { rows } = await pool.query('SELECT * FROM tratamiento order by id');
    const user = rows;
    res.json(user);
  }

/**
 * @param req ( id, nombre, cantidad , descripcion )
 * Estos datos no son  obligatorio que se envien todos,pero el body admite esos por parametro
 * @param res ( supplie ) 
 * Si el material se actualiza o no,se envia un mensaje al clinete 
 */
  const createTreatment = async (req, res) => {
    const { nombre,costo,duracion,descripcion } = req.body;
    const costoInt = parseInt(costo);
    await pool.query('INSERT INTO tratamiento(nombre,costo,duracion,descripcion) values ($1,$2,$3,$4)', [nombre,costoInt,duracion,descripcion]);
    res.status(200).json({ message: 'datos del tratamiento creados' });
  }
/*
  const updateSupplieId = async (req, res) => {
    const { id, nombre, cantidad, descripcion } = req.body;
    const cantidadInt = parseInt(cantidad);
    await pool.query('UPDATE material SET nombre=$2, cantidad=$3, descripcion=$4  WHERE id=$1', [id, nombre, cantidadInt, descripcion]);
    res.status(200).json({ message: 'datos del material actualizados' });
  }
  */

  /**
 * @param req ( id ) 
 * @param res ( user ) 
 * Si el usuario existe o no,se envia un mensaje al clinete
 */
const getTreatmentId = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query('SELECT * FROM tratamiento where id=$1', [id]);
  if (rowCount === 0) return res.status(400).json({ message: "El usuario no existe" });
  const treatment = rows[0];
  res.json(treatment);
}

/**
 * @param req ( id, nombre, cantidad , descripcion )
 * Estos datos no son  obligatorio que se envien todos,pero el body admite esos por parametro
 * @param res ( supplie ) 
 * Si el material se actualiza o no,se envia un mensaje al clinete 
 */
const updateTreatment = async (req, res) => {
  const { id,nombre,costo,duracion,descripcion } = req.body;
  const costoInt = parseInt(costo);
  await pool.query('UPDATE tratamiento SET nombre=$2, costo=$3, duracion=$4, descripcion=$5  WHERE id=$1', [ id,nombre,costoInt,duracion,descripcion]);
  res.status(200).json({ message: 'datos del Tratamiento actualizados' });
}

const deleteTreatment= async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query('DELETE FROM tratamiento where id=$1', [id]);
  if (rowCount === 0) return res.status(400).json({ message: "El tratamiento no existe" });
  res.status(200).json({ message: 'tratamiento eliminado' });
}



module.exports={
    getListAllTreatments,
    createTreatment,
    getTreatmentId,
    updateTreatment,
    deleteTreatment
}