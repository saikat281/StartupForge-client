import { Gear, TrashBin } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { Building2, Tag, TrendingUp } from "lucide-react";
import StartupUpdateModal from "./StartupUpdateModal";
import { StartupDelete } from "./StartupDelete";

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

const StartupCard = ({ data, UserId }) => {

  const startup = data?.find(startup => startup?.userId == UserId)
  
  return (
    <div>
      <div className="flex justify-between items-center rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
        <div>
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
                <span className="flex items-center gap-1 rounded-full  text-gray-600 text-xs font-medium px-2.5 py-1">
                  <StatusBadge status={startup.status} />
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
        <div className="flex  gap-3">
          {/* <Button isIconOnly aria-label="Delete" variant="danger">
            <TrashBin />
          </Button>

          <Button isIconOnly aria-label="Settings" variant="secondary">
            <Gear />
          </Button> */}
          <StartupUpdateModal startup={startup}></StartupUpdateModal>

          <StartupDelete startup={startup}></StartupDelete>
        </div>
      </div>

    </div>

  );
};

export default StartupCard;