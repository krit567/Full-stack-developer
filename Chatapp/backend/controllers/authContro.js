const express = require('express')
const message = require('../models/message')
const app = express()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const bodyparser = require('body-parser')


exports.createdUser = async (req,res) => {
    console.log('=== Register Request ===');
    console.log('req.body:', req.body);
    const {username , password , nickname } = req.body
    try{
    // เช็คว่าข้อมูลครบมั้ย
    if (!username || !password || !nickname){
        console.log('ข้อมูลไม่ครบ:', { username, password, nickname });
        return res.status(400).json({
            message: 'กรุณากรอกข้อมูลให้ครบ'
        })
    }
    // เช็คว่า user ซ้ำมั้ย
    const users = await User.findOne({ username })
    console.log('User exists check:', users);
    if(users) {
         console.log('Username already exists:', username);
         return res.status(400).json({ msg: 'Username already exists'})
    }

    // ทำการเข้ารหัส
    const salt  = await bcrypt.genSalt(12); // สุ่มตัวอักษร 12 ตัว
    const hashpassword = await bcrypt.hash(password, salt);


    // สร้าง user
    const user = new User({
        username , 
        password : hashpassword ,
        nickname
        });
    
    console.log('Saving user:', { username, nickname });    
    await user.save();
    console.log('User saved successfully!');
    res.status(201).json({ msg : 'successful'})
    }catch(err){
        console.error('error is ' ,err)
        res.status(500).send('Server Error')
    }
}

exports.userLogin = async (req,res) =>{
    try{
        const {username , password } = req.body

        if (!username || !password ){
            return res.status(500).json({
                msg: 'กรุณากรอก username และ password'
            })
        }
        const user = User.findOne({ username});
        if(!user){
            return res.status(500).json({msg : 'ไม่พบ user'})
        }
        const isPassword = await bcrypt.compare( password ,user.password)
        if(!isPassword){
            return res,status(500).json({msg: 'The password is incorrect.'})
        }

    res.status(200).json({
        msg: 'Login successful',
        data: {
            username: user.username,
            nickname: user.nickname
        }
    })
    }catch(err){
        console.error('error is ', err)
        res.status(500).json({msg: 'Error Login'})
    }
}