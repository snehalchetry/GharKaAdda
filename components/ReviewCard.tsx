import { Review } from "@/types";
import { Star } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-semibold">{review.user.name}</h4>
          <p className="text-sm text-gray-500">{formatDate(review.createdAt)}</p>
        </div>
        <div className="flex items-center space-x-1">
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
  );
}

