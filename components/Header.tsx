"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Search, User, LogIn, LogOut } from "lucide-react";
import { User as UserType } from "@/types";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold text-primary">GharKaAdda</div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/" ? "text-primary" : "text-secondary"
            }`}
          >
            Home
          </Link>
          <Link
            href="/listings"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/listings" ? "text-primary" : "text-secondary"
            }`}
          >
            Browse Listings
          </Link>
          <Link
            href="/pricing"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/pricing" ? "text-primary" : "text-secondary"
            }`}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/about" ? "text-primary" : "text-secondary"
            }`}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <Link
                href={currentUser.role === "owner" ? "/dashboard/owner" : "/dashboard/student"}
                className="hidden md:flex items-center space-x-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="hidden md:flex items-center space-x-2 rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-white"
              >
                <LogIn className="h-4 w-4" />
                <span>Login</span>
              </Link>
              <Link
                href="/listings"
                className="flex items-center space-x-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
              >
                <Search className="h-4 w-4" />
                <span className="hidden md:inline">Find Room</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

