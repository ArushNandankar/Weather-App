import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import Spinner from "../components/Spinner";

const ShowCity = () => {
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const response = await axios.get(`https://weather-app-backend-3n1p.onrender.com/city/${id}`);
        setCity(response.data);
        setIsLoading(false);
      } catch (error) {
        setError("Failed to fetch city data.");
        setIsLoading(false);
      }
    };
    fetchCity();
  }, [id]);

  const handleShowCity = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`https://weather-app-backend-3n1p.onrender.com/city/${id}/weather`);
      if (isLoading) {
        return (
          <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center relative">
            <Link
              to="/Weather-App-Frontend/"
              className="text-white hover:text-gray-400 absolute top-6 left-6"
            >
              <MdArrowBack className="text-4xl" />
            </Link>
            <Spinner />
          </div>
        );
      }
      setIsLoading(false);
      console.log(response.data);
      if (response.data === undefined) {
        return <div>{error}</div>;
      }
      navigate(`/Weather-App-Frontend/city/${id}/weather`, { state: { data: response.data } });
    } catch (error) {
      setError("Failed to get weather for city.");
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center relative">
        <Link
          to="/Weather-App-Frontend/"
          className="text-white hover:text-gray-400 absolute top-6 left-6"
        >
          <MdArrowBack className="text-4xl" />
        </Link>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!city) {
    return <div>City not found.</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Link to="/Weather-App-Frontend/" className="text-white hover:text-gray-400">
          <MdArrowBack className="text-4xl" />
        </Link>
        <h1 className="text-4xl font-extrabold text-white">View Weather</h1>
      </div>
      {showSuccessMessage && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg mb-4">
          City deleted successfully!
        </div>
      )}
      <div className="max-w-md mx-auto">
        <p className="text-gray-300 mb-4">
          Do you want to see Weather in "{city.name}"?
        </p>
        <button
          onClick={handleShowCity}
          className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
        >
          View Weather
        </button>
      </div>
    </div>
  );
};

export default ShowCity;
