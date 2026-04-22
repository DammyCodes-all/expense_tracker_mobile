import React, { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Redirect straight to the overview tab
    router.replace("/overview");
  }, [router]);

  return null;
}
