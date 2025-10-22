const Message = require('./models/Message');
const User = require('./models/User');

module.exports = (io) => {
    const users = new Map();

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);
        console.log('Total connected users:', io.sockets.sockets.size);

        socket.on('checkuser', async (username) => {
            try {
            const user = await User.findOne({ username})
            if(!user){
                const login = false;
                console.error('User not found ', username);
                return;
            }

            users.set(socket.id, {
                login: true,
                username: user.nickname,
            });

            socket.broadcast.emit('join', user.nickname);
        }catch(err){
            console.error('error is ', err)
        }
        });
        socket.on('chat message', async (msg) => {
            const userData = users.get(socket.id);
            if (!userData) {
                console.error('User not found for socket ID:', socket.id);
                return;
            }

            const data = {
                username: userData.username,
                message: msg,
                timestamp: new Date().toLocaleTimeString(),
            };

            console.log('message: ' + msg);

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
            console.log('Total connected users:', io.sockets.sockets.size);
            const userData = users.get(socket.id);
            if (userData) {
                console.log('User disconnected:', userData.username);
            } else {
                console.log('User data not found for socket ID:', socket.id);
            }

            users.delete(socket.id);
        });
    });
};
