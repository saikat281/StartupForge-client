import { Flame } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-14 w-14">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
          <div className="absolute inset-0 rounded-full border-4 border-blue-600 border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Flame size={18} className="text-blue-600" />
          </div>
        </div>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;