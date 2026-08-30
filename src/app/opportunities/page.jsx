
import { Pagination } from "@heroui/react";
import {
  Briefcase,
  MapPin,
  Clock,
  CalendarDays,
  Tag,
} from "lucide-react";
import Link from "next/link";

const formatDeadline = (deadline) => {
  if (!deadline) return "No deadline set";
  const date = new Date(deadline);
  if (isNaN(date.getTime())) return "No deadline set";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const OpportunitiesPage = async ({ searchParams }) => {

  const searchQuery = await searchParams;
  const page = searchQuery.page || 1;
  console.log(page)
  const limit = searchQuery.limit || 10;


  const res = await fetch(`${process.env.SERVER_URL}/opportunity?page=${page}&limit=${limit}`);
  const opportunitiesObject = await res.json();
  const opportunities = opportunitiesObject.result

  const totalOpportunity = opportunitiesObject.total_page;
  // console.log(totalOpportunity);

  const pages = [];

  for (let i = 1; i <= totalOpportunity; i++) {
    pages.push(i);
  }
  // console.log(pages);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Opportunities</h1>
        <p className="text-sm text-gray-500 mt-1">
          Browse open roles posted by startups.
        </p>
      </div>

      {(!opportunities || opportunities.length === 0) ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <Briefcase className="mx-auto text-gray-300" size={32} />
          <p className="text-sm text-gray-500 mt-3">
            No opportunities have been posted yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {opportunities.map((opportunity) => {
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

                <div className="space-y-2 text-sm text-gray-500 border-t border-gray-100 pt-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400 shrink-0" />
                    <span>{opportunity.workType || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-400 shrink-0" />
                    <span>{opportunity.commitmentLevel || "Not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarDays size={14} className="text-gray-400 shrink-0" />
                    <span>{formatDeadline(opportunity.deadline)}</span>
                  </div>
                </div>

                <Link
                  href={`/opportunities/${opportunity._id}`}
                  className="mt-1 w-full rounded-lg bg-gray-900 text-white text-sm font-medium py-2 text-center hover:bg-gray-800 transition-colors"
                >
                  View Details
                </Link>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="w-full flex justify-center  mt-[60px]  mb-[60px] ">
        <div >
          <Pagination size="md">
            <Pagination.Summary>

            </Pagination.Summary>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page == 1}
                >
                  <Link className="flex items-center" href={`/opportunities?page=${page - 1}`}>
                    <Pagination.PreviousIcon />
                    Prev
                  </Link>
                </Pagination.Previous>
              </Pagination.Item>
              {pages.map((p) => (
                <Link key={p} href={`/opportunities?page=${p}`}>
                  <Pagination.Item >
                    <Pagination.Link isActive={p == page} className={`${p == page && "bg-black text-white"}`} >
                      {p}
                    </Pagination.Link>
                  </Pagination.Item>
                </Link>
              ))}
              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page == totalOpportunity}
                >
                  <Link className="flex items-center" href={`/opportunities?page=${page + 1}`} >
                    Next
                    <Pagination.NextIcon />
                  </Link>
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>

      </div>
    </div>
  );
};

export default OpportunitiesPage;