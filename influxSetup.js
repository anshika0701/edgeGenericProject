const Influx = require('influxdb-nodejs');

const fs = require('fs');
const config = JSON.parse(fs.readFileSync('./config.json', 'utf-8'));

const influxClient = new Influx(config.influx.url);

const fieldSchema = {
    "temperature": "f",
    "humidity": "f",
    "cputemperature": "f"
};
const tagSchema = {
    device: '*',
};
influxClient.schema(config.influx.measurement, fieldSchema, tagSchema, {
    stripUnknown: true,
});

module.exports.influxClient = influxClient;