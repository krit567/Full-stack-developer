const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: true,
        unique: true,
        trim: true
    },
    password :{
        type : String,
        required: true
    },
    nickname :{
      type : String ,
      required: true,
      trim: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User', userSchema);