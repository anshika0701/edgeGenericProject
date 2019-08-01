const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const config = require('./config');
const PORT = config.port;

const app = express();



//server.listen(3000);
//----------------------------------
mongoose.connect(config.mDB.url, config.mDB.options);
mongoose.connection.on("open", () => {
    console.log("Connected to mongo server.");
});
mongoose.connection.on("error", () => {
    console.log("error connecting to mongodb.");
});


app.use(bodyParser.json());
app.use(cors());
app.use(morgan('tiny'));

const user = require('./routes/user');

app.use('/user', user);


app.get('*', (req, res) => {
    res.sendStatus(404);
})

const socketServer = require('./socketServer')
const server = socketServer.createSocket(app)

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});