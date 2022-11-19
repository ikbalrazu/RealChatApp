const jwt = require('jsonwebtoken');

const authentication = async(req,res,next) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            token = req.headers.authorization.split(" ")[1];

            //decode token id
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            next();

        }catch(error){
            res.status(400).json({ message: "Invalid Token !" });
        }
    }

    if(!token){
        res.status(400).json({message: "Not authorized!"})
    }

}

module.exports = authentication;