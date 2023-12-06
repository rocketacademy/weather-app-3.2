import logo from "/logo.png";
import "./App.css";
import { useState } from "react";
import axios from "axios";

const API_KEY = "4383f46f58cb016f45b5ef2b099d8d5a";

function App() {
  //when user keys in city
  const [userInputCity, setuserInputCity] = useState("");
  const [showTemperature, setShowTemperature] = useState("");
  const [showCityName, setShowCityName] = useState("");

  //prevent form from refreshing
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      //get location cords to map into weather URL
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${userInputCity}&limit=5&appid=${API_KEY}`
      )
      .then((response) => response.data[0])

      //BASE
      //grab response.data[0] into cityGeoData
      // .then((cityGeoData) =>
      //   axios.get(
      //     `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_KEY}&units=metric`
      //   )
      // )
      // .then((response) => {
      //   const { data: weatherData } = response;
      //   console.log(weatherData);
      //   console.log("temperature:", weatherData.main.temp);
      //   console.log("city name:", weatherData.name);

      //   //show temperature
      //   setShowTemperature(weatherData.main.temp);
      //   //show name
      //   setShowCityName(weatherData.name);
      // })
      // .catch((error) => {
      //   console.log("ERROR!");
      // });

      .then((cityGeoData) =>
        axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_KEY}&units=metric`
        )
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("ERROR!");
      });
  };

  const weatherInfo = showCityName ? (
    <div>
      <p>City: {showCityName} </p>
      <p>Temperature: {showTemperature} °C</p>
    </div>
  ) : (
    <p>Hello. Please key in a city's name.</p>
  );

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        <form onSubmit={handleSubmit}>
          <label> City Name: </label>
          <input
            value={userInputCity}
            onChange={(e) => setuserInputCity(e.target.value)}
            type="text"
          />
          <br />
          <br />
          <button onClick={handleSubmit}> Submit </button>
        </form>
        {weatherInfo}
      </div>
    </>
  );
}

export default App;
