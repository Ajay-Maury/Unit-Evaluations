const jwt = require("jsonwebtoken")
const User = require("../models/user.model")
require("dotenv").config()

const generateToken = (user) => {
    return jwt.sign({user},process.env.Secret_Key)
}

const register = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email }).lean().exec();

        if (user) {
            return res.send("Email already exists");
        }
        user = await User.create(req.body);

        const token = generateToken(user);
        return res.send({user,token})
    } catch (error) {
        return res.send(error.message)
    }
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        
        if (!user)
        {
            return res.send("Wrong Email or Password")            
        }
        
        const match = user.checkPassword(req.body.password)

        if (!match) return res.send("Wrong Email or Password"); 
        
        const token = generateToken(user)
        return res.send({user,token})

    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = {register,login,generateToken}