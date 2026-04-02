import React, { useEffect, useState, useMemo } from "react";
import { usePost } from "../Hooks/useHome";
import { useSelector } from "react-redux";
import { Heart, MessageCircle, Eye, Search } from "lucide-react";

const Explore = () => {
  const { posts, loading, error } = useSelector((state) => state.post);
  const { handleGetPosts } = usePost();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    handleGetPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    if (posts && Array.isArray(posts)) {
      return posts
        .filter((post) => post && post._id)
        .filter(
          (post) =>
            post.caption?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.tags?.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }
    return [];
  }, [posts, searchTerm]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-violet-200 border-t-violet-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Discovering amazing projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-linear-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl p-6 backdrop-blur">
          <p className="text-red-800 font-semibold">⚠️ Error loading projects</p>
          <p className="text-red-600 text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-black bg-linear-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                Explore Projects
              </h1>
              <p className="text-gray-600 text-lg">
                Discover amazing projects built by our community
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search projects or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all shadow-sm"
              />
            </div>

            {/* Stats */}
            <div className="flex gap-6 text-sm text-gray-600">
              <span className="font-semibold">
                📊 <span className="text-violet-600">{filteredPosts.length}</span> Projects
              </span>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray-500 text-lg font-medium">
                {posts?.length === 0 ? "No projects yet" : "No projects match your search"}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Check back soon for more amazing work!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {filteredPosts.map((post) => (
              <ProjectCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ProjectCard = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative h-48 bg-linear-to-br from-violet-100 to-purple-100 overflow-hidden">
        {post.media && post.media.length > 0 ? (
          <img
            src={post.media[0]}
            alt={post.caption}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-violet-500/20 to-purple-500/20">
            <div className="text-4xl">📦</div>
          </div>
        )}

        {/* Overlay Badge */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Floating Stats (visible on hover) */}
        {isHovered && (
          <div className="absolute bottom-4 left-4 right-4 flex gap-3 text-white text-sm font-semibold">
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur px-3 py-1 rounded-lg">
              <Heart size={16} />
              <span>{post.likes?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur px-3 py-1 rounded-lg">
              <MessageCircle size={16} />
              <span>{post.commentCount || post.comments?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur px-3 py-1 rounded-lg ml-auto">
              <Eye size={16} />
              <span>{post.views || "0"}</span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Author Info */}
        {post.author && (
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=" + post.author._id}
              alt={post.author.userName}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-violet-100"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">
                {post.author.userName}
              </p>
              {post.createdAt && (
                <p className="text-xs text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Title */}
        <div>
          <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-violet-600 transition">
            {post.caption}
          </h3>
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-linear-to-r from-violet-100 to-purple-100 text-violet-700 hover:shadow-md transition-shadow"
              >
                #{tag}
              </span>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs text-gray-500 self-center">
                +{post.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Footer Stats */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-600">
          <span className="font-medium">
            {post.visibility === "private" ? "🔒 Private" : "🌐 Public"}
          </span>
          <span className="text-gray-400">
            {post.likes?.length || 0} likes · {post.comments?.length || 0} comments
          </span>
        </div>
      </div>

      {/* Hover CTA */}
      {isHovered && (
        <div className="absolute bottom-4 left-4 right-4">
          <button className="w-full bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-all shadow-lg transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            View Project
          </button>
        </div>
      )}
    </div>
  );
};

export default Explore;