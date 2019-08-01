const request = require('request');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

const options = {
    uri: config.server.register,
    json: true,
    body: config.device
}


request.post(options, (_, __, body) => {
    if (body.success) {
        deviceID = body.message.device
        config.deviceID = deviceID;
        fs.writeFileSync('./config.json',
            JSON.stringify(config, null, 4))
        console.log('Device registered');

    } else console.error(body.message);

})