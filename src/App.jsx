import logo from "/logo.png";
import "./App.css";
import axios from "axios";
import { useState } from "react";

const OPEN_WEATHER_API_KEY = import.meta.env.VITE_SOME_API_KEY;

function App() {
  const [cityInputValue, setCityInputValue] = useState("");
  const [currCity, setCurrCity] = useState("");
  const [currTemp, setCurrTemp] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [weatherIconCode, setWeatherIconCode] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )

      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);

        setCityInputValue("");
        setCurrCity(weatherData.name);
        setCurrTemp(weatherData.main.temp);
        setWeatherType(weatherData.weather[0].main);
        setWeatherDesc(weatherData.weather[0].description);
        setWeatherIconCode(weatherData.weather[0].icon);
      });
  };

  const weatherInfo = currCity ? (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`}
        alt="weather-icon"
      />
      <p>Current City: {currCity}</p>
      <p>Current Temperature: {currTemp}°C</p>
      <p>
        Current Weather: {weatherType}, {weatherDesc}
      </p>
    </div>
  ) : (
    <p>Enter a city to get weather data.</p>
  );

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Weather logo" />
      </div>
      <h2>Weather App</h2>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>
            {"City: "}
            <input
              type="text"
              value={cityInputValue}
              onChange={(e) => setCityInputValue(e.target.value)}
            />
          </label>
          <br />
          <input type="submit" value="Check Weather" />
        </form>
        {weatherInfo}
      </div>
    </>
  );
}

export default App;
