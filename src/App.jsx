import logo from "/logo.png";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import WeatherTable from "./WeatherTable";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [error, setError] = useState();

  const handleChange = (event) => {
    setCity(event.target.value); 
  }

  const API_Key = "119b0643de27a258eb734cc83e735875"

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_Key}`
      )
      .then((response) => response.data[0])
      .then((cityGeoData) => {
        const cityData = cityGeoData;
        return Promise.all([
          cityData,
          axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_Key}&units=metric`
          ),
        ]);
      }
      )
      .then(([cityData, weatherResponse]) => {
        const cityGeoData = cityData
        const { data: weatherData } = weatherResponse;
        setWeatherData(weatherData);
        setError(null)
        return axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_Key}`
        );
      })
      .then ((response) => {
        const { data: hourlyData } = response;
        setHourlyData(hourlyData.list)
      })
      .catch((err) => {
        setWeatherData(null)
        setError(err.code)
      }
      );
  };

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label>Please Enter a City: </label>
          <input type="text" onChange={handleChange} />
          <div style={{margin:"1rem"}}><input type="submit"/></div>
        </form>
      </div>
      {weatherData? 
      <div>
        <div><span>City: </span>{weatherData.name}</div>
        <div>Temperature: {weatherData.main.feels_like}</div>
        <div>Weather: {weatherData.weather[0].main}, {weatherData.weather[0].description}</div>
      </div> : null }
      
      <div style={{margin:"1rem"}}>
        {hourlyData? <WeatherTable data={hourlyData} /> : null}
      </div>

      {error? <div>Error: {error}</div> : null}
    </>
  );
}

export default App;
