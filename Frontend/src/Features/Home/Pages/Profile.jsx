import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { usePost } from "../Hooks/useHome";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { userPosts, loading } = useSelector((state) => state.post);
  const { handleGetUserPosts } = usePost();

  console.log(user);
  useEffect(() => {
    if (user?._id) {
      handleGetUserPosts(user._id);
    }
  }, [user?._id]);
  const token = localStorage.getItem("token");
  if (!token || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl space-y-8">
        {/* User Header */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 bg-white p-6 rounded-lg shadow">
          <img
            src={user.avatar || "https://i.pravatar.cc/150"}
            alt={user.userName}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">
              {user.userName}
            </h2>
            <p className="text-gray-600">{user.email}</p>
            {user.bio && <p className="text-gray-700 mt-2">{user.bio}</p>}
            <div className="flex gap-6 mt-4 text-sm">
              <span className="text-gray-600">
                <strong>{userPosts?.length || 0}</strong> Projects
              </span>
              <span className="text-gray-600">
                <strong>{user.followers?.length || 0}</strong> Followers
              </span>
              <span className="text-gray-600">
                <strong>{user.following?.length || 0}</strong> Following
              </span>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-4">My Projects</h3>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Loading projects...</p>
              </div>
            </div>
          ) : !userPosts || userPosts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-500">No projects yet. Start creating!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {userPosts.filter(post => post && post._id).map((post) => (
                <div
                  key={post._id}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={post.media?.[0]}
                      alt=""
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition flex items-end justify-between p-3">
                      <span className="text-white text-sm">
                        ❤️ {post?.likesCount || 0}
                      </span>
                      <span className="text-white text-sm">
                        💬 {post?.comments?.length || 0}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Title */}
                    <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">
                      {post.caption}
                    </h4>

                    {/* Description (if exists) */}
                    {post.description && (
                      <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                        {post.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="mt-4 flex items-center justify-between">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {post.tags?.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Button */}
                      <button className="text-xs text-orange-500 font-medium hover:underline">
                        View
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
