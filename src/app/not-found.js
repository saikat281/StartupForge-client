import Link from "next/link";
import { Compass, ArrowRight, Home } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="w-full max-w-md text-center">
        <div className="mx-auto h-16 w-16 rounded-xl bg-blue-50 flex items-center justify-center">
          <Compass className="text-blue-600" size={30} />
        </div>

        <p className="text-6xl font-semibold text-gray-900 mt-6">404</p>
        <h1 className="text-xl font-semibold text-gray-900 mt-2">
          Page not found
        </h1>
        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
          The page you are looking for does not exist or may have been moved.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg bg-gray-900 text-white text-sm font-medium px-5 py-2.5 hover:bg-gray-800 transition-colors w-full sm:w-auto justify-center"
          >
            <Home size={16} />
            Back to Home
          </Link>
          <Link
            href="/opportunities"
            className="flex items-center gap-2 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium px-5 py-2.5 hover:bg-gray-50 transition-colors w-full sm:w-auto justify-center"
          >
            Browse Opportunities
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;