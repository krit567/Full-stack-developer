const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    username:{ type: String, required: true },
    message:{ type:String,required: true},
    time:{ type: Data, default: Data.now}
})

module.exports = mongoose.model('Message' , MessageSchema)