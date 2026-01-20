"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, Shield, MapPin, Star, MessageCircle, CheckCircle } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import ListingCard from "@/components/ListingCard";
import { db } from "@/lib/db";
import { seedDatabase } from "@/lib/seed";
import { Listing } from "@/types";

export default function Home() {
  const [featuredListings, setFeaturedListings] = useState<Listing[]>([]);

  useEffect(() => {
    // Seed database on first load
    if (db.getAllListings().length === 0) {
      seedDatabase();
    }
    const listings = db.getAllListings();
    setFeaturedListings(listings.slice(0, 6));
  }, []);

  const testimonials = [
    {
      name: "Amit Singh",
      role: "Student, DU",
      text: "Found my perfect PG in just 2 days! No brokers, direct contact with owner. Highly recommended!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Student, JNU",
      text: "The verification process is great. I felt safe knowing all listings are verified. Great platform!",
      rating: 5,
    },
    {
      name: "Rahul Kumar",
      role: "Student, IIT Delhi",
      text: "Saved so much time and money. The filters are amazing and I found exactly what I was looking for.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-secondary text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Student Stay
            </h1>
            <p className="text-xl mb-8 text-gray-200">
              Verified, Affordable, No Brokers
            </p>
            <SearchBar />
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link
                href="/listings"
                className="bg-accent text-secondary px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Find Room
              </Link>
              <Link
                href="/auth/signup?role=owner"
                className="bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                List Your PG
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Search & Filter</h3>
              <p className="text-gray-600">
                Use our advanced filters to find PGs that match your budget, location, and preferences.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-gray-600">
                All listings are verified for authenticity. No fake ads, no brokers.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Contact</h3>
              <p className="text-gray-600">
                Chat directly with PG owners. No middlemen, no hidden charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Featured Listings</h2>
            <Link
              href="/listings"
              className="text-primary hover:underline font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Students Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Stay?</h2>
          <p className="text-xl mb-8 text-gray-200">
            Join thousands of students who found their home away from home
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/listings"
              className="bg-accent text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
            >
              Browse Listings
            </Link>
            <Link
              href="/auth/signup?role=owner"
              className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              List Your PG
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
