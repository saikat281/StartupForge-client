"use server"

const server_url = process.env.SERVER_URL;

export const OpportunityDeleteAction = async (userId) => {
    try {
        const res = await fetch(`${server_url}/opportunity/${userId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        const result = await res.json();
        return result;

    } catch (error) {
        console.error("Delete opportunity error:", error);

        throw error;
    }
};

export default OpportunityDeleteAction;