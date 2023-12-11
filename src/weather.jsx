import React from "react";
import "./App.css";

const WeatherCard = ({ weatherData }) => (
  <div>
    <p> Temperature: {weatherData.main.temp} &deg;C </p>
    <p> Feels like: {weatherData.main.feels_like} &deg;C</p>
    <p> Description: {weatherData.weather[0].main} </p>
    <img
      src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
    ></img>
  </div>
);

export default WeatherCard;
