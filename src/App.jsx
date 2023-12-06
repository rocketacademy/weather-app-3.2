import logo from "/logo.png";
import "./App.css";
import { useState } from "react";
import Weather from "./weather";

export default function App() {
  const [city, setCity] = useState("Singapore");
  const [cityInput, setCityInput] = useState("");

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        {/* Follow the weather app instructions on the gitbook to implement this exercise */}
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
        />{" "}
        <button onClick={() => setCity(cityInput)}>Check Weather</button>
        <div>
          <Weather city={city} />
        </div>
      </div>
    </>
  );
}
