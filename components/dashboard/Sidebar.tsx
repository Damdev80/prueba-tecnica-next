"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LogoutButton } from "@/components/layout/LogoutButton";
import {
  LayoutDashboard,
  Package,
  Plus,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  user: {
    name: string;
    email: string;
    initials: string;
  };
}

const navLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    exact: true,
  },
  {
    href: "/dashboard/products",
    label: "Productos",
    icon: Package,
  },
  {
    href: "/dashboard/products/new",
    label: "Nuevo producto",
    icon: Plus,
  },
];

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Brand */}
      <div className="px-6 py-5">
        <Link href="/dashboard" className="text-lg font-bold tracking-tight text-foreground">
          product<span className="text-accent">app</span>
        </Link>
      </div>

      <Separator />

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map((link) => {
          const active = isActive(link.href, link.exact);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <link.icon className="size-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <Separator />

      {/* User section */}
      <div className="px-3 py-4 space-y-3">
        <div className="flex items-center gap-3 px-3">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs bg-accent text-accent-foreground font-semibold">
              {user.initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-between px-3">
          <ThemeToggle />
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
