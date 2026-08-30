import { Button, Input, Label, Pagination, SearchField } from "@heroui/react";
import {
  Briefcase,
  MapPin,
  Clock,
  CalendarDays,
  Tag,
  Search,
  Filter,
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



const WORK_TYPE_OPTIONS = ["Remote", "On-site", "Hybrid"];

const OpportunitiesPage = async ({ searchParams }) => {

  const searchQuery = await searchParams;
  const page = searchQuery.page || 1;  //string
  console.log(page)
  const limit = searchQuery.limit || 10;
  const searchText = searchQuery.search || "";

  // New: read selected filters from the URL (single value each)
  const selectedWorkType = searchQuery.workType || ""
  console.log(selectedWorkType)

  const res = await fetch(`${process.env.SERVER_URL}/opportunity?search=${searchText}&page=${page}&limit=${limit}&workType=${selectedWorkType}`);


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

      <div className="flex justify-between items-center">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-gray-900">Opportunities</h1>
          <p className="text-sm text-gray-500 mt-1">
            Browse open roles posted by startups.
          </p>
        </div>

        <div>
          <form action={'/opportunities'}>
            <Input name="search" placeholder="Search opportunities" />
            <Button type="submit">
              <Search /> search
            </Button>

          </form>
        </div>
      </div>

      {/* New: Filter section (Industry + Work Type as dropdowns) */}
      <form
        action="/opportunities"
        className="mb-6 flex flex-wrap items-end gap-4 rounded-xl border border-gray-200 bg-white p-4"
      >
        

        <div className="flex flex-col gap-1">
          <Label htmlFor="workType" className="text-xs font-medium text-gray-600">
            Work Type
          </Label>
          <select
            id="workType"
            name="workType"
            defaultValue={selectedWorkType}
            className="rounded-lg border border-gray-300 text-sm px-3 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="">All Work Types</option>
            {WORK_TYPE_OPTIONS.map((workType) => (
              <option key={workType} value={workType}>
                {workType}
              </option>
            ))}
          </select>
        </div>

        <input type="hidden" name="page" value="1" />

        <Button type="submit" className="flex items-center gap-2">
          <Filter size={14} />
          Filter
        </Button>
      </form>

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