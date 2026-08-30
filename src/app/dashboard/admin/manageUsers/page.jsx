import AdminManageUsersTable from "@/Components/admin/AdminManageUserTable";
import { getTokenServer } from "@/lib/actions/getTokenServer";


const AdminManageUsersPage = async () => {
    const token = await getTokenServer();
    
    const res = await fetch(`${process.env.SERVER_URL}/users`, {
        headers: {
            authorization: `Bearer ${token}`,

        }
    });
    const usersData = await res.json();
    const filterUserData = usersData?.filter(data => data?.role != "admin");
    // console.log(filterUserData);

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-xl font-semibold text-gray-900">Manage Users</h1>
                <p className="text-sm text-gray-500 mt-1">
                    View and manage all registered users.
                </p>
            </div>

            <AdminManageUsersTable users={filterUserData} />
        </div>
    );
};

export default AdminManageUsersPage;