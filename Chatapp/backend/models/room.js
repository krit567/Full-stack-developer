const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    pin:{
        type: String,
        require:true,
    },
    createdAt:{
        type:Date,
        default:Data.now
    }
});

module.exports = mongoose. model('Room',RoomSchema);