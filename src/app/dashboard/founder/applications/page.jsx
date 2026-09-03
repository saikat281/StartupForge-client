import FounderApplicationsTable from "@/Components/founder/applications/FounderApplicationsTable";
import { getTokenServer } from "@/lib/actions/getTokenServer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";


const FounderApplicationsPage = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const token = await getTokenServer();

  const res = await fetch(`${process.env.SERVER_URL}/application`, {
    headers: {
      authorization: `Bearer ${token}`,

    }
  });
  const result = await res.json();
  const ApplicationData = result.filter(data=>data.oppUserId === user?.id)
  // console.log(ApplicationData);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Applications</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review applications submitted to your opportunities.
        </p>
      </div>

      <FounderApplicationsTable applications={ApplicationData} />
    </div>
  );
};

export default FounderApplicationsPage;