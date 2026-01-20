"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Star,
  Wifi,
  Car,
  Utensils,
  Snowflake,
  Phone,
  MessageCircle,
  Share2,
  Heart,
} from "lucide-react";
import MapView from "@/components/MapViewWrapper";
import ReviewCard from "@/components/ReviewCard";
import ReviewForm from "@/components/ReviewForm";
import { db } from "@/lib/db";
import { Listing, Review, User } from "@/types";
import { formatPrice, formatDate } from "@/lib/utils";

export default function ListingDetailsPage() {
  const params = useParams();
  const listingId = params.id as string;
  const [listing, setListing] = useState<Listing | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Get current user if logged in
    const userStr = localStorage.getItem("currentUser");
    if (userStr) {
      setCurrentUser(JSON.parse(userStr));
    }

    const foundListing = db.getListingById(listingId);
    if (foundListing) {
      setListing(foundListing);
      const listingReviews = db.getReviewsByListingId(listingId);
      setReviews(listingReviews);
      
      // Update views
      db.updateListing(listingId, { views: (foundListing.views || 0) + 1 });
    }
  }, [listingId]);

  const handleReviewSubmitted = () => {
    const listingReviews = db.getReviewsByListingId(listingId);
    setReviews(listingReviews);
  };

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-500">Listing not found.</p>
      </div>
    );
  }

  const images = typeof listing.images === "string"
    ? JSON.parse(listing.images)
    : listing.images;
  const amenities = typeof listing.amenities === "string"
    ? JSON.parse(listing.amenities)
    : listing.amenities;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="mb-8">
        <div className="relative h-96 w-full rounded-lg overflow-hidden mb-4">
          <Image
            src={images[currentImageIndex] || images[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"}
            alt={listing.title}
            fill
            className="object-cover"
          />
          {listing.verified && (
            <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
              Verified
            </div>
          )}
        </div>
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {images.map((img: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative h-20 rounded-lg overflow-hidden ${
                  currentImageIndex === index ? "ring-2 ring-primary" : ""
                }`}
              >
                <Image
                  src={img}
                  alt={`${listing.title} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{listing.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="h-5 w-5 mr-1" />
                <span>{listing.location}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 rounded-lg ${
                  isSaved ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                }`}
              >
                <Heart className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`} />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600">
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-3xl font-bold text-primary">
                {formatPrice(listing.rent)}
              </span>
              <span className="text-gray-600">/month</span>
              <p className="text-sm text-gray-500 mt-1">
                Security Deposit: {formatPrice(listing.deposit)}
              </p>
            </div>
            {averageRating > 0 && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 mb-1">
                  <Star className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                  <span className="text-2xl font-bold">{averageRating.toFixed(1)}</span>
                </div>
                <p className="text-sm text-gray-600">{reviews.length} reviews</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">{listing.description}</p>
          </div>

          {/* Amenities */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Amenities</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {listing.hasAC && (
                <div className="flex items-center space-x-2">
                  <Snowflake className="h-5 w-5 text-blue-600" />
                  <span>Air Conditioning</span>
                </div>
              )}
              {listing.mealsIncluded && (
                <div className="flex items-center space-x-2">
                  <Utensils className="h-5 w-5 text-green-600" />
                  <span>Meals Included</span>
                </div>
              )}
              {amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  {amenity === "WiFi" && <Wifi className="h-5 w-5 text-purple-600" />}
                  {amenity === "Parking" && <Car className="h-5 w-5 text-gray-600" />}
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Location</h2>
            <MapView
              latitude={listing.latitude}
              longitude={listing.longitude}
              title={listing.location}
              height="400px"
            />
          </div>

          {/* Virtual Tour */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Virtual Tour</h2>
            <div className="bg-gray-100 rounded-lg p-12 text-center">
              <p className="text-gray-600">
                Virtual tour video will be embedded here
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Contact owner to schedule a virtual tour
              </p>
            </div>
          </div>

          {/* Reviews */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Reviews ({reviews.length})
            </h2>
            {reviews.length === 0 ? (
              <p className="text-gray-500 mb-4">No reviews yet. Be the first to review!</p>
            ) : (
              <div className="space-y-4 mb-6">
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            )}
            {/* Review Form */}
            {currentUser && currentUser.role === "student" && currentUser.status === "verified" ? (
              <div className="mt-6">
                <ReviewForm
                  listingId={listingId}
                  userId={currentUser.id}
                  onReviewSubmitted={handleReviewSubmitted}
                />
              </div>
            ) : (
              <div className="mt-6">
                <p className="text-sm text-gray-500 mb-2">
                  Only verified students can post reviews.{" "}
                  {!currentUser && (
                    <a href="/auth/login" className="text-primary hover:underline">
                      Sign in
                    </a>
                  )}
                  {currentUser && currentUser.status !== "verified" && (
                    <span>Please verify your account to post reviews.</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Owner Details</h3>
              <p className="text-gray-700">{listing.owner.name}</p>
              <p className="text-sm text-gray-500">{listing.owner.phone}</p>
            </div>

            <div className="space-y-3">
              <Link
                href={`/chat/${listing.id}`}
                className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat with Owner</span>
              </Link>
              <a
                href={`tel:${listing.owner.phone}`}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Phone className="h-5 w-5" />
                <span>Call Owner</span>
              </a>
              <a
                href={`https://wa.me/${listing.owner.phone.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t">
              <div className="text-sm text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Rent:</span>
                  <span className="font-semibold">{formatPrice(listing.rent)}/month</span>
                </div>
                <div className="flex justify-between">
                  <span>Deposit:</span>
                  <span className="font-semibold">{formatPrice(listing.deposit)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gender:</span>
                  <span className="font-semibold capitalize">{listing.genderPreference}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

