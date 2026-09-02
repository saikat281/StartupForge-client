"use server";

import { getTokenServer } from "./getTokenServer";

export const GetUserDataAction = async () => {


    const token = await getTokenServer();
    const res = await fetch(`${process.env.SERVER_URL}/users`, {
        headers: {
            authorization: `Bearer ${token}`,

        }
    });

    if (!res.ok) {
        const error = await res.text();
        console.error("Backend error:", error);
        throw new Error("Failed to fetch Users");
    }

    return await res.json();
};
