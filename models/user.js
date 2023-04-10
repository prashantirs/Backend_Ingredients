import mongoose from "mongoose";            

const userSchema = new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        select:false, //this will not show password in response when we get user
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
});

export const User = mongoose.model("User", userSchema);
