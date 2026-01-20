// Simple in-memory database for MVP
// In production, replace with Prisma + PostgreSQL

import { Listing, User, Review, Chat, ChatMessage } from "@/types";

let users: User[] = [];
let listings: Listing[] = [];
let reviews: Review[] = [];
let chats: Chat[] = [];
let messages: ChatMessage[] = [];

// User operations
export const db = {
  // Users
  createUser: (user: Omit<User, "id" | "createdAt" | "updatedAt"> & { password?: string }): User => {
    const newUser: User = {
      ...user,
      id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  },

  getUserByEmail: (email: string): (User & { password?: string }) | undefined => {
    return users.find((u) => u.email === email) as (User & { password?: string }) | undefined;
  },

  getUserById: (id: string): User | undefined => {
    return users.find((u) => u.id === id);
  },

  updateUser: (id: string, updates: Partial<User>): User | null => {
    const index = users.findIndex((u) => u.id === id);
    if (index === -1) return null;
    users[index] = { ...users[index], ...updates, updatedAt: new Date() };
    return users[index];
  },

  // Listings
  createListing: (
    listing: Omit<Listing, "id" | "createdAt" | "updatedAt" | "owner" | "reviews"> & { images: string | string[]; amenities: string | string[] }
  ): Listing => {
    const owner = users.find((u) => u.id === listing.ownerId);
    if (!owner) throw new Error("Owner not found");

    const imagesArray = typeof listing.images === "string" ? JSON.parse(listing.images) : listing.images;
    const amenitiesArray = typeof listing.amenities === "string" ? JSON.parse(listing.amenities) : listing.amenities;
    
    const newListing: Listing = {
      ...listing,
      images: imagesArray,
      amenities: amenitiesArray,
      id: `listing_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      owner,
      reviews: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    listings.push(newListing);
    return newListing;
  },

  getListingById: (id: string): Listing | undefined => {
    return listings.find((l) => l.id === id);
  },

  getAllListings: (): Listing[] => {
    return listings.map((listing) => ({
      ...listing,
      owner: users.find((u) => u.id === listing.ownerId)!,
      reviews: reviews.filter((r) => r.listingId === listing.id),
    }));
  },

  updateListing: (id: string, updates: Partial<Listing> & { images?: string | string[]; amenities?: string | string[] }): Listing | null => {
    const index = listings.findIndex((l) => l.id === id);
    if (index === -1) return null;
    
    const processedUpdates: any = { ...updates };
    if (updates.images !== undefined) {
      processedUpdates.images = typeof updates.images === "string" ? JSON.parse(updates.images) : updates.images;
    }
    if (updates.amenities !== undefined) {
      processedUpdates.amenities = typeof updates.amenities === "string" ? JSON.parse(updates.amenities) : updates.amenities;
    }
    
    listings[index] = { ...listings[index], ...processedUpdates, updatedAt: new Date() };
    return listings[index];
  },

  deleteListing: (id: string): boolean => {
    const index = listings.findIndex((l) => l.id === id);
    if (index === -1) return false;
    listings.splice(index, 1);
    return true;
  },

  // Reviews
  createReview: (
    review: Omit<Review, "id" | "createdAt" | "updatedAt" | "user">
  ): Review => {
    const user = users.find((u) => u.id === review.userId);
    if (!user) throw new Error("User not found");

    const newReview: Review = {
      ...review,
      id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      user,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    reviews.push(newReview);
    return newReview;
  },

  getReviewsByListingId: (listingId: string): Review[] => {
    return reviews
      .filter((r) => r.listingId === listingId)
      .map((review) => ({
        ...review,
        user: users.find((u) => u.id === review.userId)!,
      }));
  },

  // Chats
  createChat: (
    chat: Omit<Chat, "id" | "createdAt" | "updatedAt" | "student" | "owner" | "listing" | "lastMessage" | "unreadCount">
  ): Chat => {
    const student = users.find((u) => u.id === chat.studentId);
    const owner = users.find((u) => u.id === chat.ownerId);
    const listing = listings.find((l) => l.id === chat.listingId);
    
    if (!student || !owner || !listing) throw new Error("Invalid chat data");

    const newChat: Chat = {
      ...chat,
      id: `chat_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      student,
      owner,
      listing,
      unreadCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    chats.push(newChat);
    return newChat;
  },

  getChatById: (id: string): Chat | undefined => {
    return chats.find((c) => c.id === id);
  },

  getChatsByUserId: (userId: string): Chat[] => {
    return chats
      .filter((c) => c.studentId === userId || c.ownerId === userId)
      .map((chat) => ({
        ...chat,
        student: users.find((u) => u.id === chat.studentId)!,
        owner: users.find((u) => u.id === chat.ownerId)!,
        listing: listings.find((l) => l.id === chat.listingId)!,
      }));
  },

  // Messages
  createMessage: (
    message: Omit<ChatMessage, "id" | "createdAt">
  ): ChatMessage => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date(),
    };
    messages.push(newMessage);
    return newMessage;
  },

  getMessagesByChatId: (chatId: string): ChatMessage[] => {
    return messages.filter((m) => m.chatId === chatId);
  },
};

