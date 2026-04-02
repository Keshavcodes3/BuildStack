import React, { useState } from "react";
import { Mail, Lock, HelpCircle } from "lucide-react";
import { FaGithub, FaChrome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth  from "../Hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { handleLoginUser } = useAuth();

  // 1. Initialize local state for the login form
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  // 2. Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 3. Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming handleLogin takes (email, password) or a data object
      const success = await handleLoginUser(formData);
      if(success){
        navigate('/home')
      }
      
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[700px] relative">
        {/* Left Branding Panel */}
        <div className="md:w-1/2 relative bg-black p-12 flex flex-col justify-between text-white">
          <div className="absolute inset-0 opacity-40">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80"
              alt="Coding"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-transparent" />
          </div>

          <div className="relative z-10 flex items-center gap-2 font-bold text-2xl tracking-tighter">
            <span className="text-orange-500 text-3xl">🚀</span> BuildStack
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-x-3">
              <div className="h-1 w-15 bg-orange-500 mb-6" />
              <h1 className="mb-6 text-orange-200 uppercase text-xs font-bold tracking-widest">
                The Solar Studio
              </h1>
            </div>
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Where code meets <br />{" "}
              <span className="text-orange-500 italic">kinetic energy.</span>
            </h1>
            <p className="text-slate-400 text-sm max-w-sm">
              Experience the next generation of deployment orchestration with
              BuildStack's premium environment.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-black bg-slate-800 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/100?img=${i + 20}`}
                    alt="user"
                  />
                </div>
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-500 tracking-wider">
              TRUSTED BY 2K+ DEVS
            </span>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Welcome back
          </h2>
          <p className="text-slate-500 text-sm mb-8">
            Sign in to manage your Solaris Forge deployments.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-sm transition-all"
            >
              <FaGithub size={18} /> GitHub
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 font-medium text-sm transition-all"
            >
              <FaChrome size={18} /> Google
            </button>
          </div>

          <div className="relative flex items-center mb-8">
            <div className="flex-grow border-t border-slate-100"></div>
            <span className="flex-shrink mx-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
              Or use UserName
            </span>
            <div className="flex-grow border-t border-slate-100"></div>
          </div>

          {/* Form with Submit Handler */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 ml-1">
                User Name
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  name="userName"
                  type="text"
                  required
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="dev@solaris.forge"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[10px] font-bold uppercase text-slate-500">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[10px] font-bold uppercase text-orange-600 hover:text-orange-700"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none text-sm transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 px-1">
              <input
                type="checkbox"
                id="rem"
                className="w-4 h-4 rounded border-slate-300 text-orange-600 focus:ring-orange-500"
              />
              <label
                htmlFor="rem"
                className="text-xs text-slate-500 font-medium cursor-pointer"
              >
                Remember me for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg shadow-orange-600/20 transition-all active:scale-[0.98]"
            >
              Sign In to BuildStack
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="text-orange-600 font-bold cursor-pointer hover:underline"
            >
              Create an account
            </Link>
          </p>

          <div className="absolute bottom-8 right-8 text-slate-400 hover:text-slate-600 cursor-pointer">
            <HelpCircle size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
