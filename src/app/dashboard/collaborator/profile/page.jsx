import CollaboratorProfileForm from "@/Components/collaborator/CollaboratorProfileForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";


const CollaboratorProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  return <CollaboratorProfileForm user={user} />;
};

export default CollaboratorProfilePage;