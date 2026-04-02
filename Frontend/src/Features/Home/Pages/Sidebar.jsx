import { NavLink, useNavigate } from "react-router-dom";
import { Home, Compass, User, X, LogOut } from "lucide-react";
import useAuth from "../../Auth/Hooks/useAuth";

const Sidebar = ({ isOpen, setSidebarOpen }) => {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed z-50 top-0 left-0 h-screen w-64 bg-white border-r border-gray-100 p-6 transform transition-transform duration-300 flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:sticky`}
      >
        {/* Mobile Header */}
        <div className="flex justify-between items-center mb-8 lg:hidden">
          <h1 className="text-xl font-bold bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
            BuildStack
          </h1>
          <X onClick={() => setSidebarOpen(false)} className="cursor-pointer" />
        </div>

        {/* Logo */}
        <h1 className="hidden lg:block text-2xl font-black mb-10 bg-gradient-to-r from-violet-600 to-purple-500 bg-clip-text text-transparent">
          BuildStack
        </h1>

        {/* Nav */}
        <nav className="flex flex-col gap-2 flex-1">
          <NavItem to="/home" label="Home" icon={<Home size={18} />} />
          <NavItem to="/explore" label="Explore" icon={<Compass size={18} />} />
          <NavItem to="/profile" label="Profile" icon={<User size={18} />} />
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogoutClick}
          className="flex items-center gap-3 px-4 py-3 rounded-xl transition text-gray-500 hover:bg-red-50 hover:text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </>
  );
};

const NavItem = ({ to, label, icon }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-medium
      ${
        isActive
          ? "bg-gradient-to-r from-violet-600 to-purple-500 text-white shadow-md"
          : "text-gray-600 hover:bg-gray-100"
      }`
    }
  >
    {icon}
    {label}
  </NavLink>
);

export default Sidebar;