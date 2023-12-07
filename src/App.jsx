import logo from "/logo.png";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [displayCity, setDisplayCity] = useState("");
  const [displayWeather, setDisplayWeather] = useState("");
  const [displayTemp, setDisplayTemp] = useState("");
  // const [displayTime, setDisplayTime] = useState("");

  const geoApi = `https://api.openweathermap.org/geo/1.0/direct?q=${city
    .toLowerCase()
    .trim()}&limit=1&appid=60f5db867acf01e9b394eb0774a23465`;
  // const weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=60f5db867acf01e9b394eb0774a23465`;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(geoApi)
      .then((response) => response.data[0])
      .then((response) => {
        return axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${response.lat}&lon=${response.lon}&appid=60f5db867acf01e9b394eb0774a23465`
        )
      })
      .then(response => {
        console.log(response.data);
        setDisplayCity(response.data.name)
        setDisplayWeather(
          `${response.data.weather[0].main}, ${response.data.weather[0].description}`
        )
        setDisplayTemp(
          `${(Number(response.data.main.temp) - 273.15).toFixed(2)} \u00B0 C`
        );
      })
    setCity("")
  };

  let Result = () => {
    return (
      <div className="result">
        <h2 className="cityName result-header">{displayCity}</h2>
        <div className="result-content">
          <p>Current weather: {displayWeather}</p>
          <p>Current temperature: {displayTemp}</p>
        </div>
      </div>
    );
  };

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        {/* Follow the weather app instructions on the gitbook to implement this exercise */}
        <form onSubmit={handleSubmit} action="" method="get">
          <label htmlFor="">City: </label>
          <input
            onChange={(e) => setCity(e.target.value)}
            type="text"
            name=""
            id=""
            autoFocus
            value={city}
            placeholder="Enter city"
          />
          <button type="submit">Search</button>
        </form>

        {displayCity? <Result />:null}
      </div>
    </>
  );
}

export default App;
