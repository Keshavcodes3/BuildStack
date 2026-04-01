import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select:false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'others']
    },
    bio: {
        type: String,
        default: ""
    },
},{timestamps:true})


const userModel = new mongoose.model("User", userSchema)


export default userModel