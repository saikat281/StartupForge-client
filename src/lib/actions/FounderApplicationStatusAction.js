"use server"

const server_url = process.env.SERVER_URL;

export const FounderApplicationStatusAction = async (newStatus, id) => {
    try {
        const res = await fetch(`${server_url}/application/${id}`, {
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

export default FounderApplicationStatusAction;