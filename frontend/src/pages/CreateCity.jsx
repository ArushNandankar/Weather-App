import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const CreateCity = () => {
  const [name, setName] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://weather-app-backend-3n1p.onrender.com/city", { name });
      console.log(response.data);
      setName("");
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000); // Hide the message after 1 second (1000 milliseconds)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Link to="/Weather-App-Frontend/" className="text-white hover:text-gray-400">
          <MdArrowBack className="text-4xl" />
        </Link>
        <h1 className="text-4xl font-extrabold text-white">Create City</h1>
      </div>
      {showSuccessMessage && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4">
          City added successfully!
        </div>
      )}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300 font-bold mb-2">
            City Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
        >
          Create City
        </button>
      </form>
    </div>
  );
};

export default CreateCity;
