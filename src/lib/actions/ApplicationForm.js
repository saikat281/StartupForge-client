"use server";

import { getTokenServer } from "./getTokenServer";

const server_url = process.env.SERVER_URL;

export const ApplicationForm = async (data) => {
  try {
    const token = await getTokenServer();

    const res = await fetch(`${server_url}/application`, {
      method: "POST",
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
    console.error("addApplication error:", error);

    throw error;
  }
};
