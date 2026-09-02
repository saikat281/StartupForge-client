import OverviewPieChart from "@/Components/OverviewPieChart";
import { getTokenServer } from "@/lib/actions/getTokenServer";
import { Users, Building2, Briefcase, DollarSign } from "lucide-react";


const SERVER_URL = process.env.SERVER_URL;

const AdminOverviewPage = async () => {
  const token = await getTokenServer();

  const res1 = await fetch(`${SERVER_URL}/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const usersData = await res1.json();

  const res2 = await fetch(`${SERVER_URL}/mystartup`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const startupData = await res2.json();

  const res3 = await fetch(`${SERVER_URL}/opportunity`);
  const opportunitiesData = await res3.json();

  const res4 = await fetch(`${SERVER_URL}/payment`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const paymentData = await res4.json();

  let totalRevenue = 0;
  (paymentData || []).forEach((payment) => {
    totalRevenue += Number(payment.amount) || 0;
  });

  const totalUsers = usersData?.length ?? 0;
  const totalStartups = startupData?.length ?? 0;
  const totalOpportunities = opportunitiesData?.totalData ?? 0;

  const STATS = [
    {
      label: "Total Users",
      value: totalUsers,
      icon: Users,
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      label: "Total Startups",
      value: totalStartups,
      icon: Building2,
      iconBg: "bg-purple-50",
      iconColor: "text-purple-600",
    },
    {
      label: "Total Opportunities",
      value: totalOpportunities,
      icon: Briefcase,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-600",
    },
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          A snapshot of platform activity.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

      <OverviewPieChart
        totalUsers={totalUsers}
        totalStartups={totalStartups}
        totalOpportunities={totalOpportunities}
      />
    </div>
  );
};

export default AdminOverviewPage;