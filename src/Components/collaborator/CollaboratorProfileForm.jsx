"use client";

import { useRef, useState } from "react";
import { Mail, ImageIcon, Save, UserRound } from "lucide-react";
import { Form } from "@heroui/react";
import toast from "react-hot-toast";
import ProfileUpdateForm from "@/lib/actions/ProfileUpdateForm";

const ProfileForm = ({ user }) => {
    const nameRef = useRef(null);
    const imageRef = useRef(null);
    const skillsRef = useRef(null);
    const bioRef = useRef(null);

    const [errors, setErrors] = useState({});
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // console.log(data);
        //  console.log(user?.id)
       await ProfileUpdateForm(data)
        toast.success('profile Successfully Updated!');

        
    };

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-gray-900">My Profile</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        View and update your profile details.
                    </p>
                </div>

                <Form
                    onSubmit={handleUpdate}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5"
                >
                    {/* Avatar preview */}
                    <div className="flex items-center gap-4 pb-2">
                        {user?.image ? (
                            <img
                                src={user.image}
                                alt="Profile"
                                className="h-16 w-16 rounded-full object-cover border border-gray-200"
                            />
                        ) : (
                            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200">
                                <UserRound className="text-gray-400" size={26} />
                            </div>
                        )}
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {user?.name || "Unnamed"}
                            </p>
                            <p className="text-xs text-gray-500">{user?.role || "Collaborator"}</p>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            ref={nameRef}
                            type="text"
                            defaultValue={user?.name || ""}
                            placeholder="e.g. Jane Doe"
                            className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.name ? "border-red-400" : "border-gray-200"
                                }`}
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Email
                        </label>
                        <div className="relative">
                            <Mail
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                name="email"
                                type="email"
                                defaultValue={user?.email || ""}
                                readOnly
                                disabled
                                className="w-full rounded-lg border border-gray-200 bg-gray-100 pl-9 pr-3 py-2 text-sm text-gray-500 outline-none cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            Your email address can not be changed.
                        </p>
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
                                ref={imageRef}
                                type="url"
                                defaultValue={user?.image || ""}
                                placeholder="https://example.com/avatar.jpg"
                                className="w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                            />
                        </div>
                    </div>

                    {/* Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Skills
                            <span className="text-gray-400 font-normal"> (comma-separated)</span>
                        </label>
                        <input
                            name="skills"
                            ref={skillsRef}
                            type="text"
                            defaultValue={user?.skills || ""}
                            placeholder="e.g. React, Node.js, UI Design"
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
                        />
                    </div>

                    {/* Bio */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            ref={bioRef}
                            defaultValue={user?.bio || ""}
                            rows={4}
                            placeholder="Tell others a bit about yourself..."
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 resize-none"
                        />
                    </div>

                    {/* Save */}
                    <div className="flex items-center justify-end gap-3 pt-2">
                        {saved && (
                            <span className="text-sm text-green-600">Profile updated</span>
                        )}
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex items-center gap-2 rounded-lg bg-gray-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Save size={16} />
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default ProfileForm;