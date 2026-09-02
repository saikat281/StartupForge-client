"use client";

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#2563eb", "#9333ea", "#ea580c"];

const OverviewPieChart = ({ totalUsers, totalStartups, totalOpportunities }) => {
  const data = [
    { name: "Total Users", value: totalUsers },
    { name: "Total Startups", value: totalStartups },
    { name: "Total Opportunities", value: totalOpportunities },
  ];

  const hasData = data.some((d) => d.value > 0);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <p className="text-base font-semibold text-gray-900 mb-1">
        Platform Distribution
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Breakdown of users, startups, and opportunities.
      </p>

      {hasData ? (
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid #e5e7eb",
                  fontSize: "13px",
                }}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                wrapperStyle={{ fontSize: "13px", color: "#4b5563" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-72 flex items-center justify-center text-sm text-gray-400">
          No data available yet.
        </div>
      )}
    </div>
  );
};

export default OverviewPieChart;