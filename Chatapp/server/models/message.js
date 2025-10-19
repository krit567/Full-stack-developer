const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    }
})