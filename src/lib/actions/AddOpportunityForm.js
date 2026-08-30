"use server"

import { getTokenServer } from "./getTokenServer";

const server_url = process.env.SERVER_URL;

export const addOpportunity = async (data) => {

    const token = await getTokenServer();

    try {
        const res = await fetch(`${server_url}/opportunity`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                 authorization : `Bearer ${token}`
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