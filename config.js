module.exports.port = 3000;
const database = 'iotization'
module.exports.mDB = {
    url: `mongodb://localhost/${database}`,
    options: {
        useCreateIndex: true,
        useNewUrlParser: true
    }
};