import {
  Search,
  FileText,
  UserCog,
  ArrowRight,
} from "lucide-react";

const ACTIONS = [
  {
    label: "Browse Opportunities",
    description: "Explore open roles that match your skills and interests.",
    icon: Search,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    href: "/opportunities",
  },
  {
    label: "My Applications",
    description: "Track the status of opportunities you've applied to.",
    icon: FileText,
    iconBg: "bg-purple-50",
    iconColor: "text-purple-600",
    href: "/collaborator/applications",
  },
  {
    label: "Update Profile",
    description: "Keep your skills, bio, and details up to date.",
    icon: UserCog,
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    href: "/collaborator/profile",
  },
];

const CollaboratorOverviewPage = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Overview</h1>
        <p className="text-sm text-gray-500 mt-1">
          Welcome back! Here is what you can do.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ACTIONS.map(({ label, description, icon: Icon, iconBg, iconColor, href }) => (
          <a
            key={label}
            href={href}
            className="group flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className={`h-12 w-12 shrink-0 rounded-lg flex items-center justify-center ${iconBg}`}>
                <Icon className={iconColor} size={22} />
              </div>
              <ArrowRight
                size={18}
                className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all"
              />
            </div>
            <div>
              <p className="text-base font-semibold text-gray-900">{label}</p>
              <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CollaboratorOverviewPage;