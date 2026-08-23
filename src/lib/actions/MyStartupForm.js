"use server";

const server_url = process.env.SERVER_URL;

export const addStartup = async (data) => {
  try {
    const res = await fetch(`${server_url}/mystartup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.status}`);
    }

    const result = await res.json();
    return result;
  } catch (error) {
    console.error("addStartup error:", error);

    throw error;
  }
};
