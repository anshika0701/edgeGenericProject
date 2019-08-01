//for socket io
const socketIo = require('socket.io');
const http = require('http')
//let io;

const createSocket = (app) => {
    const server = http.createServer(app);
    module.exports.io = io = socketIo(server)
    io = socketIo(server);
    io.on('connection', socket => {
        // client.on('event',data =>{
        console.log("socket client connected");
        socket.on('disconnect', () => {
            console.log('server disconnected')
            // console.log(data);
        })
    });
    return server;
}
module.exports.createSocket = createSocket;
