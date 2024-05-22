const pool = require('../../db');

/**
 * @param res ( listsupplies ) 
 */
const getListAllSupplies = async (_, res) => {
  const { rows } = await pool.query('SELECT * FROM material ORDER BY id');
  const list = rows;
  res.json(list);
}


/**
 * @param req ( id)
 * @param res ( supplie ) 
 * Si el material existe o no,se envia un mensaje al clinete
 */
const getSupplieId = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query('SELECT * FROM material where id=$1', [id]);
  if (rowCount === 0) return res.status(400).json({ message: "El material no existe" });
  const supplie = rows[0];
  res.json(supplie);
}


/**
 * @param req ( id )
 * @param res ( supplie delete )
 * Si el material se elimina o no,se envia un mensaje al clinete
 */
const deleteSupplieId = async (req, res) => {
  const { id } = req.params;
  const { rowCount } = await pool.query('DELETE FROM material where id=$1', [id]);
  if (rowCount === 0) return res.status(400).json({ message: "El material no existe" });
  res.status(200).json({ message: 'material eliminado' });
}


/**
 * @param req ( id, nombre, cantidad , descripcion )
 * Estos datos no son  obligatorio que se envien todos,pero el body admite esos por parametro
 * @param res ( supplie ) 
 * Si el material se actualiza o no,se envia un mensaje al clinete 
 */
const updateSupplieId = async (req, res) => {
  const { id, nombre, cantidad, descripcion } = req.body;
  const cantidadInt = parseInt(cantidad);
  await pool.query('UPDATE material SET nombre=$2, cantidad=$3, descripcion=$4  WHERE id=$1', [id, nombre, cantidadInt, descripcion]);
  res.status(200).json({ message: 'datos del material actualizados' });
}


/**
 * @param req ( nombre, cantidad , descripcion )
 * Estos datos son  obligatorio que se envien todos,menos la descripcion
 * @param res ( supplie ) 
 * Si el material se crea o no,se envia un mensaje al clinete
 */
const createSupplie = async (req, res) => {
  const { nombre, cantidad, descripcion } = req.body;
  const cantidadInt = parseInt(cantidad);
  await pool.query('INSERT INTO material (nombre,cantidad,descripcion) VALUES ($1,$2,$3)', [nombre, cantidadInt, descripcion]);
  res.status(200).json({ message: 'datos del material creado' });
}



module.exports = {
  getListAllSupplies,
  getSupplieId,
  deleteSupplieId,
  updateSupplieId,
  createSupplie,
}

