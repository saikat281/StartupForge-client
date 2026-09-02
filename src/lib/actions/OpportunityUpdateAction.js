"use server"

import { headers } from "next/headers";
import { auth } from "../auth";
import { getTokenServer } from "./getTokenServer";

const server_url = process.env.SERVER_URL;

export const OpportunityUpdateAction = async (data, id) => {

    const token = await getTokenServer();

    try {
        const res = await fetch(`${server_url}/opportunity/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${token}`,

            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            throw new Error(`API error: ${res.status}`);
        }
        const result = await res.json();
        return result;

    } catch (error) {
        console.error("Update opportunity error:", error);

        throw error;
    }
};

export default OpportunityUpdateAction;