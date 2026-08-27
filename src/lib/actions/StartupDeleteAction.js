"use server"

const server_url = process.env.SERVER_URL;

export const StartupDeleteAction = async (id) => {
    try {
        const res = await fetch(`${server_url}/mystartup/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        const result = await res.json();
        return result;

    } catch (error) {
        console.error("Update Form error:", error);

        throw error;
    }
};

export default StartupDeleteAction;