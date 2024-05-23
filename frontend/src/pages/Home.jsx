import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://weather-app-backend-3n1p.onrender.com/city")
      .then((response) => {
        setCities(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-white">Cities List</h1>
        <Link to="/Weather-App-Frontend/city/create" className="text-white hover:text-gray-400">
          <MdOutlineAddBox className="text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 border-b text-gray-300">No</th>
                <th className="px-4 py-2 border-b text-gray-300">City</th>
                <th className="px-4 py-2 border-b text-gray-300">Operations</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city, index) => (
                <tr
                  key={city._id}
                  className="hover:bg-gray-600 transition-colors duration-300"
                >
                  <td className="px-4 py-2 border-b text-center text-gray-300">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border-b text-center text-gray-300">
                    {city.name}
                  </td>
                  <td className="px-4 py-2 border-b text-center">
                    <div className="flex justify-center gap-4">
                      <Link
                        to={`/Weather-App-Frontend/city/details/${city._id}`}
                        className="text-green-500 hover:text-green-300"
                      >
                        <BsInfoCircle className="text-2xl" />
                      </Link>
                      <Link
                        to={`/Weather-App-Frontend/city/delete/${city._id}`}
                        className="text-red-500 hover:text-red-300"
                      >
                        <MdOutlineDelete className="text-2xl" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
