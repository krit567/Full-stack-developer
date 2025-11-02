const express = require('express')
const router = express.Router()
const { getMessage } = require('../controllers/messageContro.js')

// GET /api/messages - ดึงข้อความทั้งหมด
router.get('/messages', getMessage)

module.exports = router
