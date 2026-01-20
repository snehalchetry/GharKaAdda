"use client";

import { useState } from "react";
import { FilterOptions } from "@/types";
import { formatPrice } from "@/lib/utils";

interface FilterSidebarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterSidebar({ filters, onFilterChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const emptyFilters: FilterOptions = {};
    setLocalFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-primary hover:underline"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="space-y-2">
            <div>
              <label className="text-sm text-gray-600">Min Price</label>
              <input
                type="number"
                placeholder="0"
                value={localFilters.minPrice || ""}
                onChange={(e) => updateFilter("minPrice", e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border rounded-lg mt-1"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Max Price</label>
              <input
                type="number"
                placeholder="50000"
                value={localFilters.maxPrice || ""}
                onChange={(e) => updateFilter("maxPrice", e.target.value ? parseInt(e.target.value) : undefined)}
                className="w-full px-3 py-2 border rounded-lg mt-1"
              />
            </div>
          </div>
        </div>

        {/* AC/Non-AC */}
        <div>
          <h3 className="font-medium mb-3">Room Type</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.hasAC === true}
                onChange={(e) => updateFilter("hasAC", e.target.checked ? true : undefined)}
                className="mr-2"
              />
              <span className="text-sm">AC Room</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={localFilters.hasAC === false}
                onChange={(e) => updateFilter("hasAC", e.target.checked ? false : undefined)}
                className="mr-2"
              />
              <span className="text-sm">Non-AC Room</span>
            </label>
          </div>
        </div>

        {/* Meals */}
        <div>
          <h3 className="font-medium mb-3">Meals</h3>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localFilters.mealsIncluded === true}
              onChange={(e) => updateFilter("mealsIncluded", e.target.checked ? true : undefined)}
              className="mr-2"
            />
            <span className="text-sm">Meals Included</span>
          </label>
        </div>

        {/* Gender Preference */}
        <div>
          <h3 className="font-medium mb-3">Gender Preference</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                checked={localFilters.genderPreference === "male"}
                onChange={() => updateFilter("genderPreference", "male")}
                className="mr-2"
              />
              <span className="text-sm">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                checked={localFilters.genderPreference === "female"}
                onChange={() => updateFilter("genderPreference", "female")}
                className="mr-2"
              />
              <span className="text-sm">Female</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                checked={localFilters.genderPreference === "any"}
                onChange={() => updateFilter("genderPreference", "any")}
                className="mr-2"
              />
              <span className="text-sm">Any</span>
            </label>
          </div>
        </div>

        {/* Distance */}
        <div>
          <h3 className="font-medium mb-3">Max Distance (km)</h3>
          <input
            type="number"
            placeholder="10"
            value={localFilters.maxDistance || ""}
            onChange={(e) => updateFilter("maxDistance", e.target.value ? parseFloat(e.target.value) : undefined)}
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}

