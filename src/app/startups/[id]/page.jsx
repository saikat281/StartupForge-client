import Link from "next/link";
import { Briefcase, Tag, MapPin, ArrowRight } from "lucide-react";
import ApplyOpportunityModal from "@/Components/collaborator/ApplyOpportunityModal";

const page = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`${process.env.SERVER_URL}/startups/${id}`);
    const StartUpOpportunitiesData = await res.json();

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Opportunities</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Open roles posted by {StartUpOpportunitiesData?.[0]?.startup || "this startup"}.
                </p>
            </div>

            {(!StartUpOpportunitiesData || StartUpOpportunitiesData.length === 0) ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <Briefcase className="mx-auto text-gray-300" size={32} />
                    <p className="text-sm text-gray-500 mt-3">
                        This startup has not posted any opportunities yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {StartUpOpportunitiesData.map((opportunity) => {
                        const skillTags = (opportunity.skills || "")
                            .split(",")
                            .map((s) => s.trim())
                            .filter(Boolean);

                        return (
                            <div
                                key={opportunity._id}
                                className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="h-11 w-11 shrink-0 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <Briefcase className="text-blue-600" size={20} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-base font-semibold text-gray-900 truncate">
                                            {opportunity.roleTitle || "Untitled Role"}
                                        </p>
                                        <p className="text-xs text-gray-500 truncate">
                                            {opportunity.startup || "Not specified"}
                                        </p>
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
                                    <span>{opportunity.workType || "Not specified"}</span>
                                </div>

                                <div>
                                    <ApplyOpportunityModal opportunity={opportunity}></ApplyOpportunityModal>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default page;