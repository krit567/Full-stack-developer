
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


exports.createdUser = async (req, res) => {
    console.log('=== Register Request ===');
    console.log('req.body:', req.body);
    const { username, password, nickname } = req.body
    try {
        // เช็คว่าข้อมูลครบมั้ย
        if (!username || !password || !nickname) {
            console.log('ข้อมูลไม่ครบ:', { username, password, nickname });
            return res.status(400).json({
                message: 'กรุณากรอกข้อมูลให้ครบ'
            })
        }
        // เช็คว่า user ซ้ำมั้ย
        let user = await User.findOne({ username })
        console.log('User exists check:', user);
        if (user) {
            console.log('Username already exists:', username);
            return res.send('Username already exists').status(400)
        }

        // ทำการเข้ารหัส
        const salt = await bcrypt.genSalt(12); // สุ่มตัวอักษร 12 ตัว
        // สร้าง user
        user = new User({
            username,
            password,
            nickname
        });

        user.password = await bcrypt.hash(password, salt)
        console.log('Saving user:', { username, nickname });
        await user.save();
        console.log('User saved successfully!');
        res.status(201).json({ msg: 'successful' })
    } catch (err) {
        console.error('error is ', err)
        res.status(500).send('Server Error')
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(500).json({
                msg: 'กรุณากรอก username และ password'
            })
        }
        const user = await User.findOne({ username });
        console.log(user)
        if (!user) {
            return res.status(500).json({ msg: 'ไม่พบ user' })
        }
        if (user) {
            const isPassword = await bcrypt.compare(password, user.password)
            if (!isPassword) {
                return res.status(400).json({ msg: 'The password is incorrect.' })
            }
            let payload = {
                user : {
                    userid : user._id,
                    username : user.nickname,
                }
            }

            const timeout = 30*60
            jwt.sign(payload, 'jwtsecret' , { expiresIn:timeout} , (err, token) => {
                if(err) throw err;
                res.json( {token , payload })
            })
        }else{
            return res.status(400).send('User not found')
        }
        
    } catch (err) {
        console.error('error is ', err)
        res.status(500).json({ msg: 'Error Login' })
    }
}