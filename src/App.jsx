import logo from "/logo.png";
import "./App.css";
import { useEffect, useState } from "react";
import Weather from "./weather";

function App() {
  const [city, setCity] = useState("London");
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
        <button onClick={() => setCity(cityInput)}>Enter</button>
      </div>
      <Weather city={city} />
    </>
  );
}

export default App;
