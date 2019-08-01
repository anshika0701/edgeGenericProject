const express = require('express');
const router = express.Router();
const Device = require('../models/device');
//const User = require('../models/user');
const Control = require('../models/control');

router.get('/:owner', (req, res) => {
    Device.getDevicesByOwner(req.params.owner, (err, devices) => {
        if (!err) {
            res.status(200).json({
                success: true,
                message: devices
            })
        } else res.status(406).json({
            success: false,
            message: err.message
        });
    })
});

