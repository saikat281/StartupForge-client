import { BriefcaseBusiness, CircleCheckBig, UserRound } from "lucide-react";
import React from "react";

const STATS = [
  {
    label: "Total Opportunities",
    value: 0,
    icon: BriefcaseBusiness,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    label: "Total Applications",
    value: 0,
    icon: UserRound,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
  },
  {
    label: "Accepted Members",
    value: 0,
    icon: CircleCheckBig,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
  },
];

const FounderOverviewPage = async() => {

  // const res = await fetch(`${process.env.SERVER_URL}/mystartup`);
  // const data = await res.json();
  // console.log(data.length);

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {STATS.map(({ label, value, icon: Icon, iconBg, iconColor }) => (
          <div
            key={label}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className={`h-12 w-12 shrink-0 rounded-lg flex items-center justify-center ${iconBg}`}>
              <Icon className={iconColor} size={22} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-gray-900">{value}</p>
              <p className="text-sm text-gray-500">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FounderOverviewPage;