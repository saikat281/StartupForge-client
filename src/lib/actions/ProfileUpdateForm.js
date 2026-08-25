"use server"

import { headers } from "next/headers";
import { auth } from "../auth";

const server_url = process.env.SERVER_URL;

export const ProfileUpdateForm = async (data) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    const user = session?.user;
    try {
        const res = await fetch(`${server_url}/profile/${user.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
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

export default ProfileUpdateForm;