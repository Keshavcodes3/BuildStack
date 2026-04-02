import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  AlignLeft,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { FaGithub, FaChrome } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegisterUser } = useAuth();

  const [step, setStep] = useState(1);

  const [form, setform] = useState({
    userName: "",
    password: "",
    email: "",
    gender: "",
    bio: "",
    avatar: null,
    avatarPreview: "",
  });

  // 🔹 Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setform((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      }));
    }
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    try {
        const userData={
          userName:form.userName,
          email:form.email,
          password:form.password,
          gender:form.gender,
          bio:form.bio,
          avatar:form.avatar
        }
      await handleRegisterUser(userData);
      console.log(userData)
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[650px]">
        {/* LEFT PANEL */}
        <div className="md:w-1/2 relative bg-black p-12 flex flex-col justify-between text-white">
          <div className="absolute inset-0 opacity-50">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>

          <div className="relative z-10 text-2xl font-bold italic">
            BuildStack
          </div>

          <div className="relative z-10">
            <div
              className={`h-1 ${
                step === 1 ? "w-10" : "w-32"
              } bg-orange-500 mb-6 transition-all`}
            />
            <h1 className="text-4xl font-bold mb-4">Step {step} of 2</h1>
            <p className="text-slate-400 text-sm">
              {step === 1 ? "Secure your account" : "Complete your profile"}
            </p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-900">
            {step === 1 ? "Create account" : "Complete Profile"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {step === 1 ? (
              <>
                {/* Social */}
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex items-center justify-center gap-2 py-3 border rounded-xl">
                    <FaChrome /> Google
                  </button>
                  <button className="flex items-center justify-center gap-2 py-3 border rounded-xl">
                    <FaGithub /> GitHub
                  </button>
                </div>

                {/* Name */}
                <Input
                  icon={<User />}
                  name="userName"
                  placeholder="Full Name"
                  value={form.userName}
                  onChange={handleChange}
                />

                {/* Email */}
                <Input
                  icon={<Mail />}
                  name="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                />

                {/* Password */}
                <Input
                  icon={<Lock />}
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
              </>
            ) : (
              <div className="space-y-6">
                {/* BACK */}
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-sm text-gray-400 hover:text-orange-500"
                >
                  <ArrowLeft size={14} /> Back
                </button>

                {/* AVATAR */}
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <img
                      src={form.avatarPreview || "https://i.pravatar.cc/150"}
                      className="w-24 h-24 rounded-full object-cover border-4 border-orange-100"
                    />

                    <label className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer">
                      <span className="text-white text-xs">Change</span>
                      <input
                        type="file"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <p className="text-xs text-gray-400 mt-2">Upload avatar</p>
                </div>

                {/* Gender */}
                <div className="flex gap-4">
                  {["male", "female", "other"].map((g) => (
                    <label
                      key={g}
                      className="border px-4 py-2 rounded-xl cursor-pointer has-[:checked]:bg-orange-100 has-[:checked]:border-orange-500"
                    >
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        onChange={handleChange}
                        className="hidden"
                      />
                      {g}
                    </label>
                  ))}
                </div>

                {/* Bio */}
                <div className="relative">
                  <AlignLeft className="absolute left-3 top-3 text-gray-400" />
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    className="w-full pl-10 py-3 border rounded-xl"
                    placeholder="Your bio..."
                  />
                </div>
              </div>
            )}

            {/* SUBMIT */}
            <button className="w-full py-3 bg-orange-500 text-white rounded-xl flex items-center justify-center gap-2">
              {step === 1 ? "Continue" : "Register"}
              <ArrowRight size={18} />
            </button>
          </form>

          {/* LOGIN LINK */}
          {step === 1 && (
            <Link to="/login" className="text-sm text-center mt-6">
              Already have an account?{" "}
              <span className="text-orange-500 font-bold">Login</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

// 🔹 Reusable Input
const Input = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      {icon}
    </div>
    <input
      {...props}
      className="w-full pl-10 pr-4 py-3 border rounded-xl outline-none"
    />
  </div>
);
