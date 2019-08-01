const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));


const socketIoClient = require('socket.io-client');
const socket = socketIoClient(config.server.socket);

socket.on('connect', () => {
    console.log('Connected to WS server');

});
socket.on(config.deviceID, (data) => {
    let controls = {}
    config.device.controls.forEach((entry, index) => {
        controls[entry] = data[index]

        console.log(entry + ' -> ' +
            config.controls[entry].pin +
            ' set: ' + data[index]);

    })
    console.log(controls);




});
socket.on('disconnect', () => {
    console.log('Disconnected from WS server');

});