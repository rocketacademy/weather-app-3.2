import logo from "/logo.png";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./weather";
import Forecast from "./forecast";

function App() {
  const [city, setCity] = useState("");
  const [response, setResponse] = useState([]);
  const [weather, setWeather] = useState([]);
  const [forecast, setForecast] = useState([]);

  let lat = "";
  let lon = "";
  const key = import.meta.env.VITE_SOME_WEATHER_API_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${key}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) => {
        lat = cityGeoData.lat;
        console.log(lat);
        lon = cityGeoData.lon;
        console.log(`lon ${lon}`);
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
        );
      })
      .then((response) => {
        const { data: weatherData } = response;
        console.log(`WEATHER ${weatherData}`);
        setWeather(weatherData);
        //set forecast
        return axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
        );
      })
      .then((response) => {
        const { data: forecastData } = response;
        console.log(`forecast ${forecastData}`);
        setForecast(forecastData);
      });
  };

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        <form onSubmit={(event) => handleSubmit(event)}>
          <input
            name="search"
            type="text"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          <button type="submit"> Search </button>
        </form>
        <h1>City: {city}</h1>
        {typeof weather.main != "undefined" ? (
          <WeatherCard weatherData={weather} />
        ) : (
          <div> </div>
        )}
        {typeof forecast.list != "undefined" ? (
          <Forecast forecastData={forecast} />
        ) : (
          <div> </div>
        )}
      </div>
    </>
  );
}

export default App;
