"use server"

import { getTokenServer } from "./getTokenServer";
import OpportunityDeleteAction from "./OpportunityDeleteAction";



const server_url = process.env.SERVER_URL;

export const StartupDeleteAction = async (id, userId) => {
    try {
         const token = await getTokenServer();
        const res = await fetch(`${server_url}/mystartup/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,

            },
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        const result = await res.json();
        await OpportunityDeleteAction(userId);
        return result;

    } catch (error) {
        console.error("Delete startup error:", error);

        throw error;
    }
};

export default StartupDeleteAction;