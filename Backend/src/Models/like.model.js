import mongoose from 'mongoose'

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })


likeSchema.index({ post: 1, user: 1 }, { unique: true })


const likeModel=mongoose.model("Like",likeSchema)

export default likeModel