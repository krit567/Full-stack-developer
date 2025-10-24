const Message = require('../models/message')

exports.createMessage = async (req,res) => {
    const { username , message , nickname } = res.body;
    const time = new Date();

    try{
        const newMessage = new Message({ username , message , nickname ,time})
        await newMessage.save()
        res.status(201).json({message: 'Message created successfully', data: newMessage})
    }catch(err){
        console.error('error is ',err)
        res.status(500).json({message: 'Error created message'},err)
    }
}

exports.getMessage = async (req,res) =>{
    try{
        const message = await Message.find()
        res.status(201).json({message: 'Messages retrieved successfully', data:message})
    }catch(err){
        console.error('error is ', err)
        res.status(500).json({message: 'Error get message'})
    }
}
