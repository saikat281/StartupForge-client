"use server"

import { getTokenServer } from "./getTokenServer";

const server_url = process.env.SERVER_URL;

export const StartupUpdate = async (data, id) => {
    const token = await getTokenServer();

    try {
        const res = await fetch(`${server_url}/mystartup/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,

            },
            body: JSON.stringify(data),
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

export default StartupUpdate;