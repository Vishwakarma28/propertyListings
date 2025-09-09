import React, { useState } from "react";

export default function AddPropertyForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    type: "Plot",
    price: "",
    location: "",
    description: "",
    image: "https://via.placeholder.com/400x200"
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = ()=>{
        setForm({...form,image:reader.result})
      }
      reader.readAsDataURL(file);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
    setForm({ name: "", type: "Plot", price: "", location: "", description: "", image: "" });
  };

  return (
    <form className="grid gap-2 max-w-md" onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Property Name"
        className="border p-2 rounded"
        value={form.name}
        onChange={handleChange}
      />
      <select
        name="type"
        className="border p-2 rounded"
        value={form.type}
        onChange={handleChange}
      >
        <option value="Plot">Plot</option>
        <option value="Shed">Shed</option>
        <option value="Retail Store">Retail Store</option>
      </select>
      <input
        type="number"
        name="price"
        placeholder="Price"
        className="border p-2 rounded"
        value={form.price}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        className="border p-2 rounded"
        value={form.location}
        onChange={handleChange}
      />
      <textarea
        name="description"
        placeholder="Description"
        className="border p-2 rounded"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="file"
        accept="image/*"
        className="border p-2 rounded"
        onChange={handleImageChange}
      />

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Submit
      </button>
    </form>
  );
}
