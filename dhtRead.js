const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));
const sensor = require('node-dht-sensor').promises;

const dht = config.sensors.dht;

sensor.initialize(dht.type, dht.pin);

module.exports.sensor = sensor;