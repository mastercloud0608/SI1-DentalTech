const pdfkit = require('pdfkit');
const fs = require('fs');


const getReporte = async (req, res ) => {    
    try {
        generarReportePDF(reportes,res);
    } catch (error) {
        console.log('Error al generar el reporte:', error);
    }
}

// Datos de ejemplo (puedes reemplazar esto con tus propios datos)
const reportes = [
  {
    nombre: 'Juan Perez',
    tratamiento: 'Limpieza dental',
    odontologo: 'Dr. García',
    monto: 150,
    fecha: '2023-07-25',
  },
  {
    nombre: 'María López',
    tratamiento: 'Extracción de muela quirurgica especial',
    odontologo: 'Dra. Martínez',
    monto: 300,
    fecha: '2023-07-26',
  },
  // Agrega más datos de ejemplo si lo deseas
  
  {
    nombre: 'awdad López',
    tratamiento: 'Extraccadawdwadión de muela quirurgica especial',
    odontologo: 'Dra. Madawdrtínez',
    monto: 300,
    fecha: '2023-07-26',
    
  },
  {
    nombre: 'awdad López',
    tratamiento: 'Extraccadawdwadión de muela quirurgica especial',
    odontologo: 'Dra. Madawdrtínez',
    monto: 300,
    fecha: '2023-07-26',
    
  },
];

// Función para generar el reporte en PDF
const generarReportePDF = (reportes, res) => {
  const pdfDocument = new pdfkit();
  
  // Encabezado del reporte
  pdfDocument
    .fontSize(18)
    .text('Reporte Odontológico', { align: 'center' })
    .moveDown();

  // Crear una tabla para los reportes
  const table = {
    headers: ['Nombre', 'Tratamiento', 'Odontólogo', 'Monto', 'Fecha'],
    rows: [],
  };

  // Convertir los datos a filas de la tabla
  reportes.forEach((reporte) => {
    table.rows.push([
      reporte.nombre,
      reporte.tratamiento,
      reporte.odontologo,
      reporte.monto.toString(),
      reporte.fecha,
    ]);
  });
 
// Función para dibujar la tabla en el PDF
const drawTable = (table, startX, startY) => {
    const columnCount = table.headers.length;
    const rowCount = table.rows.length;
  
    pdfDocument.font('Helvetica-Bold').fontSize(12);
  
    let currentY = startY;
    const columnWidth = 110;
    const paddingVertical = 0; // Eliminamos el espacio vertical entre filas
  
    // Calcular el ancho y la altura de cada celda basado en el contenido
    const rowHeights = new Array(rowCount).fill(0); // Inicializamos con altura mínima de 0
  
    table.rows.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const cellText = cell.toString();
        const cellHeight = pdfDocument.heightOfString(cellText, {
          width: columnWidth - 10,
        }) + paddingVertical;
  
        if (cellHeight > rowHeights[rowIndex]) {
          rowHeights[rowIndex] = cellHeight;
        }
      });
    });
  
    // Dibujar encabezados
    table.headers.forEach((header, columnIndex) => {
      pdfDocument.rect(startX + columnIndex * columnWidth, currentY, columnWidth, rowHeights[0]).stroke();
      pdfDocument.text(header, startX + columnIndex * columnWidth + 5, currentY + 5, { width: columnWidth - 10, align: 'left' });
      
    });
     currentY += rowHeights[0]; // Ajustar la posición para la siguiente fila
    pdfDocument.font('Helvetica').fontSize(12);
  
    // Dibujar filas
    table.rows.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        pdfDocument.rect(startX + columnIndex * columnWidth, currentY, columnWidth, rowHeights[rowIndex]).stroke();
        pdfDocument.text(cell.toString(), startX + columnIndex * columnWidth + 5, currentY + 5, { width: columnWidth - 10, align: 'left' });
      });
      currentY += rowHeights[rowIndex]; // Ajustar la posición para la siguiente fila
    });
  };
  
 
  // Dibujar la tabla en el PDF
  drawTable(table, 30, pdfDocument.y);

  // Generar el PDF y enviarlo como respuesta al cliente
  const chunks = [];
  pdfDocument.on('data', (chunk) => chunks.push(chunk));
  pdfDocument.on('end', () => {
    const pdfData = Buffer.concat(chunks);
    res.setHeader('Content-Disposition', 'attachment; filename="reporte_odontologico.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    res.send(pdfData);
  });
  
  pdfDocument.end();
};

// Uso
//generarReportePDF(reportes);

module.exports = {  
    getReporte
}