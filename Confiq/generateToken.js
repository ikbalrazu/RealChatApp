const jwt = require('jsonwebtoken');

const generateToken = (email,name) =>{
    return jwt.sign({email,name}, process.env.JWT_SECRET,{
        expiresIn: "15d",
    })
};

module.exports = generateToken;