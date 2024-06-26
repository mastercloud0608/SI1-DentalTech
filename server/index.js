const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const socketManager = require('./socket/SocketManager');

const user = require('../server/routes/user.routes');
const admin = require('../server/routes/admin.routes');
const patient = require('../server/routes/patient.routes');
const odontologist = require('../server/routes/odontologist.routes')
const diary = require('../server/routes/diary.routes')
const reports = require('../server/routes/reports.routes');
const odontograma = require('../server/routes/odontograma.routes'); // Nueva ruta del odontograma

const pool = require('./db');

const app = express();
const server = http.createServer(app);


app.use(cors());
app.use(morgan('dev'));
app.use(express.json());


app.use(user);
app.use(admin);
app.use(patient);
app.use(odontologist);
app.use(diary);
app.use(reports);
app.use('/odontograma', odontograma); // Usar la nueva ruta del odontograma



socketManager.initSocket(server);

const PORT =  process.env.PORT || 3000;
// const HOST = '192.168.13.49'; 

// server.listen(PORT,HOST, async () => {
//     try {
//         const client = await pool.connect()
//         console.log('base de datos conectada')
//         client.release()
//     } catch (error) {
//         console.log('error en la conexion de la base de datos')
//         console.log(error)
//     }
//     console.log(`Servidor encendido en el puerto ${PORT}`);
// });


app.listen(PORT, () => {
    console.log(`Servidor encendido en el puerto ${PORT}`);
});