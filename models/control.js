const mongoose = require('mongoose');
const schema = mongoose.Schema;

const controlSchema = new schema({
    device: {
        type: String,
        required: true,
        index: true
    },
    value: {
        type: [Number],
        required: true
    },
    time: {
        type: Date,
        required: false,
        default: new Date(Date.now())
    }
})

const Control = mongoose.model('control', controlSchema);

const addcontrol = (control, callback) => {
    const newcontrol = new Control(control);
    newcontrol.save(callback);
}

const getcontrolByDevice = (deviceID, callback) => {
    const query = {
        device: deviceID
    }
    Control.find(query, callback);
}

const updateControl = (control, callback) => {
    const deviceID = control.device;
    delete control.device;
    control.time = Date.now();
    const query = {
        device: deviceID
    }
    Control.findOneAndUpdate(query, control, {
            useFindAndModify: false,
            new: true
        },
        callback);
}

module.exports = {
    addcontrol,
    getcontrolByDevice,
    updateControl
}