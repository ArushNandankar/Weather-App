import React, { useState } from "react";
import { MdArrowBack, MdExpandMore, MdExpandLess } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from "react-icons/wi";
import Spinner from "../components/Spinner";

const WeatherView = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const weatherData = location.state.data;
  const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);
  const toggleAdditionalDetails = () => {
    setShowAdditionalDetails(!showAdditionalDetails);
  };

  // if there is no name in the location state, show an error message and return to the home page
  if (weatherData.location === undefined) {
    return (
      <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Error</h2>
          <p>Failed to fetch weather data for this city.</p>
          <Link to="/Weather-App-Frontend/" className="text-green-600 hover:text-green-400">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const getWeatherIcon = (code) => {
    switch (true) {
      case code === 1000:
        return <WiDaySunny className="text-8xl text-yellow-500" />;
      case code >= 1003 && code <= 1030:
        return <WiCloudy className="text-8xl text-gray-400" />;
      case code >= 1063 && code <= 1072:
        return <WiRain className="text-8xl text-blue-500" />;
      case code >= 1087 && code <= 1117:
        return <WiThunderstorm className="text-8xl text-yellow-600" />;
      case code >= 1135 && code <= 1258:
        return <WiFog className="text-8xl text-gray-600" />;
      case code >= 1261 && code <= 1264:
        return <WiFog className="text-8xl text-gray-600" />;
      case code >= 1237 && code <= 1249:
        return <WiSnow className="text-8xl text-blue-300" />;
      default:
        return <WiCloudy className="text-8xl text-gray-400" />;
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="p-6 bg-gray-900 min-h-screen flex items-center justify-center relative">
  //       <Link
  //         to="/"
  //         className="text-white hover:text-gray-400 absolute top-6 left-6"
  //       >
  //         <MdArrowBack className="text-4xl" />
  //       </Link>
  //       <Spinner />
  //     </div>
  //   );
  // }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <Link to="/Weather-App-Frontend/" className="text-white hover:text-gray-400">
          <MdArrowBack className="text-4xl" />
        </Link>
        <h1 className="text-4xl font-extrabold text-white">View Weather</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 flex md:flex-row">
        <div className="flex-1 flex flex-col justify-center md:mr-4">
          <h2 className="text-2xl font-bold text-white mb-4 text-center md:text-left">
            {weatherData.location.name}, {weatherData.location.region},{" "}
            {weatherData.location.country}
          </h2>
          <div className="flex items-center justify-center md:justify-start mb-4">
            <p className="text-gray-300 mr-2 text-2xl">
              {weatherData.current.temp_c}°C ({weatherData.current.temp_f}°F)
            </p>
            {getWeatherIcon(weatherData.current.condition.code)}
          </div>
          <div className="flex items-center justify-center md:justify-start mb-4">
            <p className="text-gray-300 mr-2 text-xl">
              {weatherData.current.condition.text}
            </p>
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <button
            onClick={toggleAdditionalDetails}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg flex items-center justify-between"
          >
            {showAdditionalDetails ? "Hide Additional Details" : "Show Additional Details"}
            {showAdditionalDetails ? <MdExpandLess /> : <MdExpandMore />}
          </button>
          {showAdditionalDetails && (
            <div className="mt-4">
              <p className="text-gray-300 mb-2">
                Wind: {weatherData.current.wind_mph} mph ({weatherData.current.wind_kph} kph)
              </p>
              <p className="text-gray-300 mb-2">
                Pressure: {weatherData.current.pressure_mb} mb ({weatherData.current.pressure_in} in)
              </p>
              <p className="text-gray-300 mb-2">Humidity: {weatherData.current.humidity}%</p>
              <p className="text-gray-300 mb-2">
                Feels Like: {weatherData.current.feelslike_c}°C ({weatherData.current.feelslike_f}°F)
              </p>
              <p className="text-gray-300 mb-2">
                Visibility: {weatherData.current.vis_km} km ({weatherData.current.vis_miles} miles)
              </p>
              <p className="text-gray-300 mb-2">UV Index: {weatherData.current.uv}</p>
              <p className="text-gray-300 mb-2">
                Wind Gust: {weatherData.current.gust_mph} mph ({weatherData.current.gust_kph} kph)
              </p>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default WeatherView;