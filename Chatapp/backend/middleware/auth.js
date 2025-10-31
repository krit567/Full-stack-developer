const jwt = require('jsonwebtoken')

exports.auth = async(req ,res ,next) =>{
    try{
        const token = req.headers["authtoken"]
        console.log("token is ",token)
        if(!token){
           return res.status(401).send('No token')
        }
        const decode = jwt.verify(token , 'jwtsecret') 
        console.log(decode)
        next();
    }catch(err){
        console.log('Token invalid ', err)
        res.send("Token Invalid ").status(500)
    }
}    