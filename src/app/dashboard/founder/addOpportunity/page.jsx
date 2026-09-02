"use client";

import { useEffect, useState } from "react";
import { Plus, X, Briefcase } from "lucide-react";
import { Form } from "@heroui/react";
import { addOpportunity } from "@/lib/actions/AddOpportunityForm";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import Link from "next/link";
import { Lock, Zap } from "lucide-react";
import { getMyStartups } from "@/lib/actions/GetMyStartupAction";

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
    const [startupStatus, setStartupStatus] = useState(false);
    const [cnt, setCnt] = useState(0);

    const { data: session } = authClient.useSession();
    const user = session?.user;



    useEffect(() => {

        const fetchStartup = async () => {
            try {

                const data = await getMyStartups();
                // console.log("StartupData:",data);


                // console.log(data)
                // data.forEach(d => console.log("d-> user id: ",d.userId))

                if (data?.some(d => d?.userId == user?.id && d?.status == "approved")) {
                    setStartupStatus(true)
                }
            } catch (error) {
                console.error(error);
            }
        };

        const fetchOpportunity = async () => {
            // For total opportunity
            const res2 = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/opportunities`)
            const opportunityData = await res2.json();
            // console.log(opportunityData)

            const filterOppData = opportunityData?.filter(oppdata => oppdata?.userId == user?.id)
            // console.log(filterOppData.length);
            setCnt(filterOppData.length);
        }

        fetchStartup();
        fetchOpportunity();
    }, [user?.id]);

    // console.log(startupStatus);
    // console.log("user id: " ,user?.id)

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
        try {
            e.preventDefault();

            const formData = new FormData(e.currentTarget);
            const data = Object.fromEntries(formData.entries());

            // console.log(data);

            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mystartup`)
            const mystartup = await res.json();
            const findStartup = mystartup?.find(data => data?.userId == user?.id)
            //  console.log(findStartup);

            await addOpportunity({ ...data, userId: user?.id, startup: findStartup?.name, startupId: findStartup?._id })
            toast.success('Opportunity Successfully created!');
            setCnt(cnt + 1);
        } catch (error) {
            console.log(error)
        }

    };

    return (
        <div className="p-6">
            {!startupStatus ? (
                <div className="flex justify-center items-center h-[50vh]">
                    <div
                        className=" w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm"
                        role="alert"
                    >
                        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-7 w-7"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m0 3.75h.008M10.29 3.86l-7.05 12.22A2 2 0 004.97 19h14.06a2 2 0 001.73-2.92L13.71 3.86a2 2 0 00-3.42 0z"
                                />
                            </svg>
                        </div>

                        <h2 className="mb-2 text-xl font-bold text-gray-900">
                            No startup found
                        </h2>

                        <p className="text-sm leading-6 text-gray-500">
                            You need to create a <Link className="text-gray-900 underline font-bold" href={"/dashboard/founder/mystartup"}>Startup</Link> before posting opportunities.
                        </p>
                    </div>
                </div>
            ) : user?.plan === "free" && cnt >= 3 ? (
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 shadow-sm">
                    <div className="flex items-start gap-4">
                        <div className="h-11 w-11 shrink-0 rounded-lg bg-orange-100 flex items-center justify-center">
                            <Lock className="text-orange-600" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-base font-semibold text-orange-900">
                                Premium Required
                            </p>
                            <p className="text-sm text-orange-700 mt-1">
                                You have used all 3 opportunity slots. Upgrade to post unlimited
                                opportunities.
                            </p>
                            <Link href={'/pricing'}>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 rounded-lg bg-orange-600 text-white text-sm font-medium px-5 py-2.5 mt-4 hover:bg-orange-700 transition-colors shadow-sm cursor-pointer"
                                >
                                    <Zap size={15} />
                                    Upgrade — $14
                                </button>
                            </Link>

                        </div>
                    </div>
                </div>
            ) : (
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">

                        <h1 className="text-xl font-semibold text-gray-900">Add Opportunity</h1>
                        <p className={`${cnt >= 3 || user?.plan == "pro" && "hidden"} text-orange-600`}>Post a role for your startup. ({cnt}/3 free slots used)</p>
                        <p className="text-sm text-gray-500 mt-1">
                            Fill in the details below to post a new opportunity.
                        </p>
                    </div>

                    <Form
                        onSubmit={handleSubmit}
                        className="disabled rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5"
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
            )}

        </div>
    );
};

export default AddOpportunityPage;