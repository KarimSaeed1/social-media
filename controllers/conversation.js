import Conversation from '../modules/Conversation.js';

import { errorHandler } from '../utils/error.js';

export const newConversation = async (req , res , next) => {

    try {
        const newConv = new Conversation({
            members : [req.body.senderId , req.body.reciverId],
        })

        await newConv.save();

        res.status(200).json({
            status:"success",
            message : "conversation done successfully",
        })
    } catch (error) {
       next(error); 
    }
}

export const getConversations = async (req , res , next) => {

    try {
        const conversations = await Conversation.find({
            members : {$in : [req.user.id]},
        })

        res.status(200).json({
            status : "success",
            num : conversations.length,
            data : conversations
        })
    } catch (error) {
        next(error);
    }
}