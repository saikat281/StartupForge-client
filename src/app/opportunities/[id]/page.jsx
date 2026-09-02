import ApplyOpportunityModal from "@/Components/collaborator/ApplyOpportunityModal";
import { getTokenServer } from "@/lib/actions/getTokenServer";
import {
  Briefcase,
  MapPin,
  Clock,
  CalendarDays,
  Tag,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const formatDeadline = (deadline) => {
  if (!deadline) return "No deadline set";
  const date = new Date(deadline);
  if (isNaN(date.getTime())) return "No deadline set";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const OpportunityDetailsPage = async ({ params }) => {
  const token = await getTokenServer();

  const { id } = await params;
  const res = await fetch(`${process.env.SERVER_URL}/opportunity/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,

    }
  });
  const opportunity = await res.json();
  // console.log(opportunity)

  const skillTags = (opportunity?.skills || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 mb-4 transition-colors"
        >
          <ArrowLeft size={15} />
          Back to Opportunities
        </Link>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="h-14 w-14 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
              <Briefcase className="text-blue-600" size={26} />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl font-semibold text-gray-900">
                {opportunity?.roleTitle || "Untitled Role"}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Posted by <span className="font-bold">{opportunity?.startup || "Untitled startup"}</span> 
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Posted opportunity details
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <p className="text-sm font-medium text-gray-700 mb-2">Required Skills</p>
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
          </div>

          {/* Details grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-gray-100 pt-5">
            <div className="flex items-start gap-2.5">
              <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Work Type</p>
                <p className="text-sm font-medium text-gray-900">
                  {opportunity?.workType || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock size={16} className="text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Commitment</p>
                <p className="text-sm font-medium text-gray-900">
                  {opportunity?.commitmentLevel || "Not specified"}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <CalendarDays size={16} className="text-gray-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs text-gray-400">Deadline</p>
                <p className="text-sm font-medium text-gray-900">
                  {formatDeadline(opportunity?.deadline)}
                </p>
              </div>
            </div>
          </div>

          {/* Apply */}
          <div className="mt-6 border-t border-gray-100 pt-5">
            {/* <button className="w-full sm:w-auto rounded-lg bg-gray-900 text-white text-sm font-medium px-6 py-2.5 hover:bg-gray-800 transition-colors">
              Apply Now
            </button> */}
            <ApplyOpportunityModal opportunity={opportunity}></ApplyOpportunityModal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailsPage;