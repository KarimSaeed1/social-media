import User from '../modules/User.js';
import { errorHandler } from '../utils/error.js';

export const getAllUsers = async(req , res , next) => {

    try {

        const users = await User.find();
        res.status(200).json({
            status:"success",
            num : users.length,
            data:users
        })

    } catch (error) {

        next(error);

    }

}

export const getUser = async(req , res , next) => {

    try {
        const user = await User.findOne({id : req.params.id});
        const {password , isAdmin, ...others} = user._doc;
        if(!user) return next(errorHandler(500,"some thing went wrong"));
        res.status(200).json({
            status : "success",
            data:others
        })
    } catch (error) {
        return next();
    }
}


export const follow = async(req , res , next) => {
        
        if(req.params.id != req.user.id) {

            try {
                
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.user.id);

                if(user.followers.includes(req.user.id)) return next(errorHandler(403,"you are already follow him"));

                await user.updateOne({$push : {followers : req.user.id}})
                await currentUser.updateOne({$push : {followings : req.params.id}})

                res.status(200).json({
                    status:"success",
                    message:"following done successfully",
                })
            

            } catch (error) {
                return next();
            }
        }

        else {
            return next(errorHandler(403,'you can not follow yourself'));
        }

    
}

export const unfollow = async(req , res , next) => {

    if(req.params.user != req.user.id) {

        
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.user.id);

        if(!user.followers.includes(req.user.id)) 
        return next(errorHandler(403,"you can not make unfollow to him because you are not follow him already."));

        await user.updateOne({$pull : {followers : req.user.id}})
        await currentUser.updateOne({$pull : {followings : req.params.id}})    
        
        res.status(200).json({
            status:"success",
            message:"you are now not follow him",
        })
    }
    else {
        return next(errorHandler(403,"you can not make unfollow to yourself"));
    }
}