const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/', (req, res) => {
    User.addUser(req.body, (err, _) => {

        if (!err) {
            res.status(202).json({
                success: true,
                message: 'User Created'
            })
        } else res.status(406).json({
            success: false,
            message: err.message
        });

    })
})

router.post('/login', (req, res) => {
    User.getUserByEmail(req.body.email, (err, user) => {
        if (!err) {
            if (!user) res.status(404).json({
                success: false,
                message: 'Invalid email'
            })

            else {
                if (user.password == req.body.password)
                    res.status(200).json({
                        success: true,
                        message: user
                    })
                else res.status(401).json({
                    success: false,
                    message: 'Invalid password'
                })
            }
        } else res.status(406).json({
            success: false,
            message: err.message
        });
    })
})

module.exports = router;