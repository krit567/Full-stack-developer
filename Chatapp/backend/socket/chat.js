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
                socket.emit('checkuser-response', { success: false, message: 'User not found' });
                return;
            }
            // เก็บข้อมูล user ไว้ใน Map (ใช้ชื่อที่ user กรอกมา)
            users.set(socket.id, {
                login: true,
                username: username,  // ← ใช้ชื่อที่กรอกมา แทน user.nickname
                userId: user._id
            });
            // แจ้ง user อื่นว่ามีคนเข้ามา
            socket.broadcast.emit('join', username);  // ← ใช้ชื่อที่กรอกมา
            console.log(`${username} joined the chat`)
            
            // ส่งข้อมูลกลับไปยัง client
            socket.emit('checkuser-response', { 
                success: true, 
                username: username, 
                userId: user._id 
            });
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

            // สร้างข้อมูลที่จะบันทึก
            const data = {
                username: userData.username,
                message: msg.input,  // ✅ ดึงข้อความจาก msg.input
                timestamp: new Date(),
            };

            console.log(`User ID: ${userData.userId}, Username: ${userData.username}, Message: ${msg.input}`);

            // Save message to MongoDB
            try {
                const newMessage = new Message(data);
                await newMessage.save();
                console.log('Message saved to database:', newMessage);
            } catch (error) {
                console.error('Error saving message:', error);
            }

            // ส่งข้อความไปยังทุกคน พร้อม timestamp ที่ถูกบันทึก
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
