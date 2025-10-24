const Message = require('../models/message.js');
const User = require('../models/user.js');

module.exports = (io) => {
    const users = new Map(); // เก็บข้อมูล user ที่ออนไลน์

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        console.log('Total connected users:', io.sockets.sockets.size);

            // เมื่อ user ส่ง username มาเพื่อตรวจสอบ
        socket.on('checkuser', async (username) => {
            try {
            const user = await User.findOne({ username})
            if(!user){
                const login = false;
                console.error('User not found ', username);
                return;
            }

            // เก็บข้อมูล user ไว้ใน Map
            users.set(socket.id, {
                login: true,
                username: user.nickname,
                userId:user._id
            });

            // แจ้ง user อื่นว่ามีคนเข้ามา
            socket.broadcast.emit('join', user.nickname);
            console.log(`${user.nickname} joined the chat`)
        }catch(err){
            console.error('error is ', err)
            socket.emit('error', 'Error Checking user')
        }
        });

        // เมื่อส่งข้อความในแชท
        socket.on('chat message', async (msg) => {
            const userData = users.get(socket.id);
            // ตรวจสอบว่า user login มั้ย

            if (!userData) {
                socket.emit('error', 'กรุณา Login')
                console.error('User not found for socket ID:', socket.id);
                return;
            }

            const data = {
                username: userData.username,
                message: msg,
                timestamp: new Date(),
            };

            console.log(`user id ${user._id} is ${username} message is ${msg}`);

            // Save message to MongoDB
            try {
                const newMessage = new Message(data);
                await newMessage.save();
                console.log('Message saved to database:', newMessage);
            } catch (error) {
                console.error('Error saving message:', error);
            }

            io.emit('chat message', data);
        });

        socket.on('disconnect', async () => {
            const userData = users.get(socket.id);
            if (userData) {
                console.log('User disconnected:', userData.username);
                socket.broadcast.emit('leave', userData.username);
                users.delete(socket.id); 
            } else {
                console.log('User data not found for socket ID:', socket.id);
            }
            console.log('Total connected users:', io.sockets.sockets.size);
        });
    });
};
