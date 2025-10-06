const express = require('express')
const app = express()
const { join } = require('node:path');
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server,{
    cors: {origin: ['http://localhost:5173']}
})

// app.get('/', (req,res) => {
//     res.send('<h1>hello test</h1>')
// })

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, '/frontend/index.html'));
});


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  console.log("****************************************")
  console.log('', socket.id.length);
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    // // ส่งข้อความไปยัง client ทุกคน (รวมตัวเอง)
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(5000,() =>{
    console.log('Server running on port 5000')
})