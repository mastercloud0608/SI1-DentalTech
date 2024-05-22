const pool = require('../../db');


/**
 * @param res ( listusers ) 
 */
const getListAllMedicine = async (_, res) => {
    const { rows } = await pool.query('SELECT * FROM medicamento order by id');
    const medicine = rows;
    res.json(medicine);
  }

/**
 * @param req ( id, nombre, cantidad , descripcion )
 * Estos datos no son  obligatorio que se envien todos,pero el body admite esos por parametro
 * @param res ( supplie ) 
 * Si el material se actualiza o no,se envia un mensaje al clinete 
 */
  const createMedicine = async (req, res) => {
    const {nombre,descripcion} = req.body;
    //const costoInt = parseInt(costo);
    await pool.query('INSERT INTO medicamento(nombre,descripcion) values ($1,$2)', [nombre,descripcion]);
    res.status(200).json({ message: 'datos del Medicamento creados' });
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
const getMedicineId = async (req, res) => {
  const { id } = req.params;
  const { rows, rowCount } = await pool.query('SELECT * FROM medicamento where id=$1', [id]);
  if (rowCount === 0) return res.status(400).json({ message: "La medicina no existe" });
  const medicine = rows[0];
  res.json(medicine);
}

/**
 * @param req ( id, nombre, cantidad , descripcion )
 * Estos datos no son  obligatorio que se envien todos,pero el body admite esos por parametro
 * @param res ( supplie ) 
 * Si el material se actualiza o no,se envia un mensaje al clinete 
 * 
 *  id serial primary key,
    nombre varchar(70)not null,
    descripcion varchar(60) not null,
    costo float not null
 */


const updateMedicine = async (req, res) => {
  const { id,nombre,descripcion} = req.body;
  
  await pool.query('UPDATE medicamento SET nombre=$2, descripcion=$3 WHERE id=$1', [ id,nombre,descripcion]);
  res.status(200).json({ message: 'datos del Tratamiento actualizados' });
}

const deleteMedicine= async (req, res) => {
    const { id } = req.params;
    const { rowCount } = await pool.query('DELETE FROM medicamento where id=$1', [id]);
    if (rowCount === 0) return res.status(400).json({ message: "El medicamento no existe" });
    res.status(200).json({ message: 'medicamento eliminado' });
  }



module.exports={
    getListAllMedicine,
    createMedicine,
    getMedicineId,
    updateMedicine,
    deleteMedicine
}