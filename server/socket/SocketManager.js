let io;

const initSocket = (server) => {
    io = require('socket.io')(server, {
        cors: {
            origin: '*',
        },
    });

    io.on('connection', (socket) => {
        console.log('Nuevo cliente conectado',socket.id);
        
        socket.on('timeline', (data) => {
            io.emit('timeline',data);
        });

        socket.on('usercountday', (data) => {
            io.emit('usercountday',data);
        });

        socket.on('listdiarys', (data) => {
            io.broadcast.emit('listdiarys',data);
        });
        
        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
        });
    });
};

const emitEvent = (eventName, eventData) => {
    io.emit(eventName, eventData);
};

module.exports = { initSocket, emitEvent };
