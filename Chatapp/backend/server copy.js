const express = require('express')
const app = express()
const { join } = require('node:path');
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')

const io = new Server(server,{
    cors: {origin: ['http://localhost:5173']}
})

// เก็บข้อมูลผู้ใช้และห้อง
const users = new Map()
const rooms = new Map()

// app.get('/', (req,res) => {
//     res.send('<h1>hello test</h1>')
// })


app.get('/', (req, res) => { 
  res.sendFile(join(__dirname, '../frontend/index.html')); 
});


io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  console.log('Total connected users:', io.sockets.sockets.size);
  console.log("****************************************")
  
  // จัดการการเข้าร่วมห้อง
  socket.on('join room', (data) => {
    const { username, room } = data
    
    // บันทึกข้อมูลผู้ใช้
    users.set(socket.id, {
      username: username,
      room: room,
      socketId: socket.id
    })
    
    // เข้าร่วมห้อง
    socket.join(room)
    
    // บันทึกข้อมูลห้อง
    if (!rooms.has(room)) {
      rooms.set(room, new Set())
    }
    rooms.get(room).add(socket.id)
    
    console.log(`${username} joined room: ${room}`)
    
    // แจ้งผู้ใช้ว่าเข้าห้องสำเร็จ
    socket.emit('room joined', { room: room, username: username })
    
    // แจ้งคนอื่นในห้องว่ามีคนเข้ามาใหม่
    socket.to(room).emit('user joined', { username: username })
    
    // แสดงจำนวนคนในห้อง
    const roomSize = rooms.get(room).size
    console.log(`Room ${room} now has ${roomSize} users`)
  })

  // จัดการการส่งข้อความ
  socket.on('chat message', (data) => {
    const user = users.get(socket.id)
    if (user && user.room) {
      console.log(`Message from ${data.username} in room ${data.room}: ${data.message}`)
      
      // ส่งข้อความไปยังทุกคนในห้องเดียวกัน (รวมตัวเอง)
      io.to(data.room).emit('chat message', {
        username: data.username,
        message: data.message,
        timestamp: data.timestamp,
        room: data.room
      })
    }
  })
  
  // จัดการการออกจากห้อง
  socket.on('leave room', (data) => {
    handleUserLeave(socket, data.username, data.room)
  })

  // จัดการการตัดการเชื่อมต่อ
  socket.on('disconnect', () => {
    const user = users.get(socket.id)
    if (user) {
      handleUserLeave(socket, user.username, user.room)
    }
    console.log('User disconnected:', socket.id);
    console.log('Total connected users:', io.sockets.sockets.size);
  })
})

// ฟังก์ชันจัดการการออกจากห้อง
const handleUserLeave = (socket, username, room) => {
  if (room && rooms.has(room)) {
    // ลบผู้ใช้จากห้อง
    rooms.get(room).delete(socket.id)
    
    // ถ้าห้องว่าง ให้ลบห้อง
    if (rooms.get(room).size === 0) {
      rooms.delete(room)
      console.log(`Room ${room} deleted (empty)`)
    } else {
      // แจ้งคนอื่นในห้องว่ามีคนออกไป
      socket.to(room).emit('user left', { username: username })
      console.log(`Room ${room} now has ${rooms.get(room).size} users`)
    }
    
    // ออกจากห้อง
    socket.leave(room)
  }
  
  // ลบข้อมูลผู้ใช้
  users.delete(socket.id)
  console.log(`${username} left room: ${room}`)
}

server.listen(5000,() =>{
    console.log('Server running on port 5000')
})