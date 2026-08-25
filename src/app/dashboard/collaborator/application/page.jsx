import { ClipboardList, ExternalLink } from "lucide-react";

const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    // handle "25/8/2026" style strings as well as ISO strings
    const parts = dateStr.split("/");
    let date;
    if (parts.length === 3) {
        const [day, month, year] = parts;
        date = new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
    } else {
        date = new Date(dateStr);
    }
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    });
};

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

const CollaboratorApplicationPage = async () => {
    const res = await fetch(`${process.env.SERVER_URL}/application`);
    const applications = await res.json();

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">My Applications</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Track the status of opportunities you have applied to.
                </p>
            </div>

            {(!applications || applications.length === 0) ? (
                <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                    <ClipboardList className="mx-auto text-gray-300" size={32} />
                    <p className="text-sm text-gray-500 mt-3">
                        You have not applied to any opportunities yet.
                    </p>
                </div>
            ) : (
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                                        Opportunity Name
                                    </th>
                                    <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                                        Startup Name
                                    </th>
                                    <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                                        Applied Date
                                    </th>
                                    <th className="text-left font-medium text-gray-500 px-5 py-3 whitespace-nowrap">
                                        Status
                                    </th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {applications.map((application) => (
                                    <tr
                                        key={application._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-5 py-3.5 font-medium text-gray-900 whitespace-nowrap">
                                            {application.opportunity_name || "Not available"}
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                                            {application.startup || "Not available"}
                                        </td>
                                        <td className="px-5 py-3.5 text-gray-600 whitespace-nowrap">
                                            {formatDate(application.date)}
                                        </td>
                                        <td className="px-5 py-3.5 whitespace-nowrap">
                                            <StatusBadge status={application.status} />
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CollaboratorApplicationPage;