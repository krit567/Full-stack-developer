const express = require('express')
// import express from 'express'
const router = express.Router()

router.get('/auth',(req,res) => {
    res.send('hello auth')
})

router.post('/login',(req,res) => {
    res.send('login')
})

router.put('/edit',(req,res) => {
    res.send('edit')
})

router.delete('/delete',(req,res) => {
    res.send( 'delete')
})

// export default router
module.exports = router