import Message from '../modules/Message.js';

import { errorHandler } from '../utils/error.js';

export const newMessage = async (req , res , next) => {

    try {
        const newMessage = new Message({
            conversationId : req.params.convId,
            sender : req.user.id,
            text:req.body.text,
        })
        console.log("hello world")
        await newMessage.save();

        res.status(200).json({
            status:"success",
            data : newMessage,
        })
    } catch (error) {
       next(error); 
    }
}

export const getMessage = async (req , res , next) => {

    try {
        const messages = await Message.find({
            conversationId : req.params.convId
        })

        res.status(200).json({
            status:"success",
            data : messages,
        })

    } catch (error) {
        next(error);
    }
}