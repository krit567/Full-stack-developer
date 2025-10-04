// const express = require('express')
import express from 'express'
const router = express.Router()

router.get('/auth',(req,res) => {
    res.send('hello auth')
})

export default router
// module.exports = router