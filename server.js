import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import socket from 'socket.io';

import userRouter from './routes/users.js'
import postRouter from './routes/posts.js'
import conversationRouter from './routes/conversations.js'
import messageRouter from './routes/messages.js'
import { errorHandler } from './utils/error.js';


const app = express();
dotenv.config();
const port = process.env.PORT || 3000 ;

// fun of connection to database
function connect () {
    
        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        .then(()=> {
            console.log("connection to database done successfully")
        })
        .catch((err)=> {
            console.log(err);
        })
   
}

//middlewares
app.use(express.json())
app.use(cookieParser());
app.use(cors());
app.use(morgan("common"));
app.use(helmet());


// socket.io


io.on("connection",(socket) => {
    console.log("a user connected");
    io.emit("welcome","hello this is socket server")
})

//routes
app.use('/user',userRouter)
app.use('/post',postRouter)
app.use('/conversation',conversationRouter)
app.use('/message',messageRouter)

// run server
app.listen(2000 , ()=> {
    console.log('server is running on port ',port);
    connect();
})

// unavailable routes
app.use('*', (req , res , next) => {
    return next(errorHandler(404,`this url ${req.baseUrl} is not available`))
})

// error handler middleware
app.use(((err,req,res,next) => {

    const errorStatus = err.status || 500 ;
    const errorMessage = err.message || "something went wrong";

    return res.status(errorStatus).json({
        success : false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    })
    
}));