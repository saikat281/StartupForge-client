"use server";

import { getTokenServer } from "./getTokenServer";



export const getMyStartups = async () => {
  const token = await getTokenServer();

  const res = await fetch(
    `${process.env.SERVER_URL}/mystartup`,
    {
      
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    const error = await res.text();
    console.error("Backend error:", error);
    throw new Error("Failed to fetch startups");
  }

  return await res.json();
};
