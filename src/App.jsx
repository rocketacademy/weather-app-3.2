import logo from "/logo.png";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const key = '60f5db867acf01e9b394eb0774a23465'

  // const API = https://api.openweathermap.org/geo/1.0/direct?q=singapore&limit=1&appid=60f5db867acf01e9b394eb0774a23465


  // const [weather, setWeather] = useState("")
  const handleSubmit=()=>{

  }

  let Result = () =>{
    return (
      <div className="result">
        <h2 className="cityName result-header">Singapore</h2>
        <div className="result-content">
          <p>Weather: HOT AS BALLS </p>
          <p>Temperature: 1000C</p>
        </div>
      </div>
    )
  }
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
          <input type="text" name="" id="" />
          <button type="submit">Search</button>
        </form>

        <Result/>

      </div>
    </>
  );
}

export default App;
