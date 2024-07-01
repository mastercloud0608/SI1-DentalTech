const pool = require('../db');

// Obtener el odontograma de un paciente
exports.getOdontograma = async (req, res) => {
  const { patientId } = req.params;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM odontogramas WHERE patient_id = $1', [patientId]);
    client.release();
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el odontograma', error);
    res.status(500).send('Error al obtener el odontograma');
  }
};

// Guardar o actualizar el odontograma de un paciente
exports.saveOdontograma = async (req, res) => {
  const { patientId, teeth } = req.body;
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM odontogramas WHERE patient_id = $1', [patientId]);
    
    if (result.rows.length > 0) {
      // Actualizar odontograma existente
      await client.query('UPDATE odontogramas SET teeth = $1 WHERE patient_id = $2', [teeth, patientId]);
    } else {
      // Crear un nuevo odontograma
      await client.query('INSERT INTO odontogramas (patient_id, teeth) VALUES ($1, $2)', [patientId, teeth]);
    }
    
    client.release();
    res.send('Odontograma guardado correctamente');
  } catch (error) {
    console.error('Error al guardar el odontograma', error);
    res.status(500).send('Error al guardar el odontograma');
  }
};
