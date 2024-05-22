const pool = require('../db');

/**
 * @param req ( username , password ) 
 * @param res ( user ) 
 */
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const { rowCount, rows } = await pool.query('SELECT * FROM usuario WHERE username=$1 and password=$2', [username, password]);
  if (rowCount === 0) return res.status(401).json({ message: "Nombre de usuario o contraseña incorrectos" });
  const user = rows[0];
  res.json(user);
}


/**
 * @param req ( username , password , email )
 * Cuando se registra un usuario por la web,por defecto recibe el rol de paciente. 
 * @param res ( message confirmation ) 
 */
const registerUser = async (req, res) => {
  const { username, password, correo } = req.body;
  await pool.query('INSERT INTO usuario(username,password,correo,rol) values ($1,$2,$3,$4)', [username, password, correo, 'patient'])
  res.status(200).json({ message: 'nuevo usuario registrado' });
}


/**
 * @param req ( username , password ) 
 * @param res ( user ) 
 */
const restorePassword = async (req, res) => {
  const { correo } = req.body;
  const { rowCount, rows } = await pool.query('SELECT * FROM usuario WHERE correo=$1', [correo]);
  if (rowCount === 0) return res.status(401).json({ message: "El correo no existe" });
  const user = rows[0];
  res.json(user);
}


/**
 * @param req ( username , password ) 
 * @param res ( user ) 
 */
const changePassword = async (req, res) => {
  const { password,id } = req.body;
  await pool.query('UPDATE usuario SET password=$2 WHERE id=$1', [id,password]);
  res.status(200).json({ message: 'contraseña actualizada con exito' });
}


/**
 * @param req ( username,password,nombre,apellido,ci,telefono,correo,direccion,rol )
 * Estos datos no son  obligatorio que se envien todos,pero el body admite esos por parametro,los que si son ubligatorio son: username,password,correo y rol.
 * @param res ( user ) 
 * Si el usuario se crea o no,se envia un mensaje al clinete
 */
const updateProfileById = async (req, res) => {
  const { username,password,nombre,apellido,ci,telefono,correo,direccion,id} = req.body;
  await pool.query('UPDATE usuario SET username=$1,password=$2,nombre=$3,apellido=$4,ci=$5,telefono=$6,correo=$7,direccion=$8 where id=$9', [username,password,nombre,apellido,ci,telefono,correo,direccion,id]);
  res.status(200).json({ message: 'Datos del usuario actualizados' });
}


module.exports = {
  registerUser,
  loginUser,
  restorePassword,
  changePassword,
  updateProfileById
}



