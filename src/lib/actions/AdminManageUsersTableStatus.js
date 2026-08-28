"use server"

const server_url = process.env.SERVER_URL;

export const AdminManageUsersTableStatus = async (newStatus, id) => {
    try {
        const res = await fetch(`${server_url}/users/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        const result = await res.json();
        return result;

    } catch (error) {
        console.error("Update status error:", error);

        throw error;
    }
};

export default AdminManageUsersTableStatus;