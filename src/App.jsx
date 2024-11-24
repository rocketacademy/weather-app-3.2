import logo from "/logo.png";
import "./App.css";
import axios from "axios";
import { useState } from "react";
const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

function App() {
  const [cityInputValue, setCityInputValue] = useState("");
  const [currCity, setCurrCity] = useState("");
  const [currTemp, setCurrTemp] = useState("");
  const [weathertype, setWeatherType] = useState("");
  const [weatherDesc, setWeatherDesc] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => {
        console.log(response);
        const lat = response.data[0].lat;
        const lon = response.data[0].lon;
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${OPEN_WEATHER_API_KEY}`
        );
      })
      .then((weatherResponse) => {
        const { data: weatherData } = weatherResponse;
        console.log(weatherResponse);
        setCityInputValue("");
        setCurrCity(weatherData.name);
        setCurrTemp(weatherData.main.temp);
        setWeatherType(weatherData.weather[0].main);
        setWeatherDesc(weatherData.weather[0].description);
      });
  };

  const weatherInfo = currCity ? (
    <div>
      <p>Current City: {currCity}</p>
      <p>Current Temperature: {currTemp}°C</p>
      <p>
        Current Weather: {weathertype}, {weatherDesc}
      </p>
    </div>
  ) : (
    <p>Please enter a city name to get its weather data.</p>
  );

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={cityInputValue}
            onChange={(event) => setCityInputValue(event.target.value)}
          />
          <button>Submit</button>
        </form>
        {weatherInfo}
      </div>
    </>
  );
}

export default App;
