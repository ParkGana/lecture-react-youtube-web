const express = require('express');
const router = express.Router();

const { User } = require("../models/User");


/****************************************************************************************************
 * 회원가입
 ****************************************************************************************************/
router.post('/signup', (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if(err) return res.status(400).json({ signupSuccess: false });
        return res.status(200).json({ signupSuccess: true });
    })
});

module.exports = router;