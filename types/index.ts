export type UserRole = "student" | "owner";

export type UserStatus = "pending" | "verified" | "rejected";

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  status: UserStatus;
  collegeId?: string;
  collegeIdImage?: string;
  password?: string; // For authentication
  createdAt: Date;
  updatedAt: Date;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  images: string[];
  rent: number;
  deposit: number;
  location: string;
  latitude: number;
  longitude: number;
  amenities: string[];
  hasAC: boolean;
  mealsIncluded: boolean;
  genderPreference: "male" | "female" | "any";
  ownerId: string;
  owner: User;
  verified: boolean;
  boosted: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  reviews?: Review[];
  averageRating?: number;
  distanceFromCollege?: number;
}

export interface Review {
  id: string;
  listingId: string;
  userId: string;
  user: User;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

export interface Chat {
  id: string;
  studentId: string;
  ownerId: string;
  listingId: string;
  student: User;
  owner: User;
  listing: Listing;
  lastMessage?: ChatMessage;
  unreadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface FilterOptions {
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  hasAC?: boolean;
  mealsIncluded?: boolean;
  genderPreference?: "male" | "female" | "any";
  maxDistance?: number;
  sortBy?: "price" | "distance" | "rating" | "newest";
}

