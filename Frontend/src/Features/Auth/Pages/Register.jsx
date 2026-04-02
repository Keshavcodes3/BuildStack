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

  // Track which part of the form we are on
  const [step, setStep] = useState(1);

  const [form, setform] = useState({
    userName: "",
    password: "",
    email: "",
    gender: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setform((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2); // Move to profile details
      return;
    }
    try {
      const data = await handleRegisterUser(form);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 overflow-hidden">
      <div className="w-full max-w-5xl bg-white rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[650px]">
        {/* Left Branding Panel (Static) */}
        <div className="md:w-1/2 relative bg-black p-12 flex flex-col justify-between text-white">
          <div className="absolute inset-0 opacity-50">
            <img
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80"
              alt="Tech"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </div>
          <div className="relative z-10 font-bold text-2xl tracking-tighter italic">
            BuildStack
          </div>
          <div className="relative z-10">
            <div className={`h-1 ${step==1?"w-10":"w-30"} bg-orange-500 mb-6 transition duration-200`} />
            <h1 className="text-4xl font-bold leading-tight mb-4">
              Step {step} of 2
            </h1>
            <p className="text-slate-400 text-sm">
              {step === 1
                ? "Secure your account with your credentials."
                : "Tell us a bit more about yourself."}
                
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex-1 p-10 md:p-16 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {step === 1 ? "Create account" : "Complete Profile"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {step === 1 ? (
              /* --- STEP 1: CREDENTIALS --- */
              <>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-medium"
                  >
                    <FaChrome /> Google
                  </button>
                  <button
                    type="button"
                    className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 text-sm font-medium"
                  >
                    <FaGithub /> GitHub
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      name="userName"
                      value={form.userName}
                      onChange={handleChange}
                      required
                      type="text"
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder="name@company.com"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={18}
                    />
                    <input
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm"
                    />
                  </div>
                </div>
              </>
            ) : (
              /* --- STEP 2: BIO & GENDER --- */
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-slate-400 text-xs mb-4 hover:text-orange-600 transition-colors"
                >
                  <ArrowLeft size={14} /> Back to credentials
                </button>

                <div className="mb-6">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-3">
                    Gender
                  </label>
                  <div className="flex gap-4">
                    {["Male", "Female", "Other"].map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-2 cursor-pointer border px-4 py-2 rounded-xl border-slate-200 has-[:checked]:border-orange-500 has-[:checked]:bg-orange-50 transition-all"
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={opt.toLowerCase()}
                          onChange={handleChange}
                          required
                          className="hidden"
                        />
                        <span className="text-sm text-slate-600">{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-2 ml-1">
                    About You (Bio)
                  </label>
                  <div className="relative">
                    <AlignLeft
                      className="absolute left-4 top-4 text-slate-400"
                      size={18}
                    />
                    <textarea
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      placeholder="Share your story..."
                      rows="4"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            )}
            

            <button
              type="submit"
              className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {step === 1 ? "Continue" : "Complete Registration"}
              <ArrowRight size={18} />
            </button>
          </form>

          {step === 1 && (
            <Link
              to="/login"
              className="mt-8 text-center text-sm text-slate-500"
            >
              Already have an account?{" "}
              <span className="text-orange-600 font-bold hover:underline">
                Log In
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
