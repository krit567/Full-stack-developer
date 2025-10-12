const express = require('express')
// import express from 'express'
const router = express.Router()

router.get('/checkname', (req,res) => {
    res.send('My name is krit')
})

// export default router
module.exports = router

