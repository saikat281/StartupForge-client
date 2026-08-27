"use client";

import { useState } from "react";
import { Building2, Check, X, ClipboardList } from "lucide-react";
import StartupStatusUpdate from "@/lib/actions/StartupStatusUpdate";
import toast from "react-hot-toast";

const STATUS_STYLES = {
  pending: "bg-yellow-50 text-yellow-700",
  approved: "bg-green-50 text-green-700",
  rejected: "bg-red-50 text-red-700",
};

const StatusBadge = ({ status }) => {
  const normalized = (status || "pending").toLowerCase();
  const style = STATUS_STYLES[normalized] || "bg-gray-100 text-gray-600";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${style}`}
    >
      {normalized}
    </span>
  );
};

const FILTERS = [
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
];

const ManageStartupsTable = ({ startups }) => {
  const [data, setData] = useState(startups || []);
  const [loadingId, setLoadingId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("pending");

  const filteredData = data.filter(
    (startup) => (startup.status || "pending").toLowerCase() === activeFilter
  );
//   to show action button
  const showActions = activeFilter === "pending";

  const handleAction = async (id, action) => {
    const newStatus = action === "approve" ? "approved" : "rejected";
    setLoadingId(id);
    try {
      console.log(`${action} startup:`, id);
      // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/mystartup/${id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status: newStatus }),
      // });
        await StartupStatusUpdate(newStatus,id);


      setData((prev) =>
        prev.map((startup) =>
          startup._id === id ? { ...startup, status: newStatus } : startup
        )
      );
    } finally {
      setLoadingId(null);
      toast.success(`Startup ${newStatus}`);
    }
  };

  return (
    <div>
      {/* Filter buttons */}
      <div className="flex items-center gap-2 mb-4">
        {FILTERS.map(({ key, label }) => {
          const isActive = activeFilter === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveFilter(key)} //main part
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {filteredData.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
          <ClipboardList className="mx-auto text-gray-300" size={32} />
          <p className="text-sm text-gray-500 mt-3">
            No {activeFilter} startups found.
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                    Startup
                  </th>
                  <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                    Industry
                  </th>
                  <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                    Funding Stage
                  </th>
                  <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                    Status
                  </th>
                  {showActions && (
                    <th className="text-right font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((startup) => {
                  const isLoading = loadingId === startup._id;

                  return (
                    <tr key={startup._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          {startup.image ? (
                            <img
                              src={startup.image}
                              alt={startup.name}
                              className="h-9 w-9 rounded-lg object-cover border border-gray-200 shrink-0"
                            />
                          ) : (
                            <div className="h-9 w-9 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                              <Building2 className="text-blue-600" size={16} />
                            </div>
                          )}
                          <span className="font-medium text-gray-900 whitespace-nowrap">
                            {startup.name || "Untitled Startup"}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                        {startup.industry || "Not specified"}
                      </td>
                      <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                        {startup.fundingStage || "Not specified"}
                      </td>
                      <td className="px-5 py-3.5 whitespace-nowrap">
                        <StatusBadge status={startup.status} />
                      </td>
                      {showActions && (
                        <td className="px-5 py-3.5">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              disabled={isLoading}
                              onClick={() => handleAction(startup._id, "approve")}
                              className="flex items-center gap-1.5 rounded-lg bg-green-600 text-white text-xs font-medium px-3 py-1.5 hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <Check size={13} />
                              Approve
                            </button>
                            <button
                              type="button"
                              disabled={isLoading}
                              onClick={() => handleAction(startup._id, "reject")}
                              className="flex items-center gap-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium px-3 py-1.5 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <X size={13} />
                              Reject
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStartupsTable;