const express = require('express')
const router = express.Router()
const { createdUser, userLogin } = require('../controllers/authContro.js')
const { auth } = require('../middleware/auth')


router.get('/auth', (req,res) => {
    res.send('Auth jaa')
})

router.post('/register', createdUser)
router.post('/login',userLogin)
router.get('/test', auth, (req,res) => {
    res.send('test kub')
}
)
module.exports = router