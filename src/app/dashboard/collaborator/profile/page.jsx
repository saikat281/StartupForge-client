import CollaboratorProfileForm from "@/Components/collaborator/CollaboratorProfileForm";
import { getTokenServer } from "@/lib/actions/getTokenServer";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";


const CollaboratorProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  // console.log(user)

  const token = await getTokenServer();

  const res = await fetch(`${process.env.SERVER_URL}/profile/${user?.id}`, {
    headers: {
      authorization: `Bearer ${token}`,

    }
  });
  const userProfile = await res.json();
  
  return <CollaboratorProfileForm user={userProfile} />;
};

export default CollaboratorProfilePage;