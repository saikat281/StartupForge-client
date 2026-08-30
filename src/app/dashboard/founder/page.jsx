import { getTokenServer } from "@/lib/actions/getTokenServer";
import { BriefcaseBusiness, CircleCheckBig, UserRound } from "lucide-react";


const FounderOverviewPage = async () => {
  const token = await getTokenServer();


  const res1 = await fetch(`${process.env.SERVER_URL}/opportunity`);
  const oppdata = await res1.json();
  const opportunityData = oppdata.result;


  const res2 = await fetch(`${process.env.SERVER_URL}/application`, {
    headers: {
      authorization: `Bearer ${token}`,

    }
  });
  const applicationData = await res2.json();

  const acceptedData = applicationData?.filter(data => data?.status === "accepted")

  console.log(applicationData);

  const STATS = [
    {
      label: "Total Opportunities",
      value: opportunityData.length,
      icon: BriefcaseBusiness,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Applications",
      value: applicationData.length,
      icon: UserRound,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Accepted Members",
      value: acceptedData.length,
      icon: CircleCheckBig,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];


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