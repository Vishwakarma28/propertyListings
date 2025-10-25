import React, { useEffect, useState } from "react";
import { getProperties, addProperty } from "./api";
import PropertyCard from "./components/PropertyCard";
import AddPropertyForm from "./components/AddPropertyForm";
import PropertyModal from "./components/PropertyModal";
import videoBg from "./assets/6929758-hd_1920_1080_30fps.mp4"

export default function App() {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    const { data } = await getProperties();
    setProperties(data);
    setFiltered(data);
  };

  const handleAddProperty = async (newProp) => {
    await addProperty(newProp);
    fetchProperties();
  };

  const handleFilter = () => {
    let result = properties;

    if (filterType) {
      result = result.filter((p) => p.type === filterType);
    }

    if (search) {
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFiltered(result);
  };

  useEffect(() => {
    handleFilter();
  }, [filterType, search, properties]);

  return (
    <div className="relative w-full min-h-screen ">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        src={videoBg}
        autoPlay
        loop
        muted
      />

      <div className="absolute top-0 left-0 w-full h-full bg-black/40 -z-10"></div>


      <div className="relative px-16 py-10 text-white">
        <div className="flex gap-x-80">
          <h1 className="text-6xl font-bold mb-4">
            Mini Property Listing Dashboard
          </h1>
        </div>

        <div className="flex gap-4 mb-6">
          <select
            className="border p-2 rounded bg-green-800"
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Plot">Plot</option>
            <option value="Shed">Shed</option>
            <option value="Retail Store">Retail Store</option>
          </select>

          <input
            type="text"
            placeholder="Search by name or location"
            className="border p-2 rounded flex-1 bg-green-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((prop) => (
            <PropertyCard
              key={prop.id}
              property={prop}
              onView={() => setSelected(prop)}
            />
          ))}
        </div>

        <div className="mt-6 bg-emerald-200 p-7 rounded-3xl w-fit">
          <h2 className="text-xl font-semibold mb-2">Add Property</h2>
          <AddPropertyForm onAdd={handleAddProperty} />
        </div>

        {selected && (
          <PropertyModal property={selected} onClose={() => setSelected(null)} />
        )}
      </div>
    </div>
  );
}