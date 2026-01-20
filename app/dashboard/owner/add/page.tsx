"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/db";
import { Save } from "lucide-react";

export default function AddListingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    images: "",
    rent: "",
    deposit: "",
    location: "",
    latitude: "",
    longitude: "",
    amenities: "",
    hasAC: false,
    mealsIncluded: false,
    genderPreference: "any",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const userStr = localStorage.getItem("currentUser");
    if (!userStr) {
      router.push("/auth/login");
      return;
    }
    const user = JSON.parse(userStr);

    const amenitiesArray = formData.amenities
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a);

    const imagesArray = formData.images
      .split(",")
      .map((img) => img.trim())
      .filter((img) => img);

    const newListing = db.createListing({
      title: formData.title,
      description: formData.description,
      images: JSON.stringify(imagesArray) as any,
      rent: parseInt(formData.rent),
      deposit: parseInt(formData.deposit),
      location: formData.location,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude),
      amenities: JSON.stringify(amenitiesArray) as any,
      hasAC: formData.hasAC,
      mealsIncluded: formData.mealsIncluded,
      genderPreference: formData.genderPreference as "male" | "female" | "any",
      ownerId: user.id,
      verified: false,
      boosted: false,
      views: 0,
    });

    router.push("/dashboard/owner");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Add New Listing</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Cozy PG near DU Campus - AC Room"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Describe your PG..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images (comma-separated URLs) *
            </label>
            <input
              type="text"
              required
              value={formData.images}
              onChange={(e) => setFormData({ ...formData, images: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rent (₹/month) *
              </label>
              <input
                type="number"
                required
                value={formData.rent}
                onChange={(e) => setFormData({ ...formData, rent: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deposit (₹) *
              </label>
              <input
                type="number"
                required
                value={formData.deposit}
                onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="North Campus, Delhi University"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude *
              </label>
              <input
                type="number"
                step="any"
                required
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="28.7041"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude *
              </label>
              <input
                type="number"
                step="any"
                required
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="77.2090"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities (comma-separated)
            </label>
            <input
              type="text"
              value={formData.amenities}
              onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="WiFi, Power Backup, Laundry, Security, Parking"
            />
          </div>

          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.hasAC}
                onChange={(e) => setFormData({ ...formData, hasAC: e.target.checked })}
                className="mr-2"
              />
              <span>Air Conditioning</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.mealsIncluded}
                onChange={(e) => setFormData({ ...formData, mealsIncluded: e.target.checked })}
                className="mr-2"
              />
              <span>Meals Included</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender Preference
            </label>
            <select
              value={formData.genderPreference}
              onChange={(e) => setFormData({ ...formData, genderPreference: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>Create Listing</span>
          </button>
        </form>
      </div>
    </div>
  );
}

