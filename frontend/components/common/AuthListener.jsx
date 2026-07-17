"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { isAuthenticated } from "../../utils/auth";

export default function AuthListener() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleStorage(e) {
      if (e.key === "logout") {
        router.push("/login");
      }
    }

    // Don't redirect away when on login or register pages
    const isAuthPage = pathname && (pathname.startsWith("/login") || pathname.startsWith("/register"));

    if (!isAuthPage && !isAuthenticated()) {
      router.push("/login");
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [pathname, router]);

  return null;
}
