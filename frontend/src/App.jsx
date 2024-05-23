import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateCity from "./pages/CreateCity";
import ShowCity from "./pages/ShowCity";
import DeleteCity from "./pages/DeleteCity";
import WeatherView from "./pages/WeatherView";

export const App = () => {
  return (
    <Routes>
      <Route path="/Weather-App-Frontend/" element={<Home />} />
      <Route path="/Weather-App-Frontend/city/create" element={<CreateCity />} />
      <Route path="/Weather-App-Frontend/city/details/:id" element={<ShowCity />} />
      <Route path="/Weather-App-Frontend/city/delete/:id" element={<DeleteCity />} />
      <Route path="/Weather-App-Frontend/city/:id/weather" element={<WeatherView />} />
    </Routes>
  );
};

export default App;
