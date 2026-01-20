"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/listings?location=${encodeURIComponent(location)}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
        <div className="flex-1 px-6 py-4">
          <input
            type="text"
            placeholder="Search by location, college, or area..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full outline-none text-gray-700 placeholder-gray-400"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-8 py-4 hover:bg-primary/90 transition-colors"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}

