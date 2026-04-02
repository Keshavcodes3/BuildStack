import commentModel from "../Models/comment.model.js";
import postModel from "../Models/post.model.js";
import userModel from "../Models/user.model.js";

/**
 * Add a new comment to a post.
 *
 * Endpoint: POST /comments/add/:postId
 * Description: Adds a new comment to a specific post. Requires authentication.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request params:
 * - {string} postId - ID of the post to comment on
 *
 * Request body:
 * - {string} text - Comment text (required)
 *
 * Response (201):
 * - {object} comment - Created comment object with:
 *   - _id: Comment ID
 *   - text: Comment text
 *   - user: User ID who created the comment
 *   - post: Post ID the comment belongs to
 *   - createdAt: Creation timestamp
 *
 * Errors:
 * - 400: Comment text is required
 * - 404: Post not found
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const addCommentController = async (req, res) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        // Validation
        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                message: "Comment text is required",
                success: false,
                error: "Text field cannot be empty"
            });
        }

        if (text.length > 500) {
            return res.status(400).json({
                message: "Comment text is too long",
                success: false,
                error: "Maximum 500 characters allowed"
            });
        }

        // Check if post exists
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
                error: "The post you're trying to comment on doesn't exist"
            });
        }

        // Check if user exists
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: "User not found"
            });
        }

        // Create comment
        const comment = await commentModel.create({
            text: text.trim(),
            user: userId,
            post: postId
        });

        // Populate user details
        await comment.populate("user", "userName avatar");

        // Update post comment count
        await postModel.findByIdAndUpdate(
            postId,
            { commentCount: (post.commentCount || 0) + 1 },
            { new: true }
        );

        return res.status(201).json({
            message: "Comment added successfully",
            success: true,
            comment
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

/**
 * Delete a comment.
 *
 * Endpoint: DELETE /comments/:commentId
 * Description: Deletes a comment. Only the comment author or the post author can delete.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request params:
 * - {string} commentId - ID of the comment to delete
 *
 * Response (200):
 * - {string} message - Deletion success message
 *
 * Errors:
 * - 404: Comment not found
 * - 403: Unauthorized - only comment author or post author can delete
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteCommentController = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.user._id;

        // Find comment
        const comment = await commentModel.findById(commentId).populate("post");
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                success: false,
                error: "The comment you're trying to delete doesn't exist"
            });
        }

        // Authorization check: only comment author or post author can delete
        const isCommentAuthor = comment.user.toString() === userId.toString();
        const isPostAuthor = comment.post.author.toString() === userId.toString();

        if (!isCommentAuthor && !isPostAuthor) {
            return res.status(403).json({
                message: "Unauthorized",
                success: false,
                error: "You can only delete your own comments or comments on your posts"
            });
        }

        // Delete comment
        await commentModel.findByIdAndDelete(commentId);

        // Update post comment count
        await postModel.findByIdAndUpdate(
            comment.post._id,
            { commentCount: Math.max((comment.post.commentCount || 1) - 1, 0) },
            { new: true }
        );

        return res.status(200).json({
            message: "Comment deleted successfully",
            success: true
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

/**
 * Update a comment.
 *
 * Endpoint: PUT /comments/:commentId
 * Description: Updates a comment text. Only the comment author can update.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request params:
 * - {string} commentId - ID of the comment to update
 *
 * Request body:
 * - {string} text - New comment text (required)
 *
 * Response (200):
 * - {object} comment - Updated comment object with:
 *   - _id: Comment ID
 *   - text: Updated comment text
 *   - user: User ID who created the comment
 *   - post: Post ID the comment belongs to
 *   - updatedAt: Update timestamp
 *
 * Errors:
 * - 400: Comment text is required
 * - 404: Comment not found
 * - 403: Unauthorized - only comment author can update
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const updateCommentController = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const userId = req.user._id;

        // Validation
        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                message: "Comment text is required",
                success: false,
                error: "Text field cannot be empty"
            });
        }

        if (text.length > 500) {
            return res.status(400).json({
                message: "Comment text is too long",
                success: false,
                error: "Maximum 500 characters allowed"
            });
        }

        // Find comment
        const comment = await commentModel.findById(commentId);
        if (!comment) {
            return res.status(404).json({
                message: "Comment not found",
                success: false,
                error: "The comment you're trying to update doesn't exist"
            });
        }

        // Authorization check: only comment author can update
        if (comment.user.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "Unauthorized",
                success: false,
                error: "You can only edit your own comments"
            });
        }

        // Update comment
        const updatedComment = await commentModel.findByIdAndUpdate(
            commentId,
            { text: text.trim() },
            { new: true }
        ).populate("user", "userName avatar");

        return res.status(200).json({
            message: "Comment updated successfully",
            success: true,
            comment: updatedComment
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};

/**
 * Get all comments for a post.
 *
 * Endpoint: GET /comments/:postId
 * Description: Retrieves all comments for a specific post with user details.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request params:
 * - {string} postId - ID of the post
 *
 * Query parameters:
 * - {number} [limit=10] - Number of comments per page (optional)
 * - {number} [page=1] - Page number for pagination (optional)
 *
 * Response (200):
 * - {array} comments - Array of comment objects with:
 *   - _id: Comment ID
 *   - text: Comment text
 *   - user: User object with userName and avatar
 *   - post: Post ID
 *   - createdAt: Creation timestamp
 * - {number} total - Total number of comments
 * - {number} pages - Total number of pages
 * - {number} currentPage - Current page number
 *
 * Errors:
 * - 404: Post not found
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getCommentsController = async (req, res) => {
    try {
        const { postId } = req.params;
        const { limit = 10, page = 1 } = req.query;

        // Check if post exists
        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({
                message: "Post not found",
                success: false,
                error: "The post doesn't exist"
            });
        }

        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;

        // Get comments with pagination
        const comments = await commentModel
            .find({ post: postId })
            .populate("user", "userName avatar")
            .sort({ createdAt: -1 })
            .limit(limitNum)
            .skip(skip);

        // Get total count
        const total = await commentModel.countDocuments({ post: postId });
        const pages = Math.ceil(total / limitNum);

        return res.status(200).json({
            message: "Comments fetched successfully",
            success: true,
            comments,
            total,
            pages,
            currentPage: pageNum
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
};
