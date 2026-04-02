import userModel from "../Models/user.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


export const createUser = async ({ userName, email, password, avatar, gender, bio }) => {
    const hashPassword=await bcrypt.hash(password,10)
    return userModel.create({
        userName, email, password:hashPassword, avatar, gender, bio
    })
}
