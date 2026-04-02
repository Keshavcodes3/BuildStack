import express from 'express';
import { 
    addCommentController, 
    deleteCommentController, 
    updateCommentController, 
    getCommentsController 
} from '../Controllers/comment.controller.js';
import { IdentifyUser } from '../Middlewares/user.middleware.js';

const commentRoutes = express.Router();

/**
 * Comment Routes
 *
 * All routes require authentication via IdentifyUser middleware
 * Routes:
 * - POST   /add/:postId      -> addCommentController
 * - DELETE /:commentId       -> deleteCommentController (authorize comment/post author)
 * - PUT    /:commentId       -> updateCommentController (authorize comment author)
 * - GET    /:postId          -> getCommentsController
 */

/**
 * Add comment route
 * @route POST /add/:postId
 * @middleware IdentifyUser
 * @param {string} postId - Post ID to add comment to
 * @body {string} text - Comment text
 */
commentRoutes.post('/add/:postId', IdentifyUser, addCommentController);

/**
 * Delete comment route
 * Authorization: Only comment author or post author
 * @route DELETE /:commentId
 * @middleware IdentifyUser
 * @param {string} commentId - Comment ID to delete
 */
commentRoutes.delete('/:commentId', IdentifyUser, deleteCommentController);

/**
 * Update comment route
 * Authorization: Only comment author
 * @route PUT /:commentId
 * @middleware IdentifyUser
 * @param {string} commentId - Comment ID to update
 * @body {string} text - New comment text
 */
commentRoutes.put('/:commentId', IdentifyUser, updateCommentController);

/**
 * Get comments for a post route
 * @route GET /:postId
 * @middleware IdentifyUser
 * @param {string} postId - Post ID to fetch comments for
 * @query {number} [limit=10] - Comments per page
 * @query {number} [page=1] - Page number
 */
commentRoutes.get('/:postId', IdentifyUser, getCommentsController);

export default commentRoutes;
