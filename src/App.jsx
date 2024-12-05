import logo from "/logo.png";
import "./App.css";
import axios from "axios";
import { useState } from "react";

const WEATHER_API_KEY = "2e9b3bbe3e4c91069c9aef609fd54f11";

function App() {
  const [cityInputValue, setCityInputValue] = useState("");
  const [currCity, setCurrCity] = useState("");
  const [currTemp, setCurrTemp] = useState("");
  const [weatherType, setWeatherType] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");
  const [weatherIcon, setweatherIcon] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInputValue}&limit=1&appid=${WEATHER_API_KEY}`
      )
      .then((response) => {
        const cityGeoData = response.data[0];
        return cityGeoData;
      })
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        setCityInputValue("");
        setCurrCity(weatherData.name);
        setCurrTemp(weatherData.main.temp);
        setWeatherType(weatherData.weather[0].main);
        setWeatherDesc(weatherData.weather[0].description);
        setweatherIcon(weatherData.weather[0].icon);
      });
  };

  const weatherInfo = currCity ? (
    <div>
      <img
        src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
        alt="weather-icon"
      />
      <p>Current City: {currCity}</p>
      <p>Current Temprature: {currTemp}°C</p>
      <p>
        Current Weather: {weatherType}, {weatherDesc}
      </p>
    </div>
  ) : (
    <p>Please enter a city name to get its weather data</p>
  );

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>{"City:"}</label>
          <input
            type="text"
            value={cityInputValue}
            onChange={(e) => setCityInputValue(e.target.value)}
          />
          <button type="submit">Check Weather</button>
        </form>
        {weatherInfo}
        {/* Follow the weather app instructions on the gitbook to implement this exercise */}
      </div>
    </>
  );
}

export default App;
