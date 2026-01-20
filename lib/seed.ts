// Seed data for development
import { db } from "./db";

export function seedDatabase() {
  // Create sample users
  const owner1 = db.createUser({
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543210",
    role: "owner",
    status: "verified",
    password: "password123", // Demo password
  });

  const owner2 = db.createUser({
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543211",
    role: "owner",
    status: "verified",
    password: "password123", // Demo password
  });

  const student1 = db.createUser({
    name: "Amit Singh",
    email: "amit@example.com",
    phone: "+91 9876543212",
    role: "student",
    status: "verified",
    collegeId: "COLLEGE123",
    password: "password123", // Demo password
  });

  // Create sample listings
  const listing1 = db.createListing({
    title: "Cozy PG near DU Campus - AC Room",
    description: "Spacious AC room with attached bathroom. Clean, safe, and well-maintained. Close to metro station and college.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ]) as any,
    rent: 12000,
    deposit: 20000,
    location: "North Campus, Delhi University",
    latitude: 28.7041,
    longitude: 77.2090,
    amenities: JSON.stringify(["WiFi", "Power Backup", "Laundry", "Security", "Parking"]) as any,
    hasAC: true,
    mealsIncluded: true,
    genderPreference: "male",
    ownerId: owner1.id,
    verified: true,
    boosted: false,
    views: 45,
  });

  const listing2 = db.createListing({
    title: "Modern Girls PG - Meals Included",
    description: "Beautiful PG for girls with all modern amenities. Home-cooked meals, WiFi, and 24/7 security.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
      "https://images.unsplash.com/photo-1631889993957-2a513f5e3f3a?w=800",
    ]) as any,
    rent: 15000,
    deposit: 25000,
    location: "South Extension, New Delhi",
    latitude: 28.5679,
    longitude: 77.2167,
    amenities: JSON.stringify(["WiFi", "Meals", "Laundry", "Security", "Parking", "Gym"]) as any,
    hasAC: true,
    mealsIncluded: true,
    genderPreference: "female",
    ownerId: owner2.id,
    verified: true,
    boosted: true,
    views: 78,
  });

  const listing3 = db.createListing({
    title: "Budget-Friendly Non-AC Room",
    description: "Affordable room for students. Clean environment, good connectivity, and friendly atmosphere.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    ]) as any,
    rent: 8000,
    deposit: 15000,
    location: "Rohini, Delhi",
    latitude: 28.7431,
    longitude: 77.1025,
    amenities: JSON.stringify(["WiFi", "Laundry", "Security"]) as any,
    hasAC: false,
    mealsIncluded: false,
    genderPreference: "any",
    ownerId: owner1.id,
    verified: true,
    boosted: false,
    views: 32,
  });

  const owner3 = db.createUser({
    name: "Vikram Mehta",
    email: "vikram@example.com",
    phone: "+91 9876543213",
    role: "owner",
    status: "verified",
    password: "password123",
  });

  const listing4 = db.createListing({
    title: "Premium AC PG with Gym & WiFi",
    description: "Luxury PG accommodation with modern amenities. Fully furnished rooms, gym access, high-speed WiFi, and 24/7 security.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1631889993957-2a513f5e3f3a?w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
    ]) as any,
    rent: 18000,
    deposit: 30000,
    location: "Dwarka, New Delhi",
    latitude: 28.6139,
    longitude: 77.2090,
    amenities: JSON.stringify(["WiFi", "Gym", "Power Backup", "Laundry", "Security", "Parking", "CCTV"]) as any,
    hasAC: true,
    mealsIncluded: true,
    genderPreference: "male",
    ownerId: owner3.id,
    verified: true,
    boosted: true,
    views: 120,
  });

  const listing5 = db.createListing({
    title: "Cozy Girls Hostel - Safe & Secure",
    description: "Exclusive girls hostel with strict security. Clean rooms, home-cooked meals, and friendly environment.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
    ]) as any,
    rent: 14000,
    deposit: 22000,
    location: "Karol Bagh, Delhi",
    latitude: 28.6517,
    longitude: 77.1912,
    amenities: JSON.stringify(["WiFi", "Meals", "Laundry", "Security", "CCTV", "Power Backup"]) as any,
    hasAC: true,
    mealsIncluded: true,
    genderPreference: "female",
    ownerId: owner2.id,
    verified: true,
    boosted: false,
    views: 95,
  });

  const listing6 = db.createListing({
    title: "Shared Room - Economical Option",
    description: "Shared accommodation for budget-conscious students. Clean, well-maintained, and close to public transport.",
    images: JSON.stringify([
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    ]) as any,
    rent: 6000,
    deposit: 10000,
    location: "Pitampura, Delhi",
    latitude: 28.6941,
    longitude: 77.1315,
    amenities: JSON.stringify(["WiFi", "Laundry", "Security"]) as any,
    hasAC: false,
    mealsIncluded: false,
    genderPreference: "any",
    ownerId: owner1.id,
    verified: true,
    boosted: false,
    views: 28,
  });

  // Create sample reviews
  db.createReview({
    listingId: listing1.id,
    userId: student1.id,
    rating: 5,
    comment: "Great place! Clean, safe, and the owner is very helpful. Highly recommended!",
  });

  db.createReview({
    listingId: listing2.id,
    userId: student1.id,
    rating: 4,
    comment: "Good PG with nice facilities. Food is decent. Location is convenient.",
  });

  db.createReview({
    listingId: listing4.id,
    userId: student1.id,
    rating: 5,
    comment: "Excellent facilities! The gym and WiFi are top-notch. Worth every rupee.",
  });

  console.log("Database seeded successfully!");
}

