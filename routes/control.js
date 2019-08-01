const express = require('express');
const router = express.Router();
const Device = require('../models/device');
const Control = require('../models/control');

const socketServer = require('../socketServer');

router.get('/:device', (req, res) => {
    Control.getcontrolByDevice(req.params.device, (err, control) => {
        if (!err) {
            res.status(200).json({
                success: true,
                message: control
            })
        } else res.status(406).json({
            success: false,
            message: err.message
        });
    })
});

router.put('/', (req, res) => {
    Device.getDeviceByID(req.body.device, (err, device) => {
        if (err || !device) res.status(404).json({
            success: false,
            message: 'Device not found'
        });
        else {
            Control.updateControl(req.body, (err, data) => {
                if (!err) {
                    res.status(200).json({
                        success: true,
                        message: `control updated at ${data.time}`
                    })
                    socketServer.io.emit(data.device, data.value);
                } else res.status(406).json({
                    success: false,
                    message: err.message
                });
            })
        }
    })
})




module.exports = router;