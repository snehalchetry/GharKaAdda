"use client";

import dynamic from "next/dynamic";

// Dynamically import MapView to avoid SSR issues with Leaflet
const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
      <p className="text-gray-500">Loading map...</p>
    </div>
  ),
});

export default MapView;

