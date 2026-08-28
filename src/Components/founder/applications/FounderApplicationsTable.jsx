"use client";

import { useState } from "react";
import { ClipboardList, Check, X, ExternalLink } from "lucide-react";
import FounderApplicationStatusAction from "@/lib/actions/FounderApplicationStatusAction";
import toast from "react-hot-toast";

const STATUS_STYLES = {
  pending: "bg-yellow-50 text-yellow-700",
  accepted: "bg-green-50 text-green-700",
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

const FounderApplicationsTable = ({ applications }) => {
  const [data, setData] = useState(applications || []);
  const [loadingId, setLoadingId] = useState(null);

  const handleAction = async (id, action) => {
    const newStatus = action === "accept" ? "accepted" : "rejected";
    setLoadingId(id);
    try {
      console.log(`${action} application:`, id);

      await FounderApplicationStatusAction(newStatus,id)
      // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/application/${id}`, {
      //   method: "PATCH",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ status: newStatus }),
      // });
      setData((prev) =>
        prev.map((application) =>
          application._id === id
            ? { ...application, status: newStatus }
            : application
        )
      );
    } finally {
      setLoadingId(null);
      toast.success("Application Status Updated")
      location.reload();
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <ClipboardList className="mx-auto text-gray-300" size={32} />
        <p className="text-sm text-gray-500 mt-3">
          No applications have been received yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                Opportunity
              </th>
              <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                Email
              </th>
              <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                Portfolio
              </th>
              <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                Status
              </th>
              <th className="text-right font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((application) => {
              const isPending =
                (application.status || "pending").toLowerCase() === "pending";
              const isLoading = loadingId === application._id;

              return (
                <tr
                  key={application._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 py-3.5 font-medium text-gray-900 whitespace-nowrap">
                    {application.opportunity_name || "Not available"}
                  </td>
                  <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                    {application.email || "Not available"}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    {application.portfolioLink ? (
                      <a
                        href={application.portfolioLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
                      >
                        View
                        <ExternalLink size={13} />
                      </a>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3.5 whitespace-nowrap">
                    <StatusBadge status={application.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        disabled={!isPending || isLoading}
                        onClick={() => handleAction(application._id, "accept")}
                        className="flex items-center gap-1.5 rounded-lg bg-green-600 text-white text-xs font-medium px-3 py-1.5 hover:bg-green-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <Check size={13} />
                        Accept
                      </button>
                      <button
                        type="button"
                        disabled={!isPending || isLoading}
                        onClick={() => handleAction(application._id, "reject")}
                        className="flex items-center gap-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-medium px-3 py-1.5 hover:bg-red-100 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <X size={13} />
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FounderApplicationsTable;