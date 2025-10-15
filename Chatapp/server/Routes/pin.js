const express = require('express')
const router = express.Router()
const bodyparser = require('body-parser')
router.use(bodyparser.text())
const random =  () => {
    return Math.floor(Math.random() * (999999 - 111111) + 111111);
}
router.get('/pin',(req,res) => {
    res.send(random().toString())
})

module.exports = router