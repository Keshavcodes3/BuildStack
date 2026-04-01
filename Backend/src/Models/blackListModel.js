import mongoose from "mongoose";

const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: "3d" // auto delete after expiry
    }
}, { timestamps: true })



const blackListModel = mongoose.model('blackList', blackListSchema)

export default blackListModel