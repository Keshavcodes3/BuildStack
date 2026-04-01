import mongoose from 'mongoose'

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        required: true
    },
    media: [{
        type: String
    }],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    commentCount: {
        type: Number,
        default: 0
    },
    tags: [String],
    visibility: {
        type: String,
        enum: ['private', 'public'],
        default: "public"
    }
}, { timestamps: true })



const postModel = mongoose.model("Post", postSchema)

export default postModel