"use server"

const server_url = process.env.SERVER_URL;

export const addOpportunity = async (data) => {
    try {
        const res = await fetch(`${server_url}/opportunity`, {
            method: "POSt",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json();
        return result;


    } catch (error) {

        console.error("addStartup error:", error);
        throw error;
    }
}