import logo from "/logo.png";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [cityTemperature, setCityTemperature] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput}&appid=08c1f2e68be9c8bcfc5d3d18c6b0f54e`)
      .then((response) => response.data[0])
      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=08c1f2e68be9c8bcfc5d3d18c6b0f54e&units=metric`
        )
      )
      .then((response) => {
        const { data: weatherData } = response;
        console.log(weatherData);
        setCityTemperature(weatherData.main.temp);
      });
  };

  const weatherInfo = (
    <div>
      <p>Current City: {cityInput} </p>
      <p>Temperature: {cityTemperature} </p>
    </div>
  );

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input type="text" value={cityInput} onChange={(event) => setCityInput(event.target.value)} />
          <br />
          <button type="Submit">Submit</button>
        </form>
      </div>
      {/* testing  */}
      {cityInput}
      {weatherInfo}
    </>
  );
}

export default App;
