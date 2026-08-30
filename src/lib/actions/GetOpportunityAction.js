"use server";





export const getOpportunityAction = async () => {
   
    const res = await fetch(
        `${process.env.SERVER_URL}/opportunity`
        
    );

    if (!res.ok) {
        const error = await res.text();
        console.error("Backend error:", error);
        throw new Error("Failed to fetch opportunity");
    }

    return await res.json();
};
