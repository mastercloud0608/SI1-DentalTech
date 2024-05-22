import socketIOClient from 'socket.io-client';

const socket = socketIOClient('http://192.168.0.9:3000');

export default socket;