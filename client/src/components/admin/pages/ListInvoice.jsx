import React, { useState } from 'react';
import { getReport } from '../../../services/adminApi';

export const ListInvoice = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleGenerateReport = async () => {
    // Aquí deberías implementar la lógica para generar el reporte con las fechas seleccionadas
    // Por ejemplo, puedes utilizar las fechas startDate y endDate para filtrar los datos y generar el reporte en formato PDF
    await getReport()
    console.log('Generar reporte con fechas:', startDate, endDate);
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '10px',
    textAlign: 'center',
  };

  const inputStyle = {
    width: '200px',
    padding: '5px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      
      <label style={labelStyle}>
        Fecha Inicial:
        <input
          style={inputStyle}
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label style={labelStyle}>
        Fecha Final:
        <input
          style={inputStyle}
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <button style={buttonStyle} onClick={handleGenerateReport}>
        Generar Reporte
      </button>
    </div>
  );
};

