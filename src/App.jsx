import logo from "/logo.png";
import "./App.css";
import axios from "axios";
import { useState } from "react";
const OPEN_WEATHER_API_KEY = "7f0b1a5ea8851f99edede0deff472ce3";

function App() {
  const [cityInputValue, setCityInputValue] = useState("");
  const [cityName, setCityName] = useState("");
  const [cityTemp, setCityTemp] = useState("");
  const [cityTempFeelLike, setCityTempFeelLike] = useState("");
  const [weather, setWeather] = useState("");
  const [weatherDes, setWeatherDes] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then(
        (
          cityGeoData // using GeoData to generate weather details
        ) =>
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        //set data from weatherData into the states
        setCityInputValue("");
        setCityName(weatherData.name);
        setCityTemp(weatherData.main.temp);
        setCityTempFeelLike(weatherData.main.feels_like);
        setWeather(weatherData.weather[0].main);
        setWeatherDes(weatherData.weather[0].description);
        setWeatherIcon(weatherData.weather[0].icon);
      });
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      // City geo data is in response.data[0]
      // Arrow functions with no curly braces return value after arrow
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
          ) // get the forecast details
          .then((response) => {
            const { data: weatherForecastData } = response;
            setWeatherForecast(weatherForecastData);
            console.log(weatherForecastData);
          })
      );
  };
  // present data into a table form
  const WeatherDataTable = ({ weatherForecast }) => {
    if (!weatherForecast) return null;
    return (
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>Weather</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {weatherForecast.list.map((item, index) => (
            <tr key={index}>
              <td>{new Date(item.dt * 1000).toLocaleString()}</td>
              <td>{item.main.temp}°C</td>
              <td>{item.weather[0].description}</td>
              <td>
                <img
                  src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  // create a component to show the current weather
  const weatherReport = cityName ? (
    <div>
      <p>City: {cityName}</p>
      <p>Temperature: {cityTemp} Degrees</p>
      <p>Feels like: {cityTempFeelLike} Degrees</p>
      <p>
        Weather Condition: {weather} - {weatherDes}
      </p>
      <p>
        <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} />
      </p>
    </div>
  ) : (
    <p>Please enter a city name for its weather data!</p>
  );

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <a>Key in City Name: </a>
          <input
            type="text"
            value={cityInputValue}
            onChange={(e) => setCityInputValue(e.target.value)}
          />
        </form>
        {weatherReport}
        {WeatherDataTable && (
          <WeatherDataTable weatherForecast={weatherForecast} />
        )}
      </div>
    </>
  );
}

export default App;
