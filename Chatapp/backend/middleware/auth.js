exports.auth = async(req ,res ,next) =>{
    try{
        const token = req.header["authtoken"]
        console.log("token is ",token)
        next();
        
    }catch(err){
        console.log('error is ', err)
    }
}    