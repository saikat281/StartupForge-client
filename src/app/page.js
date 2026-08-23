"use client"
import { authClient } from "@/lib/auth-client";
import Image from "next/image";

export default function Home() {

  const { data: session } = authClient.useSession();
  const user = session?.user;
  console.log(user)
  return (
    <div>
      <h1>Hello world</h1>
      <h1>{user?.name}</h1>
    </div>
    
  );
}
