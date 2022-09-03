import mongoose from 'mongoose';

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true,'please enter your name'],
        minlength:[5,"the name can't be less then 5"],
        maxlength : [30,"the name can't be more than 30"],
        unique : true,
    },

    email : {
        type : String ,
        unique : true,
        required : [true,'email address is required'],
        trim : true,
        lowercase : true,
        validate: [validateEmail, 'Please fill a valid email address'],
    },

    password : {
        type : String,
        required : true,

    },
    
    profilePicture : {
        type : String,
        default : ""
    },

    coverPicture : {
        type : String,
        default : ""
    },

    followers : {
        type : Array,
        default : [],
    },

    followings : {
        type : Array,
        default : [],
    },

    isAdmin : {
        type : Boolean,
        default : false,
    },

    phone : {
        type : String,
    },

    age : {
        type : Number,
    },

    desc : {
        type : String,
        maxlength : [100 , "describtion can't be more than 50 charcters"]
    },

    city: {
        type : String,
        maxlength : [50, "city name can't be more than 50 charcters"],
    },
    from : {
        type : String,
        maxlength:[50,"place name can't be more than 50 charcters"]
    },
    relationship : {
        type : Number,
        enum : [1,2,3],
    }

},
{
    timestamps : true
})



export default mongoose.model("User",userSchema);