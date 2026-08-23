"use client";

import { useState } from "react";
import { Plus, X, Briefcase } from "lucide-react";
import { Form } from "@heroui/react";
import { addOpportunity } from "@/lib/actions/AddOpportunityForm";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const WORK_TYPES = ["Remote", "On-site", "Hybrid"];

const COMMITMENT_LEVELS = [
    "Full-time",
    "Part-time",
    "Internship",
    "Contract",
    "Volunteer",
];

const AddOpportunityPage = () => {
    const [form, setForm] = useState({
        roleTitle: "",
        skills: "",
        workType: "",
        commitmentLevel: "",
        deadline: "",
    });
    const [errors, setErrors] = useState({});

    const { data: session } = authClient.useSession();
    const user = session?.user;
    

    const handleChange = (field) => (e) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const skillTags = form.skills
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

    const removeSkill = (skillToRemove) => {
        const next = skillTags.filter((s) => s !== skillToRemove).join(", ");
        setForm((prev) => ({ ...prev, skills: next }));
    };

    const validate = () => {
        const next = {};
        if (!form.roleTitle.trim()) next.roleTitle = "Role title is required";
        if (!skillTags.length) next.skills = "At least one skill is required";
        if (!form.workType) next.workType = "Work type is required";
        if (!form.commitmentLevel)
            next.commitmentLevel = "Commitment level is required";
        if (!form.deadline) next.deadline = "Application deadline is required";
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    // Handle------------------------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        console.log(data);

        await addOpportunity({ ...data,userId : user?.id })
        toast.success('Opportunity Successfully created!');
    };

    return (
        <div className="p-6">
            <div className="max-w-2xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-xl font-semibold text-gray-900">Add Opportunity</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Fill in the details below to post a new opportunity.
                    </p>
                </div>

                <Form
                    onSubmit={handleSubmit}
                    className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5"
                >
                    {/* Role Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Role Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="roleTitle"
                            type="text"
                            value={form.roleTitle}
                            onChange={handleChange("roleTitle")}
                            placeholder="e.g. Frontend Engineer"
                            className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.roleTitle ? "border-red-400" : "border-gray-200"
                                }`}
                        />
                        {errors.roleTitle && (
                            <p className="text-xs text-red-500 mt-1">{errors.roleTitle}</p>
                        )}
                    </div>

                    {/* Required Skills */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Required Skills <span className="text-red-500">*</span>
                            <span className="text-gray-400 font-normal"> (comma-separated)</span>
                        </label>
                        <input
                            name="skills"
                            type="text"
                            value={form.skills}
                            onChange={handleChange("skills")}
                            placeholder="e.g. React, TypeScript, Tailwind CSS"
                            className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.skills ? "border-red-400" : "border-gray-200"
                                }`}
                        />
                        {errors.skills && (
                            <p className="text-xs text-red-500 mt-1">{errors.skills}</p>
                        )}
                        {skillTags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {skillTags.map((skill) => (
                                    <span
                                        key={skill}
                                        className="flex items-center gap-1 rounded-full bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(skill)}
                                            className="hover:text-blue-800"
                                        >
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Work Type + Commitment Level */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Work Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="workType"
                                value={form.workType}
                                onChange={handleChange("workType")}
                                className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.workType ? "border-red-400" : "border-gray-200"
                                    }`}
                            >
                                <option value="">Select work type</option>
                                {WORK_TYPES.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.workType && (
                                <p className="text-xs text-red-500 mt-1">{errors.workType}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Commitment Level <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="commitmentLevel"
                                value={form.commitmentLevel}
                                onChange={handleChange("commitmentLevel")}
                                className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.commitmentLevel ? "border-red-400" : "border-gray-200"
                                    }`}
                            >
                                <option value="">Select commitment level</option>
                                {COMMITMENT_LEVELS.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            {errors.commitmentLevel && (
                                <p className="text-xs text-red-500 mt-1">
                                    {errors.commitmentLevel}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Application Deadline */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                            Application Deadline <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="deadline"
                            type="date"
                            value={form.deadline}
                            onChange={handleChange("deadline")}
                            className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${errors.deadline ? "border-red-400" : "border-gray-200"
                                }`}
                        />
                        {errors.deadline && (
                            <p className="text-xs text-red-500 mt-1">{errors.deadline}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            className="flex items-center gap-2 rounded-lg bg-gray-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-gray-800 transition-colors"
                        >
                            <Plus size={16} />
                            Add Opportunity
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default AddOpportunityPage;