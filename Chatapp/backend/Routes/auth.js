const express = require('express')
const router = express.Router()
const { createdUser, userLogin } = require('../controllers/authContro.js')



router.get('/auth', (req,res) => {
    res.send('Auth jaa')
})

router.post('/register', createdUser)
router.post('/login',userLogin)

module.exports = router