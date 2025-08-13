const UserModel = require('../models/user');
const bycrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const signup = async (req,res)=>{

    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message : "user already exists, you can login", success: false})
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bycrypt.hash(password,10)
        await userModel.save()
        res.status(200)
        .json({
            message: "Successfully signed up",
            success: true
        })
    }catch(err){
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
}
const login = async (req,res)=>{

    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({email});
        const errMessage = "Auth failed email or password is wrong"
        if(!user){
            return res.status(403)
            .json({message : errMessage, success: false})
        }
        const isPassEqual = await bycrypt.compare(password,user.password)
        if(!isPassEqual){
             return res.status(403)
            .json({message : errMessage, success: false})
        }
        const jwtToken = jwt.sign(
            {email : user.email, _id : user._id},
            process.env.JWT_SECRET,
            {expiresIn: '24h'}
        )
        res.status(200)
        .json({
            message: "Logged in successfully",
            success: true,
            jwtToken,
            email,
            name : user.name

        })

    }catch(err){
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports = {signup,login}