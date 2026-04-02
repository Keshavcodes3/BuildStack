import React, { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { usePost } from "../../Hooks/useHome";

const PostFeed = ({ posts }) => {
  const [likedPosts, setLikedPosts] = useState(new Set());
  const { handleLikePost } = usePost();

  const toggleLike = async (postId) => {
    try {
      await handleLikePost(postId);
      setLikedPosts((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId);
        } else {
          newSet.add(postId);
        }
        return newSet;
      });
    } catch (error) {
      console.error("Failed to like post:", error);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6 pb-8">
      {posts?.filter(post => post && post._id)?.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 group"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-50">
            <div className="flex items-center gap-3">
              <img
                src={post.author?.avatar || "https://via.placeholder.com/40"}
                alt={post.author?.userName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-100"
              />
              <div>
                <h4 className="text-sm font-semibold text-gray-900">
                  {post.author?.userName || "Anonymous"}
                </h4>
                <p className="text-xs text-gray-400">
                  {post.createdAt ? new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  }) : ""}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-xs font-medium text-gray-600 capitalize">
                {post.visibility || "public"}
              </span>
            </div>
          </div>

          {/* Media */}
          {post?.media?.length > 0 && (
            <div className="relative h-72 overflow-hidden bg-gray-100 group-hover:opacity-95 transition-opacity">
              <img
                src={post.media[0]}
                alt="Post media"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {post.media.length > 1 && (
                <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  +{post.media.length - 1}
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-5">
            {/* Caption */}
            <p className="text-gray-800 text-sm mb-3 leading-relaxed">
              {post.caption}
            </p>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-violet-100 to-purple-100 text-violet-700 hover:shadow-md transition-shadow cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Interaction Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex items-center gap-6 text-gray-500">
                {/* Like Button */}
                <button
                  onClick={() => toggleLike(post._id)}
                  className="flex items-center gap-2 hover:text-red-500 transition-colors group/like"
                >
                  <div
                    className={`p-2 rounded-full transition-all ${
                      likedPosts.has(post._id)
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-50 group-hover/like:bg-red-50"
                    }`}
                  >
                    <Heart
                      size={18}
                      className={likedPosts.has(post._id) ? "fill-current" : ""}
                    />
                  </div>
                  <span className="text-sm font-medium">
                    {(post.likesCount || 0) + (likedPosts.has(post._id) ? 1 : 0)}
                  </span>
                </button>

                {/* Comment Button */}
                <button className="flex items-center gap-2 hover:text-blue-500 transition-colors group/comment">
                  <div className="p-2 rounded-full bg-gray-50 group-hover/comment:bg-blue-50">
                    <MessageCircle size={18} />
                  </div>
                  <span className="text-sm font-medium">
                    {post.commentsCount || 0}
                  </span>
                </button>

                {/* Share Button */}
                <button className="flex items-center gap-2 hover:text-green-500 transition-colors group/share">
                  <div className="p-2 rounded-full bg-gray-50 group-hover/share:bg-green-50">
                    <Share2 size={18} />
                  </div>
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>

              {/* View Details */}
              <button className="text-orange-500 hover:text-orange-600 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostFeed;
