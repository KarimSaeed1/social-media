import mongoose from 'mongoose';


const postSchema = new mongoose.Schema({

    userId : {
        type : String ,
        required : true 
    },

    desc : {
        type : String ,
        minlength : [4 , 'post describtion can not be less than 4'],
        maxlength : [1000 , 'post describtion can not be more than 1000 characters'],
        required : [true , 'please enter the discribtion']
    },

    img : {
        type : String,
    },

    likes : {
        type : Array,
        default : [],
    },

},
{
    timestamps : true,
})



export default mongoose.model("Post",postSchema);