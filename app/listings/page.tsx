"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ListingCard from "@/components/ListingCard";
import FilterSidebar from "@/components/FilterSidebar";
import { db } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";
import { Listing, FilterOptions } from "@/types";
import { calculateDistance } from "@/lib/utils";
import { SlidersHorizontal } from "lucide-react";

function ListingsContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState<Listing[]>([]);
  const [filteredListings, setFilteredListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<"price" | "distance" | "rating" | "newest">("newest");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (db.getAllListings().length === 0) {
      seedDatabase();
    }
    const allListings = db.getAllListings();
    setListings(allListings);
    setFilteredListings(allListings);
  }, []);

  useEffect(() => {
    let filtered = [...listings];

    // Location filter
    const locationQuery = searchParams.get("location");
    if (locationQuery) {
      filtered = filtered.filter((listing) =>
        listing.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    // Price filter
    if (filters.minPrice !== undefined) {
      filtered = filtered.filter((listing) => listing.rent >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      filtered = filtered.filter((listing) => listing.rent <= filters.maxPrice!);
    }

    // AC filter
    if (filters.hasAC !== undefined) {
      filtered = filtered.filter((listing) => listing.hasAC === filters.hasAC);
    }

    // Meals filter
    if (filters.mealsIncluded !== undefined) {
      filtered = filtered.filter(
        (listing) => listing.mealsIncluded === filters.mealsIncluded
      );
    }

    // Gender preference filter
    if (filters.genderPreference) {
      filtered = filtered.filter(
        (listing) =>
          listing.genderPreference === filters.genderPreference ||
          listing.genderPreference === "any"
      );
    }

    // Distance filter (assuming college at DU North Campus)
    const collegeLat = 28.7041;
    const collegeLon = 77.2090;
    filtered = filtered.map((listing) => ({
      ...listing,
      distanceFromCollege: calculateDistance(
        collegeLat,
        collegeLon,
        listing.latitude,
        listing.longitude
      ),
    }));

    if (filters.maxDistance !== undefined) {
      filtered = filtered.filter(
        (listing) =>
          listing.distanceFromCollege! <= filters.maxDistance!
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price":
          return a.rent - b.rent;
        case "distance":
          return (a.distanceFromCollege || 0) - (b.distanceFromCollege || 0);
        case "rating":
          const ratingA = a.reviews && a.reviews.length > 0
            ? a.reviews.reduce((sum, r) => sum + r.rating, 0) / a.reviews.length
            : 0;
          const ratingB = b.reviews && b.reviews.length > 0
            ? b.reviews.reduce((sum, r) => sum + r.rating, 0) / b.reviews.length
            : 0;
          return ratingB - ratingA;
        case "newest":
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    setFilteredListings(filtered);
  }, [listings, filters, sortBy, searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Browse Listings</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg"
        >
          <SlidersHorizontal className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters Sidebar */}
        <div
          className={`${
            showFilters ? "block" : "hidden"
          } md:block md:w-1/4`}
        >
          <FilterSidebar filters={filters} onFilterChange={setFilters} />
        </div>

        {/* Listings Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-600">
              {filteredListings.length} listing{filteredListings.length !== 1 ? "s" : ""} found
            </p>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "price" | "distance" | "rating" | "newest")
              }
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="newest">Newest First</option>
              <option value="price">Price: Low to High</option>
              <option value="distance">Distance: Nearest First</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {filteredListings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No listings found matching your criteria.</p>
              <p className="text-gray-400 mt-2">Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading listings...</div>
      </div>
    }>
      <ListingsContent />
    </Suspense>
  );
}

