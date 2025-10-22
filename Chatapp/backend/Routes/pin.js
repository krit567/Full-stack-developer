const express = require('express')
const router = express.Router()
const bodyparser = require('body-parser')
router.use(bodyparser.text())
const random =  () => {
    const max = 999999;
    const min = 111111;
    return Math.floor(Math.random() * (max - min) + min);
}
router.get('/pin',(req,res) => {
    res.send(random().toString())
})

module.exports = router