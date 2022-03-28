const jwt = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = (Token) => {
    return new Promise((resolve, reject)=> {
    jwt.verify(token, process.env.Secret_Key, (err, decoded) => {
        if (err) return reject(err)

        return resolve(decoded)
    })
    })
}

const authenticate = async (req, res, next) => {
    if (!req.headers.authorization)
        return res.send({message : "Authorization token not found or incorrect"})
    
    if (!req.headers.authorization.startsWith("Bearer"))
        return res.send({ message: "Authorization token not found or incorrect" })
    
    const token = req.headers.authorization.trim().split(" ")[1]

    let decoded;
    try {
        decoded = await verifyToken(token);
    } catch (error) {
        return res.send({
          message: "Authorization token not found or incorrect",
        });
    }

    req.userId = decoded.user._id

    return next();
    
}

module.exports = authenticate