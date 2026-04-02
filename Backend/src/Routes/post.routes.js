import upload from '../Utils/multer.js'
import express from 'express'
import { createProjectController, getProjectsController, getSingleProjectController, getUserProjectsController, likeProjectController } from '../Controllers/post.controller.js'
import { IdentifyUser } from '../Middlewares/user.middleware.js'
const postRoutes = express.Router()

/**
 * Post/Project Routes
 *
 * All routes require authentication via IdentifyUser middleware
 * Routes:
 * - POST /createProject        -> createProjectController (with file upload)
 * - GET  /getProjects          -> getProjectsController
 * - GET  /projects/:id/projects -> getUserProjectsController
 * - GET  /projects/:postId     -> getSingleProjectController
 */

/**
 * Create project route
 * @route POST /createProject
 * @middleware IdentifyUser, upload.array("media")
 */
postRoutes.post('/createProject', IdentifyUser, upload.array("media"), createProjectController)

/**
 * Get all projects feed route
 * @route GET /getProjects
 * @middleware IdentifyUser
 */
postRoutes.get('/getProjects', IdentifyUser, getProjectsController)

/**
 * Get user projects route
 * @route GET /projects/:id/projects
 * @middleware IdentifyUser
 * @param {string} id - User ID
 */
postRoutes.get('/projects/:id/projects', IdentifyUser, getUserProjectsController)

/**
 * Get single project route
 * @route GET /projects/:postId
 * @middleware IdentifyUser
 * @param {string} postId - Post ID
 */
postRoutes.get('/projects/:postId', IdentifyUser, getSingleProjectController)


postRoutes.post('/project/:id',IdentifyUser,likeProjectController)

export default postRoutes 