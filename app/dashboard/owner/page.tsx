"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Edit, Trash2, Eye, TrendingUp } from "lucide-react";
import { db } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";
import { Listing, User } from "@/types";
import { formatPrice } from "@/lib/utils";

export default function OwnerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);

  useEffect(() => {
    // Get current user from localStorage
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      router.push("/auth/login");
      return;
    }

    const currentUser = JSON.parse(userStr);
    if (currentUser.role !== "owner") {
      router.push("/dashboard/student");
      return;
    }

    setUser(currentUser);
    
    // Seed database if empty
    if (db.getAllListings().length === 0) {
      seedDatabase();
    }

    // Get owner's listings
    const allListings = db.getAllListings();
    const ownerListings = allListings.filter((l) => l.ownerId === currentUser.id);
    setListings(ownerListings);
  }, [router]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this listing?")) {
      db.deleteListing(id);
      setListings(listings.filter((l) => l.id !== id));
    }
  };

  if (!user) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  const totalViews = listings.reduce((sum, l) => sum + (l.views || 0), 0);
  const totalListings = listings.length;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Owner Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Listings</p>
                <p className="text-3xl font-bold">{totalListings}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Views</p>
                <p className="text-3xl font-bold">{totalViews}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Status</p>
                <p className="text-3xl font-bold capitalize">{user.status}</p>
              </div>
              <div className="bg-accent/20 p-3 rounded-lg">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-8">
          <Link
            href="/dashboard/owner/add"
            className="inline-flex items-center space-x-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Listing</span>
          </Link>
        </div>

        {/* Listings */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">My Listings</h2>
          </div>
          {listings.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500 mb-4">You haven't created any listings yet.</p>
              <Link
                href="/dashboard/owner/add"
                className="text-primary hover:underline font-medium"
              >
                Create your first listing →
              </Link>
            </div>
          ) : (
            <div className="divide-y">
              {listings.map((listing) => (
                <div key={listing.id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold">{listing.title}</h3>
                        {listing.verified && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            Verified
                          </span>
                        )}
                        {listing.boosted && (
                          <span className="bg-accent text-secondary text-xs px-2 py-1 rounded">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{listing.location}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{formatPrice(listing.rent)}/month</span>
                        <span>•</span>
                        <span>{listing.views || 0} views</span>
                        <span>•</span>
                        <span>{listing.reviews?.length || 0} reviews</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/listings/${listing.id}`}
                        className="p-2 text-gray-600 hover:text-primary transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      <Link
                        href={`/dashboard/owner/edit/${listing.id}`}
                        className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-5 w-5" />
                      </Link>
                      <button
                        onClick={() => handleDelete(listing.id)}
                        className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

