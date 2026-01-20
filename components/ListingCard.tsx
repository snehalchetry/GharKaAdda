import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, Wifi, Car, Utensils, Snowflake } from "lucide-react";
import { Listing } from "@/types";
import { formatPrice } from "@/lib/utils";

interface ListingCardProps {
  listing: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const images = typeof listing.images === "string" 
    ? JSON.parse(listing.images) 
    : listing.images;
  const amenities = typeof listing.amenities === "string"
    ? JSON.parse(listing.amenities)
    : listing.amenities;

  const averageRating = listing.reviews && listing.reviews.length > 0
    ? listing.reviews.reduce((sum, r) => sum + r.rating, 0) / listing.reviews.length
    : 0;

  return (
    <Link href={`/listings/${listing.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={images[0] || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"}
            alt={listing.title}
            fill
            className="object-cover"
          />
          {listing.verified && (
            <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-semibold">
              Verified
            </div>
          )}
          {listing.boosted && (
            <div className="absolute top-2 left-2 bg-accent text-secondary px-2 py-1 rounded text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{listing.title}</h3>
          
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{listing.location}</span>
          </div>

          {listing.distanceFromCollege && (
            <div className="text-sm text-gray-500 mb-2">
              {listing.distanceFromCollege.toFixed(1)} km from college
            </div>
          )}

          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-2xl font-bold text-primary">{formatPrice(listing.rent)}</span>
              <span className="text-sm text-gray-500">/month</span>
            </div>
            {averageRating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            {listing.hasAC && (
              <span className="flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                <Snowflake className="h-3 w-3 mr-1" />
                AC
              </span>
            )}
            {listing.mealsIncluded && (
              <span className="flex items-center text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                <Utensils className="h-3 w-3 mr-1" />
                Meals
              </span>
            )}
            {amenities.includes("WiFi") && (
              <span className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                <Wifi className="h-3 w-3 mr-1" />
                WiFi
              </span>
            )}
            {amenities.includes("Parking") && (
              <span className="flex items-center text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                <Car className="h-3 w-3 mr-1" />
                Parking
              </span>
            )}
          </div>

          <div className="text-xs text-gray-500">
            {listing.views} views • {listing.reviews?.length || 0} reviews
          </div>
        </div>
      </div>
    </Link>
  );
}

