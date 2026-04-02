import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import CreatePostModal from "./Components/CreatePostModal";
import useCreatePost from "../Hooks/useCreatePost";
import { Menu, Plus } from "lucide-react";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { isOpen: isCreatePostOpen, openModal: openCreatePost, closeModal: closeCreatePost } = useCreatePost();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Create Post Modal */}
      <CreatePostModal isOpen={isCreatePostOpen} onClose={closeCreatePost} />

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        setSidebarOpen={setSidebarOpen}
        onCreatePostClick={openCreatePost}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Topbar (mobile) */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow">
          <Menu
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer"
          />
          <h1 className="font-bold text-lg text-orange-500">BuildStack</h1>
          <button
            onClick={openCreatePost}
            className="bg-gradient-to-r from-violet-600 to-purple-500 text-white p-2 rounded-lg hover:shadow-md transition-all"
          >
            <Plus size={20} />
          </button>
        </div>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
