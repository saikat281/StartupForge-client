import { Building2, Tag, TrendingUp } from "lucide-react";

const StartupCard = ({ data,UserId }) => {
    const startup = data?.find(startup=> startup?.userId == UserId)
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        {startup?.image ? (
          <img
            src={startup.image}
            alt={startup.name}
            className="h-14 w-14 rounded-lg object-cover border border-gray-200 shrink-0"
          />
        ) : (
          <div className="h-14 w-14 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <Building2 className="text-blue-600" size={24} />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-base font-semibold text-gray-900 truncate">
            {startup?.name || "Untitled Startup"}
          </p>
          <div className="flex flex-wrap gap-2 mt-1.5">
            <span className="flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1">
              <Tag size={11} />
              {startup?.industry || "Not specified"}
            </span>
            <span className="flex items-center gap-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1">
              <TrendingUp size={11} />
              {startup?.fundingStage || "Not specified"}
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4 border-t border-gray-100 pt-4">
        {startup?.description || "No description provided."}
      </p>

      {startup?.status === "pending" && (
        <div className="mt-4 rounded-lg bg-yellow-50 text-yellow-700 text-sm px-3 py-2.5">
          ⏳ Your startup is pending admin approval before it appears publicly.
        </div>
      )}
    </div>
  );
};

export default StartupCard;