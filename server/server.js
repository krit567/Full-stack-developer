// import express from 'express'
const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server,{
    cors: {origin: ['http://localhost:5173'],
        credentials: true
    }
})
const {readdirSync} = require('fs')
// const nameRouter = require('./Routes/name')
// const auth = require('./Routes/auth')


app.get('/',(req, res) => {
    res.sendFile(__dirname + '/Frontend/index.html')
})

// const io = require('socket.io',(server, {
//     cors: {origin: ['http://localhost:5173']}
// }) )

// import { readdirSync } from 'fs'
// app.get('/checkname', (req,res) => {
//     res.send('hello world')
// })

// app.use('/api',nameRouter)
// app.use('/api',auth)

//type module
// readdirSync('./Routes')
//     .map( async (r) => {
//         const module = await import(`./Routes/${r}`);
//         app.use('/api', module.default); // เพิ่มบรรทัดนี้
//         console.log(`Test หน่อยดิ`, module);
//         console.log(`Module =`, module.default);
//     });

//type commonjs

io.on('connection',(socket) => {
    console.log('Socket running')
    socket.on('disconnect',() => {
        console.log('user disconnected')
    })
})

readdirSync('./Routes')
    .map((r) => {
        app.use('/api',require('./Routes/'+ r))
        console.log(r)
    });



// io.on('connection' , socket => {
//     console.log(socket.id)
// })
// app.listen(5000, () => console.log('Server is Running on port 5000'))
server.listen(5000,() => {
    console.log("backend running on port 5000")
})