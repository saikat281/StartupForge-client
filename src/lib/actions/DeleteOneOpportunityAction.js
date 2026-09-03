"use server"

import { getTokenServer } from "./getTokenServer";

const server_url = process.env.SERVER_URL;

export const DeleteOneOpportunityAction = async (id) => {
    try {
        const token = await getTokenServer();
        const res = await fetch(`${server_url}/opportunities/opportunity/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            authorization: `Bearer ${token}`,
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

export default DeleteOneOpportunityAction;