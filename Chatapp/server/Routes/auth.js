const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('./models/user.js')
const bcrypt = require('bcryptjs')

router.get('/auth', (req,res) => {
    res.send('Auth jaa')
})

router.post('/register', async (req,res) => {
    const { username , password , nickname } = req.body
    try{
    let user = await User.findOne({ username })
    if(user) {
        res.status(400).json({ msg: 'Username already exists'})
    }

    const user = new User({username , password , nicename});
    const salt  = await bcrypt.genSalt(20); // สุ่มตัวอักษร 20 ตัว
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.status(201).json({ msg : 'successful'})
    }catch(err){
        console.error('error is ' err)
        res.status(500).send('Server Error')
    }
})

module.exports = router