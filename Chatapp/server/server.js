const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server,{
    cors: {origin: ['http://localhost:5173']}
})

app.get('/', (req,res) => {
    res.send('<h1>hello test</h1>')
})

io.on('connection',(socket) =>{
    console.log('player is connect socket.io is running',socket.id),
    socket.on('disconnect',() => {
        console.log('disconnect')
    })
})

server.listen(5000,() =>{
    console.log('Server running on port 5000')
})