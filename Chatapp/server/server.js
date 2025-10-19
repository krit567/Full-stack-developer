const express = require('express')
const app = express()
const  { readdirSync } = require('fs')
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const morgen = require('morgan')
const connectDB = require(`./config/db`)
const cors = require('cors')
const PORT = 5000
const bodyparser = require('body-parser')
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})

connectDB()
require('./socket/chat')(io)

app.use(cors())
app.use(morgen('dev'))
app.use(bodyparser.text())
// app.get('/', (req,res) => {
//     res.send('<h1>hello test</h1>')
// })
readdirSync('./Routes')
    .map((r) =>  
        app.use('/api', require('./Routes/' + r))
    )

// readdirSync('./Routes').map((r) => {
//     console.log(`Loading route: ${r}`); // เพิ่ม log เพื่อตรวจสอบ
//     app.use('/api', require('./Routes/' + r));
// });

// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);
//   console.log('Total connected users:', io.sockets.sockets.size);
//   console.log("****************************************")
//   socket.on('chat message', (msg) => {
//     console.log('message: ' + msg);
//     // // ส่งข้อความไปยัง client ทุกคน (รวมตัวเอง)
//     io.emit('chat message', msg);
//       console.log('Total connected users:', io.sockets.sockets.size);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//     console.log('Total connected users:', io.sockets.sockets.size);
//   });
// });

server.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
})