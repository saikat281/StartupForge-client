"use client";

import { useState } from "react";
import { Users, Ban, CheckCircle2 } from "lucide-react";
import AdminManageUsersTableStatus from "@/lib/actions/AdminManageUsersTableStatus";

const ROLE_STYLES = {
    admin: "bg-purple-50 text-purple-700",
    founder: "bg-blue-50 text-blue-700",
    collaborator: "bg-green-50 text-green-700",
};

const RoleBadge = ({ role }) => {
    const normalized = (role || "").toLowerCase();
    const style = ROLE_STYLES[normalized] || "bg-gray-100 text-gray-600";
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${style}`}
        >
            {role || "Not specified"}
        </span>
    );
};

const StatusBadge = ({ status }) => {
    const isActive = (status || "").toLowerCase() === "active";
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium capitalize ${isActive ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                }`}
        >
            {isActive ? "Active" : "Deactive"}
        </span>
    );
};

const AdminManageUsersTable = ({ users }) => {
    const [data, setData] = useState(users || []);
    const [loadingId, setLoadingId] = useState(null);

    const handleToggleStatus = async (id, currentStatus) => {
        const isActive = (currentStatus || "").toLowerCase() === "active";
        const newStatus = isActive ? "deactive" : "active";

        setLoadingId(id);
        try {
            console.log(`Updating user ${id} status to:`, newStatus);
            await AdminManageUsersTableStatus(newStatus,id)
            // await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/${id}`, {
            //   method: "PATCH",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ status: newStatus }),
            // });
            setData((prev) =>
                prev.map((user) =>
                    user._id === id ? { ...user, status: newStatus } : user
                )
            );
        } finally {
            setLoadingId(null);
        }
    };

    if (!data || data.length === 0) {
        return (
            <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                <Users className="mx-auto text-gray-300" size={32} />
                <p className="text-sm text-gray-500 mt-3">No users found.</p>
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
                                Name
                            </th>
                            <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                                Email
                            </th>
                            <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                                Role
                            </th>
                            <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                                Plan
                            </th>
                            <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                                Status
                            </th>
                            <th className="text-right font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {data.map((user) => {
                            const isActive = (user.status || "").toLowerCase() === "active";
                            const isLoading = loadingId === user._id;

                            return (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            {user.image ? (
                                                <img
                                                    src={user.image}
                                                    alt={user.name}
                                                    className="h-9 w-9 rounded-full object-cover border border-gray-200 shrink-0"
                                                />
                                            ) : (
                                                <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 shrink-0">
                                                    <Users className="text-gray-400" size={16} />
                                                </div>
                                            )}
                                            <span className="font-medium text-gray-900 whitespace-nowrap">
                                                {user.name || "Unnamed"}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                                        {user.email || "Not available"}
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <RoleBadge role={user.role} />
                                    </td>
                                    <td className="px-5 py-3.5 text-gray-600 capitalize whitespace-nowrap">
                                        {user.plan || "Not specified"}
                                    </td>
                                    <td className="px-5 py-3.5 whitespace-nowrap">
                                        <StatusBadge status={user.status} />
                                    </td>
                                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            onClick={() => handleToggleStatus(user._id, user.status)}
                                            className={`inline-flex items-center gap-1.5 rounded-lg text-xs font-medium px-3 py-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${isActive
                                                    ? "bg-red-50 text-red-600 hover:bg-red-100"
                                                    : "bg-green-600 text-white hover:bg-green-700"
                                                }`}
                                        >
                                            {isActive ? (
                                                <>
                                                    <Ban size={13} />
                                                    Block
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 size={13} />
                                                    Unblock
                                                </>
                                            )}
                                        </button>
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

export default AdminManageUsersTable;