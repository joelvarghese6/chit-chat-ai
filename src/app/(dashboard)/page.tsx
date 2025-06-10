"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  const clickHandler = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in"); // redirect to login page
        },
      },
    });
  }

  return (
    <div className="h-screen">
      <Button onClick={clickHandler}>Sign out</Button>

    </div>
  );
}
