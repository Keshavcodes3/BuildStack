import { uploadToCloudinary } from "../Utils/uploadToCloudinary.js";
import postModel from "../Models/post.model.js";
import userModel from "../Models/user.model.js";
import followModel from "../Models/follow.model.js";
import likeModel from "../Models/like.model.js";

/**
 * Create a new post/project.
 *
 * Endpoint: POST /createProject
 * Description: Creates a new post with optional media files and metadata.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request form-data:
 * - {string} caption - Post caption/description
 * - {array} [media] - Array of image/video files (optional)
 * - {string} tags - Post tags (comma-separated or JSON array)
 * - {string} [visibility] - Visibility level: "public" or "private" (default: "public")
 *
 * Response (201):
 * - {object} post - Created post object with:
 *   - _id: Post ID
 *   - caption: Post caption
 *   - media: Array of media URLs
 *   - tags: Post tags
 *   - visibility: Visibility setting
 *   - author: Author user ID
 *   - createdAt: Creation timestamp
 *
 * Errors:
 * - 400: Post must have caption or media
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const createProjectController = async (req, res) => {
    try {
        const { caption, visibility, tags } = req.body;

        if (!caption && (!req.files || req.files.length === 0)) {
            return res.status(400).json({
                message: "Post must have caption or media",
                success: false
            });
        }

        let mediaUrls = [];

        if (req.files && req.files.length > 0) {
            const uploadedImages = await Promise.all(
                req.files.map(file => uploadToCloudinary(file.buffer, { folder: "buildstack/posts" }))
            );

            mediaUrls = uploadedImages.map(img => img.secure_url);
        }

        const post = await postModel.create({
            caption,
            tags: tags,
            media: mediaUrls,
            visibility: visibility || "public",
            author: req.user._id
        });

        return res.status(201).json({
            message: "Post created successfully",
            success: true,
            post
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
 * Get all public posts/projects feed.
 *
 * Endpoint: GET /getProjects
 * Description: Retrieves all public posts from all users, sorted by newest first.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request:
 * - req.user._id populated by IdentifyUser middleware
 *
 * Response (200):
 * - {array} posts - Array of post objects with:
 *   - _id: Post ID
 *   - caption: Post caption
 *   - media: Array of media URLs
 *   - author: Author object with userName and avatar
 *   - tags: Post tags
 *   - visibility: Visibility setting
 *   - createdAt: Creation timestamp
 *
 * Errors:
 * - 404: User not found
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getProjectsController = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: "User not found"
            })
        }
        const posts = await postModel.find({ visibility: "public" }).populate("author", "userName avatar").sort({ createdAt: -1 });
        return res.status(200).json({
            message: "Feed fetched successfully",
            success: true,
            posts
        });
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
}




/**
 * Get all posts by a specific user.
 *
 * Endpoint: GET /projects/:id/projects
 * Description: Retrieves all posts authored by a specific user.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request params:
 * - {string} id - User ID to fetch posts from
 *
 * Response (200):
 * - {array} posts - Array of post objects with:
 *   - _id: Post ID
 *   - caption: Post caption
 *   - media: Array of media URLs
 *   - author: Author user ID
 *   - tags: Post tags
 *   - visibility: Visibility setting
 *   - createdAt: Creation timestamp
 *
 * Errors:
 * - 404: User not found or requested user does not exist
 * - 200 (success: false): No posts found by the requested user
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
//&👉 All posts by a specific user
export const getUserProjectsController = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: "User not found"
            })
        }
        const id = req.params.id;
        const requestedUser = await userModel.findById(id)
        if (!requestedUser) {
            return res.status(404).json({
                message: "No user found",
                error: "The requested user do not exist in our platform",
                success: false
            })
        }
        const post = await postModel.find({ author: id })
        if (!post) {
            return res.status(200).json({
                message: "No post found of the requested user",
                error: "Zero post found",
                success: false
            })
        }
        return res.status(200).json({
            message: "All posts fetched successfully",
            success: true,
            posts: post
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
}


//*🔍 Get Single Post

/**
 * Get a single post/project by ID.
 *
 * Endpoint: GET /projects/:postId
 * Description: Retrieves detailed information about a specific post.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request params:
 * - {string} postId - Post ID to fetch
 *
 * Response (200):
 * - {object} post - Post object with:
 *   - _id: Post ID
 *   - caption: Post caption
 *   - media: Array of media URLs
 *   - author: Author object with userName and avatar
 *   - tags: Post tags
 *   - visibility: Visibility setting
 *   - createdAt: Creation timestamp
 *   - updatedAt: Last update timestamp
 *
 * Errors:
 * - 404: User not found
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const getSingleProjectController = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
                error: "User not found"
            })
        }
        const postId = req.params.postId
        const Post = await postModel.findById(postId).populate('author', 'userName avatar')
        return res.status(200).json({
            message: "Post details fetched successfully",
            success: true,
            post: Post
        })
    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
}


//?✏️ delete Post :  Only owner can delete 

/**
 * Delete a post (ownership required).
 *
 * Endpoint: DELETE /projects/:postId
 * Description: Deletes a post. Only the post owner can delete it.
 * Access: Protected (requires IdentifyUser middleware)
 *
 * Request params:
 * - {string} postId - Post ID to delete
 *
 * Response (200):
 * - {object} message - Success message
 *
 * Errors:
 * - 404: Post not found or user not found
 * - 403: Unauthorized - user is not the post owner
 * - 500: Internal server error
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 */
export const deleteProjectController = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "No user found",
                success: false,
                error: "No user exists with the given email"
            })
        }
        const projectId = req.params.id
        const project = await postModel.findById(projectId)
        if (!project) {
            return res.status(404).json({
                message: "No post found",
                success: false,
                error: "Theres no post "
            })
        }
        if (project.author.toString() !== userId.toString()) {
            return res.status(403).json({
                message: "Unauthorized",
                success: false,
            });
        }

        // Delete project
        await postModel.findByIdAndDelete(projectId);

        return res.status(200).json({
            message: "Project deleted successfully",
            success: true,
        });

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
}



export const likeProjectController = async (req, res) => {
    try {
        const userId = req.user._id;
        const projectId = req.params.id;
        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "User not authenticated",
                success: false,
                error: "User not found"
            })
        }
        const project = await postModel.findById(projectId)
        if (!project) {
            return res.status(400).json({
                message: "Project not found",
                success: false,
                error: "Project dont exist"
            })
        }
        const Like = await likeModel.findOne({
            post: projectId,
            user: userId
        })
        //&DisLike if exist
        if (Like) {
            // If like exists -> Remove it (Unlike)
            await likeModel.deleteOne({ _id: Like._id });
            await postModel.findByIdAndUpdate(projectId, {
                $inc: { likesCount: -1 },
                $pull: { likes: userId } // Keep the array in sync
            });

            return res.status(200).json({
                message: "Unliked successfully",
                success: true
            });
        } else {
            // If like doesn't exist -> Create it (Like)
            await likeModel.create({
                post: projectId,
                user: userId
            });
            await postModel.findByIdAndUpdate(projectId, {
                $inc: { likesCount: 1 },
                $push: { likes: userId } // Keep the array in sync
            });

            return res.status(201).json({
                message: "Liked successfully",
                success: true
            });
        }

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: err.message
        });
    }
}