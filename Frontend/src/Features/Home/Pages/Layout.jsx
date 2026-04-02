import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Topbar (mobile) */}
        <div className="lg:hidden flex items-center justify-between p-4 bg-white shadow">
          <Menu
            onClick={() => setSidebarOpen(true)}
            className="cursor-pointer"
          />
          <h1 className="font-bold text-lg text-orange-500">BuildStack</h1>
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
