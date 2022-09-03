import User from '../modules/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {errorHandler} from '../utils/error.js'

export const  register = async(req , res , next) => {

    try {
        const {name , email , password} = req.body;

        if(!(name && email && password)) return next(errorHandler(400,"All inputs are required"));

        const userFound = await User.findOne({email:email});
        if(userFound) return next(errorHandler(400,"User is already exist , please login"))

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password,salt);

        const newUser = new User({
            name : name,
            email:email,
            password:hashedPassword,
        })

        await newUser.save();
        
        const token = jwt.sign(
            {id : newUser._id , isAdmin : newUser.isAdmin},
            process.env.JWT_SECRET,
            {
                expiresIn : "2h",
            }
            );

            newUser.token = token;

        res
        .cookie("access_token",token,{httpOnly:true})
        .status(200).json({
            stauts : "success",
            data : newUser
        })

    } catch (error) {

        next(error)
        

    }
}

export const login = async (req ,res , next) => {
    
    try {
        
        if(!(req.body.email && req.body.password)) return next(errorHandler(400,"All inputs are  required"));
    const userFound = await User.findOne({email : req.body.email}).select("+password");
    if(!userFound) return next(errorHandler(400,"this email doesn't exist"));

    const validPassword =await bcrypt.compare(req.body.password,userFound.password)
    if(!validPassword) return next(errorHandler(400,"the password is not true"));

    const token = jwt.sign({id : userFound._id , isAdmin : userFound.isAdmin} , process.env.JWT_SECRET )
    
    const{password , ...otherDetails} = userFound._doc ;
    otherDetails.token = token;

    res
    .cookie("access_token",token,{httpOnly : true})
    .status(200).json({
        status:"success",
        data : otherDetails,
    })

    } catch (error) {
        return next();
    }



}