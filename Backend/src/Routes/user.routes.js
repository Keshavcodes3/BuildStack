import express from 'express'
import { registerUserController, loginContoller, logoutUserController, getUserProfileController, updateUserProfileController } from '../Controllers/user.controller.js'
import { loginValidator, registerValidator } from '../Validators/user.validator.js'
import { validate } from '../Middlewares/validate.js'
import { IdentifyUser } from '../Middlewares/user.middleware.js'
import upload from '../Utils/multer.js'
const userRoutes = express.Router()
/*
 * User routes
 *
 * Routes:
 * - POST /register    -> registerUserController (public)
 * - POST /login       -> loginContoller (public)
 * - POST /logout      -> logoutUserController (protected)
 * - GET  /getProfile  -> getUserProfileController (protected)
 * - PATCH /updateProfile -> updateUserProfileController (protected)
*/



/*
 * Register route
 * @route POST /register
 * @middleware registerValidator, validate
 */
userRoutes.post('/register', upload.single("avatar"), registerValidator, validate, registerUserController)



/*
 * Login route
 * @route POST /login
 * @middleware loginValidator, validate
 */
userRoutes.post('/login', loginValidator, validate, loginContoller)



/**
 * Logout route
 * @route POST /logout
 * @middleware IdentifyUser
 */
userRoutes.post('/logout', IdentifyUser, logoutUserController)



/**
 * Get profile route
 * @route GET /getProfile
 * @middleware IdentifyUser
 */
userRoutes.get('/getProfile', IdentifyUser, getUserProfileController)



/**
 * Update profile route
 * @route PATCH /updateProfile
 * @middleware IdentifyUser
 */
userRoutes.post('/updateProfile', upload.single("avatar"), IdentifyUser, updateUserProfileController)

export default userRoutes