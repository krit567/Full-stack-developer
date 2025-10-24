const express = require('express')
const message = require('../models/message')
const app = express()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const bodyparser = require('body-parser')


exports.createdUser = async (req,res) => {
    const {username , password , nickname } = req.body
    try{
    // เช็คว่าข้อมูลครบมั้ย
    if (!username || !password || !nickname){
        return res.status(400).json({
            message: 'กรุณากรอกข้อมูลให้ครบ'
        })
    }
    // เช็คว่า user ซ้ำมั้ย
    let users = await User.findOne({ username })
    if(users) {
        res.status(400).json({ msg: 'Username already exists'})
    }

    // ทำการเข้ารหัส
    const salt  = await bcrypt.genSalt(20); // สุ่มตัวอักษร 20 ตัว
    const hashpassword = await bcrypt.hash(password, salt);


    // สร้าง user
    const user = new User({
        username , 
        password : hashpassword ,
        nickname
        });
        
    await user.save();
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