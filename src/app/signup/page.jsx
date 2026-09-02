"use client";

import { useState } from "react";
import { UserPlus, Eye, EyeOff, ImageIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@heroui/react";
import { FaGoogle } from "react-icons/fa";

const SIGNUP_ROLES = ["founder", "collaborator"];

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    email: "",
    password: "",
    signupAs: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) {
      next.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      next.email = "Enter a valid email";
    }
    if (!form.password) {
      next.password = "Password is required";
    } else if (form.password.length < 8) {
      next.password = "Password must be at least 8 characters";
    }
    if (!form.signupAs) next.signupAs = "Please select a role";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  // Handle_Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    // console.log(user)
    try {
      const response = await authClient.signUp.email({
        ...user,
        plan: "free",
        status: "active",
      });

      console.log("Signup successful:", response);
    } catch (error) {
      console.error("Signup failed:", error);
    }
    toast.success("Account Created Successfully")
    redirect(`/dashboard/${user?.role}`)
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: 'google',
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-semibold text-gray-900">Create your account</h1>
          <p className="text-sm text-gray-500 mt-1">
            Sign up to get started.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="e.g. Jane Doe"
              className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.name ? "border-red-400" : "border-gray-200"
                }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Image URL
            </label>
            <div className="relative">
              <ImageIcon
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                name="image"
                type="url"
                value={form.imageUrl}
                onChange={handleChange("imageUrl")}
                placeholder="https://example.com/avatar.jpg"
                className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange("email")}
              placeholder="you@example.com"
              className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.email ? "border-red-400" : "border-gray-200"
                }`}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange("password")}
                placeholder="At least 8 characters"
                className={`w-full rounded-lg border bg-gray-50 px-3 py-2 pr-10 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.password ? "border-red-400" : "border-gray-200"
                  }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          {/* Signup As */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Signup As <span className="text-red-500">*</span>
            </label>
            <select
              name="role"
              value={form.signupAs}
              onChange={handleChange("signupAs")}
              className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.signupAs ? "border-red-400" : "border-gray-200"
                }`}
            >
              <option value="">Select role</option>
              {SIGNUP_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            {errors.signupAs && (
              <p className="text-xs text-red-500 mt-1">{errors.signupAs}</p>
            )}
          </div>

          <p className=" w-full flex justify-center">or</p>

          <div className=" w-full flex justify-center">
            <Button onClick={handleGoogleSignIn} className="w-full" variant="tertiary">
              <FaGoogle />
              Sign in with Google
            </Button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-gray-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-gray-800 transition-colors"
          >
            <UserPlus size={16} />
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/signin" className="font-medium text-gray-900 hover:underline">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;