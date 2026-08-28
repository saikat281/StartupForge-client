import FounderApplicationsTable from "@/Components/founder/applications/FounderApplicationsTable";


const FounderApplicationsPage = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/application`);
  const ApplicationData = await res.json();

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