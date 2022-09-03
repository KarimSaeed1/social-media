import Post from '../modules/Post.js';
import User from '../modules/User.js'
import { errorHandler } from '../utils/error.js';


export const addPost = async (req, res, next) => {

    const post = new Post({

        userId : req.user.id,
        desc : req.body.desc,
        img : req.body.img,

    });

    try {

        await post.save();

        res.status(200).json({
            status : "success",
            data : post,
        })
    } catch (error) {
        
        console.log(error);
        return next();
        
    }
}

export const updatePost = async (req, res, next) => {

    try {

        const post = await Post.findByIdAndUpdate(req.params.id,{$set :req.body},{new : true}) ;

        res.status(200).json({
            status : "success",
            data : post,
        })
    } catch (error) {
        
        return next();
        
    }
}

export const deletePost = async (req, res, next) => {

    try {

        await Post.findByIdAndDelete(req.params.id);
       
        res.status(200).json({
            status:"success",
            message : "post deleted successfully",
        })
    } catch (error) {
        return next();
    }

}

export const getPost = async (req, res, next) => {

    try {

        const post = await Post.findById(req.params.id).select("-userId");

        res.status(200).json({
            status:"success",
            data : post,
        })

    } catch (error) {
        return next();
    }

}

export const likePost = async (req, res, next) => {

    try {

        const post = await Post.findById(req.params.id);

        if(post.likes.includes(req.user.id)) return next(errorHandler(401,"you are already make a like"));

        await Post.findByIdAndUpdate(req.params.id,
            {
                $push : {likes : req.user.id}
            },
            {set:true}
            )

        res.status(200).json({
            statsu:"success",
            message : "like done",
        })
        
    } catch (error) {
        console.log(error);
        return next();

    }
}

export const getAllPosts = async (req, res, next) => {

    try {

        const posts = await Post.find().select("-userId");

        res.status(200).json({
            status:"success",
            num : posts.length,
            data : posts,
            
        })

    } catch (error) {
        return next();
    }

}

export const getTimelinePosts = async (req, res, next) => {

    try {

        const currentUser = await User.findById(req.user.id);
        const userPosts = await Post.find({userId : currentUser._id});

        const friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({userId: friendId});
            })
        );

        const allPosts = userPosts.concat(...friendPosts);
    
        res.status(200).json({
            status : "success",
            num : allPosts.length,
            data :allPosts,
        })

    } catch (error) {
        console.log(error);
        return next();
    }
}