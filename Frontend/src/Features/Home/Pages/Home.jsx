import React, { useEffect } from "react";
import { usePost } from "../Hooks/useHome";
import { useSelector } from "react-redux";
import PostFeed from "./Components/PostFeed";

const Home = () => {
  const { posts, loading, error } = useSelector((state) => state.post);
  const { handleGetPosts } = usePost();
  console.log(posts);
  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <div className="flex pl-5">
      <div className="w-full max-w-4xl space-y-6">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading posts...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error loading posts: {error}</p>
          </div>
        ) : !posts || posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No posts yet. Start creating!</p>
          </div>
        ) : (
          <div className="h-screen overflow-y-auto" id="hidden-bar">
            <PostFeed posts={posts} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
