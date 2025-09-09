import React from "react";

export default function PropertyCard({ property,onView }) {
  return (
    <div className="border rounded-lg p-4 shadow bg-green-600">
      <h3 className="font-bold">{property.name}</h3>
      <p>Type: {property.type}</p>
      <p>Location: {property.location}</p>
      <p className="text-shadow-green-950 font-semibold">${property.price}</p>
      <button
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
        onClick={onView}
      >
        View
      </button>
    </div>
  );
}
