"use client";

import { logout } from "@/services/auth.service";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await logout();
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleLogout}
      disabled={loading}
    >
      <LogOut className="size-4" />
      <span className="hidden sm:inline">{loading ? "Saliendo..." : "Salir"}</span>
    </Button>
  );
}
