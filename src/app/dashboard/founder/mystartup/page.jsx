"use client";

import { useState, useRef } from "react";
import { Rocket, Upload, X } from "lucide-react";

const INDUSTRIES = [
  "SaaS",
  "Fintech",
  "Healthtech",
  "E-commerce",
  "Edtech",
  "AI / ML",
  "Consumer",
  "Other",
];

const FUNDING_STAGES = [
  "Pre-Seed",
  "Seed",
  "Series A",
  "Series B",
  "Series C+",
  "Bootstrapped",
];

const CreateStartupPage = () => {
  const fileInputRef = useRef(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    industry: "",
    fundingStage: "",
    description: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoPreview(URL.createObjectURL(file));
  };

  const removeLogo = () => {
    setLogoPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Startup name is required";
    if (!form.industry) next.industry = "Industry is required";
    if (!form.fundingStage) next.fundingStage = "Funding stage is required";
    if (!form.description.trim()) next.description = "Description is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("Submitting startup:", form, fileInputRef.current?.files?.[0]);
  };

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Create Startup</h1>
          <p className="text-sm text-gray-500 mt-1">
            Fill in the details below to list a new startup.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-5"
        >
          {/* Startup Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Startup Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.name}
              onChange={handleChange("name")}
              placeholder="e.g. Acme Inc."
              className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${
                errors.name ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>

          {/* Logo Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Logo Image
            </label>
            {logoPreview ? (
              <div className="flex items-center gap-3">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-14 w-14 rounded-lg object-cover border border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeLogo}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500"
                >
                  <X size={14} />
                  Remove
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-2 w-full rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-3 text-sm text-gray-500 cursor-pointer hover:bg-gray-100 transition-colors">
                <Upload size={16} />
                <span>Click to upload logo</span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
              </label>
            )}
          </div>

          {/* Industry + Funding Stage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Industry <span className="text-red-500">*</span>
              </label>
              <select
                value={form.industry}
                onChange={handleChange("industry")}
                className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.industry ? "border-red-400" : "border-gray-200"
                }`}
              >
                <option value="">Select industry</option>
                {INDUSTRIES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p className="text-xs text-red-500 mt-1">{errors.industry}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Funding Stage <span className="text-red-500">*</span>
              </label>
              <select
                value={form.fundingStage}
                onChange={handleChange("fundingStage")}
                className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 ${
                  errors.fundingStage ? "border-red-400" : "border-gray-200"
                }`}
              >
                <option value="">Select stage</option>
                {FUNDING_STAGES.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              {errors.fundingStage && (
                <p className="text-xs text-red-500 mt-1">{errors.fundingStage}</p>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              value={form.description}
              onChange={handleChange("description")}
              rows={4}
              placeholder="What does your startup do?"
              className={`w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300 resize-none ${
                errors.description ? "border-red-400" : "border-gray-200"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-gray-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-gray-800 transition-colors"
            >
              <Rocket size={16} />
              Create Startup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateStartupPage;