import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function PropertyModal({ property, onClose }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyBKBqdoSfOv5c2scXLwLK62xPBQ17BYuAM'
  });
  console.log("isLoaded",isLoaded)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-red-500"
          onClick={onClose}
        >
          X
        </button>

        <h2 className="text-xl font-bold mb-2">{property.name}</h2>
        <img
          src={property.image}
          alt={property.name}
          className="rounded mb-4 w-auto h-96"
        />
        <p><b>Type:</b> {property.type}</p>
        <p><b>Location:</b> {property.location}</p>
        <p><b>Price:</b> ${property.price}</p>
        <p className="mt-2">{property.description}</p>

        {isLoaded && property.lat && property.lng && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Location Map</h3>
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "100px" }}
              center={{ lat: property.lat, lng: property.lng }}
              zoom={14}
            >
              <Marker position={{ lat: property.lat, lng: property.lng }} />
            </GoogleMap>
          </div>
        )}
      </div>
    </div>
  );
}
