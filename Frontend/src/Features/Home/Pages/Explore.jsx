import React, { useEffect } from "react";
import { usePost } from "../Hooks/useHome";
import { useSelector } from "react-redux";

const Explore = () => {
  const { posts, loading, error } = useSelector((state) => state.post);
  const { handleGetPosts } = usePost();

  useEffect(() => {
    handleGetPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Exploring projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">Error loading projects: {error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-6xl space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">Explore Projects</h1>
        
        {!posts || posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No projects available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
            >
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {post.title}
                </h3>
                <p className="text-gray-600 mt-2 line-clamp-2">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {post.likes?.length || 0} likes
                  </span>
                  <span className="text-sm text-gray-500">
                    {post.comments?.length || 0} comments
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default Explore;