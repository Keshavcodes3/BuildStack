import React from "react";
import { Heart } from 'lucide-react';

const PostFeed = ({ posts }) => {
  return (
    <div className="w-full flex flex-col gap-6">
      {posts?.map((post) => (
        <div
          key={post._id}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4">
            <img
              src={post.author?.avatar}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h4 className="text-sm font-semibold text-gray-900">
                {post.author?.userName}
              </h4>
              <p className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Media */}
          {post?.media?.length > 0 && (
            <img
              src={post.media[0]}
              alt=""
              className="w-full h-72 object-cover"
            />
          )}

          {/* Content */}
          <div className="p-4">
            <p className="text-gray-800 text-sm mb-3">{post.caption}</p>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <Heart> {post.likesCount || 0}</Heart>

              <span className="text-orange-500 cursor-pointer hover:underline">
                View Details
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PostFeed;
