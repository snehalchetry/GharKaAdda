"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, Eye, Star, CheckCircle, XCircle } from "lucide-react";
import { db } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";
import { User, Listing, Review } from "@/types";
import ListingCard from "@/components/ListingCard";

export default function StudentDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [savedListings, setSavedListings] = useState<Listing[]>([]);
  const [recentListings, setRecentListings] = useState<Listing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      router.push("/auth/login");
      return;
    }

    const currentUser = JSON.parse(userStr);
    if (currentUser.role !== "student") {
      router.push("/dashboard/owner");
      return;
    }

    setUser(currentUser);

    if (db.getAllListings().length === 0) {
      seedDatabase();
    }

    // Get saved listings (in a real app, this would be from a saved listings table)
    const allListings = db.getAllListings();
    setSavedListings(allListings.slice(0, 3));
    setRecentListings(allListings.slice(0, 3));

    // Get user's reviews
    const allReviews = db.getReviewsByListingId(""); // This would need proper implementation
    const userReviews = allReviews.filter((r) => r.userId === currentUser.id);
    setReviews(userReviews);
  }, [router]);

  if (!user) {
    return <div className="container mx-auto px-4 py-12 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        {/* Verification Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-2">Verification Status</h2>
              <p className="text-gray-600">
                {user.status === "verified" ? (
                  <span className="flex items-center text-green-600">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Your account is verified
                  </span>
                ) : user.status === "pending" ? (
                  <span className="flex items-center text-yellow-600">
                    <span className="mr-2">⏳</span>
                    Verification pending
                  </span>
                ) : (
                  <span className="flex items-center text-red-600">
                    <XCircle className="h-5 w-5 mr-2" />
                    Verification rejected
                  </span>
                )}
              </p>
            </div>
            {user.status !== "verified" && (
              <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90">
                Upload College ID
              </button>
            )}
          </div>
        </div>

        {/* Saved Listings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <Heart className="h-6 w-6 mr-2 text-red-500" />
              Saved Listings
            </h2>
            <Link href="/listings" className="text-primary hover:underline">
              View All →
            </Link>
          </div>
          {savedListings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">You haven't saved any listings yet.</p>
              <Link href="/listings" className="text-primary hover:underline mt-2 inline-block">
                Browse listings →
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        {/* Recently Viewed */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold flex items-center">
              <Eye className="h-6 w-6 mr-2 text-blue-500" />
              Recently Viewed
            </h2>
            <Link href="/listings" className="text-primary hover:underline">
              View All →
            </Link>
          </div>
          {recentListings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">No recently viewed listings.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>

        {/* My Reviews */}
        <div>
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            <Star className="h-6 w-6 mr-2 text-yellow-500" />
            My Reviews
          </h2>
          {reviews.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <p className="text-gray-500">You haven't written any reviews yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md divide-y">
              {reviews.map((review) => (
                <div key={review.id} className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Review for Listing</h3>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

