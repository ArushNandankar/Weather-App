import express from "express";
import { City } from "../models/cityModel.js";
import { WEATHER_API_KEY } from "../config.js";

const router = express.Router();

// Route to save new City (Done)
router.post("/", async (request, response) => {
  try {
    if (!request.body.name) {
      return response.status(400).send({ message: "City name is required" });
    }
    const city = new City({
      name: request.body.name,
    });
    await city.save();
    return response.status(201).send(city);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get all cities (Done)
router.get("/", async (request, response) => {
  try {
    const cities = await City.find();
    return response.status(200).json({
      count: cities.length,
      data: cities,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Route to get city by id (Done)
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const city = await City.findById(id);
    if (!city) {
      return response
        .status(404)
        .send({ message: "City not found in findbyid" });
    }
    return response.status(200).send(city);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Route to delete city by id (Done)
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const city = await City.findByIdAndDelete(id);
    if (!city) {
      return response
        .status(404)
        .send({ message: "City not found in findbyidanddelete" });
    }
    return response.status(200).send({ message: "City deleted successfully" });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// Route to return city weather by id
router.get("/:id/weather", async (request, response) => {
  try {
    const { id } = request.params;
    const city = await City.findById(id);
    if (!city) {
      return response
        .status(404)
        .send({ message: "City not found in findbyid" });
    }
    const cityName = city.name;
    // Call weather API here
    const url = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${cityName}`;
    const weatherResponse = await fetch(url);
    const weatherData = await weatherResponse.json();
    console.log(weatherData);
    return response.status(200).send(weatherData);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

export default router;
