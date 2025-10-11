const { timestamp } = require("@vueuse/core");

module.exports = (io) => {
    const users = new Map();
    io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('checkuser',(username) => { 
        users.set(socket.id,{ // socket.io เป็น key ของ map
            login: true,
            username: username,
        })
        socket.broadcast.emit('join', username)
    });
    console.log('Total connected users:', io.sockets.sockets.size);

    socket.on('chat message', (msg) => {
        const userData = users.get(socket.id);
        const data = {
            username : userData.username,
            message : msg,
            timestamp : new Date ().toLocaleTimeString(),
        }
        console.log('message: ' + msg);
        io.emit('chat message', data);
            console.log('user id:', socket.id);
    });
    socket.on('disconnect', (socket) =>{
        console.log('Total connected users:', io.sockets.sockets.size);
    });

});
}