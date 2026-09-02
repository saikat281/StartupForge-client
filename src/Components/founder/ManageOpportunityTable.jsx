"use client";

import { Briefcase, Tag, MapPin, Pencil, Trash2 } from "lucide-react";
import UpdateOppModal from "./UpdateOppModal";

export function ManageOpportunityTable({ user }) {
    
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {user?.map((data) => {
        const skillTags = (data?.skills || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

        return (
          <div
            key={data?._id}
            className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="h-11 w-11 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Briefcase className="text-blue-600" size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-semibold text-gray-900 truncate">
                    {data?.roleTitle || "Untitled Role"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <UpdateOppModal userData={data} ></UpdateOppModal>
                <button
                  type="button"
                  aria-label="Delete"
                  className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {skillTags.length > 0 ? (
                skillTags.map((skill) => (
                  <span
                    key={skill}
                    className="flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1"
                  >
                    <Tag size={11} />
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-xs text-gray-400">No skills listed</span>
              )}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 border-t border-gray-100 pt-3">
              <MapPin size={14} className="text-gray-400 shrink-0" />
              <span>{data?.workType || "Not specified"}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}