import express from 'express'
// const express = require('express')
// const nameRouter = require('./Routes/name')
// const auth = require('./Routes/auth')

import { readdirSync } from 'fs'
// const {readdirSync} = require('fs')
const app = express();
// app.get('/checkname', (req,res) => {
//     res.send('hello world')
// })

// app.use('/api',nameRouter)
// app.use('/api',auth)

//type module
readdirSync('./Routes')
    .map( async (r) => {
        const module = await import(`./Routes/${r}`);
        app.use('/api', module.default); // เพิ่มบรรทัดนี้
        console.log(`Test หน่อยดิ`, module);
        console.log(`Module =`, module.default);
    });

//type commonjs
// readdirSync('./Routes')
//     .map((r) => {
//         app.use('./api',require('./Routes/'+ r))
//         console.log(r)
//     })

app.listen(5000, () => console.log('Server is Running on port 5000'))