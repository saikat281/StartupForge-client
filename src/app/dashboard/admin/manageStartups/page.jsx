import ManageStartupsTable from "@/Components/admin/ManageStartup";


const AdminManageStartupsPage = async () => {
  const res = await fetch(`${process.env.SERVER_URL}/mystartup`);
  const startupData = await res.json();

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900">Manage Startups</h1>
        <p className="text-sm text-gray-500 mt-1">
          Review and approve or reject submitted startups.
        </p>
      </div>

      <ManageStartupsTable startups={startupData} />
    </div>
  );
};

export default AdminManageStartupsPage;