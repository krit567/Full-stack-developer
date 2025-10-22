const mongoose = require('mongoose')

const url_db = `mongodb://localhost:27017/chatapp`

const ConnectDB = async () => {
    try{
        await mongoose.connect(url_db)
        console.log(`Connect Database Complete`)
    }
    catch(e){
        console.error(`Error is ` , e)
    }
}

module.exports = ConnectDB;