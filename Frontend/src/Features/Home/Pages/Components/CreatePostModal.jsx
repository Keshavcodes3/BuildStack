import { useState, useRef } from "react";
import { X, Image, Send, Lock, Globe } from "lucide-react";
import { usePost } from "../../Hooks/useHome";

const CreatePostModal = ({ isOpen, onClose, onPostCreated }) => {
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [media, setMedia] = useState([]);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [visibility, setVisibility] = useState("public");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const { handleCreatePost } = usePost();

  const handleMediaSelect = (e) => {
    const files = Array.from(e.target.files);
    const newMediaFiles = [...mediaFiles, ...files];
    
    if (newMediaFiles.length > 5) {
      setError("You can upload maximum 5 files");
      return;
    }

    setMediaFiles(newMediaFiles);
    
    // Preview
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        setMedia((prev) => [...prev, event.target.result]);
      };
      reader.readAsDataURL(file);
    });

    setError("");
  };

  const removeMedia = (index) => {
    setMedia((prev) => prev.filter((_, i) => i !== index));
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!caption.trim() && mediaFiles.length === 0) {
      setError("Please add a caption or media");
      return;
    }

    setLoading(true);
    
    try {
      const postData = {
        caption: caption.trim(),
        visibility,
        tags: tags
          .split(",")
          .map((t) => t.trim())
          .filter((t) => t),
        media: mediaFiles.length > 0 ? mediaFiles[0] : null,
      };

      await handleCreatePost(postData);
      
      // Reset form
      setCaption("");
      setTags("");
      setMedia([]);
      setMediaFiles([]);
      setVisibility("public");
      setError("");
      
      onClose();
      onPostCreated?.();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-violet-600 to-purple-500 text-white p-6 flex justify-between items-center shadow-lg">
          <h2 className="text-2xl font-bold">Create a New Project</h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="hover:bg-white/20 p-2 rounded-lg transition-all disabled:opacity-50"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2 animate-pulse">
              <span className="text-2xl">⚠️</span> 
              <span>{error}</span>
            </div>
          )}

          {/* Caption */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Caption/Description
            </label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Share your project ideas, achievements, or announcements..."
              disabled={loading}
              className="w-full h-28 p-4 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none resize-none transition-colors placeholder-gray-400 disabled:bg-gray-50 disabled:opacity-60"
            />
            <p className="text-xs text-gray-500 mt-1">{caption.length}/500 characters</p>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., React, Web Design, Portfolio"
              disabled={loading}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-violet-500 focus:outline-none transition-colors placeholder-gray-400 disabled:bg-gray-50 disabled:opacity-60"
            />
          </div>

          {/* Media Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Media (Optional) - Max 5 files
            </label>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="w-full border-2 border-dashed border-violet-300 bg-violet-50 hover:bg-violet-100 rounded-xl p-8 text-center transition-all hover:border-violet-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="flex flex-col items-center gap-2">
                <Image size={32} className="text-violet-600" />
                <p className="text-sm font-medium text-gray-700">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              onChange={handleMediaSelect}
              disabled={loading}
              className="hidden"
            />

            {/* Media Preview */}
            {media.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-3">
                {media.map((preview, index) => (
                  <div
                    key={index}
                    className="relative group rounded-lg overflow-hidden ring-2 ring-violet-200"
                  >
                    <img
                      src={preview}
                      alt={`preview-${index}`}
                      className="w-full h-24 object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      disabled={loading}
                      className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity disabled:opacity-50"
                    >
                      <X size={24} className="text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Visibility Toggle */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Visibility
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setVisibility("public")}
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 ${
                  visibility === "public"
                    ? "bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Globe size={18} />
                Public
              </button>
              <button
                type="button"
                onClick={() => setVisibility("private")}
                disabled={loading}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all disabled:opacity-50 ${
                  visibility === "private"
                    ? "bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Lock size={18} />
                Private
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg disabled:opacity-70 flex items-center justify-center gap-2 transition-all disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin">⏳</div>
                  Creating...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Create Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};


export default CreatePostModal;
