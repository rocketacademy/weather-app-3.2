import logo from "/logo.png";
import "./App.css";

import axios from "axios";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const API_key = "41032709a922fe8741839268424fd909";
let graph_data = [];

function App() {

  const [city, setCity] = useState("");
  const [dailyData, setDailyData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);

  const getDailyData = async (cityName) => {
    const cityResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`);
    const cityGeoData = cityResponse.data.coord;
    const weatherResponse = await axios .get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${API_key}&units=metric`);
    const weatherData = weatherResponse.data;
    return weatherData;
  };

  const getHourlyData = async (cityName) => {
    const cityResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_key}&units=metric&cnt=8`);
    return cityResponse;
  };

  const handleClick = async (cityName) => { 
    let dailyStats = await getDailyData(cityName);
    setDailyData(dailyStats);
    let hourlyStats = await getHourlyData(cityName);
    setHourlyData(hourlyStats);
    setCity("");
  };

  const appendData = () => {
      graph_data = hourlyData.data.list.map((hour) => ({
        "time": `${hour.dt_txt}`.slice(-8),
        "temp": hour.main.temp,
    }));
    console.log(graph_data);
  };

  return (
    <>
      <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div>
      <h1>Weather App</h1>
      <div className="card">
        {/* Follow the weather app instructions on the gitbook to implement this exercise */}
        <form className="container-input">
          <label>
            City: <input type="text" value={city} onChange={(e) => {setCity(e.target.value); }}></input>
          </label>
          <button type="submit" onClick={(e) => {e.preventDefault(); handleClick(city); }}>Check</button>
        </form>

        <div className="container-data">
          {dailyData &&
            <div className="container-daily">
              <h2>City: {dailyData.name}</h2>
              <p>Temperature: {dailyData.main.temp}</p>
              <p>Humidity: {dailyData.main.humidity}</p>
              <p>Weather: {dailyData.weather[0].description}</p>
              <img src={`https://openweathermap.org/img/wn/${dailyData.weather[0].icon}@2x.png`} />
              <p>Wind Speed: {dailyData.wind.speed}</p>
            </div>
          }

          <div className="container-hourly">
            {hourlyData &&
              <div className="table">
                <h2>City: {hourlyData.data.city.name}</h2>
                <div className="column-header">
                  <div><h3>Time</h3></div>
                  <div><h3>Temperature</h3></div>
                  <div><h3>Humidity</h3></div>
                  <div><h3>Weather</h3></div>
                </div>
                <div className="container-hour">
                  {hourlyData.data.list.map((hour, index) => {
                    return (
                      <div className="row-hour" key={index}>
                        <div><p>{hour.dt_txt}</p></div>
                        <div><p>{hour.main.temp}&deg;C</p></div>
                        <div><p>{hour.main.humidity}</p></div>
                        <div><p>{hour.weather[0].description}</p></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            }
          </div>

        </div>
        
        <div className="graph">
          <h2>Temperature Graph</h2>
          {hourlyData && appendData()}
          {hourlyData &&
            <ResponsiveContainer width={"100%"} height={300}>
              <LineChart data={graph_data}>
                <CartesianGrid strokeDasharray="3 3" verticalCoordinatesGenerator={(props) => [144, 223, 302, 381, 460, 539, 618]}/>
                <XAxis dataKey="time" label={{value: "Time"}}/>
                <YAxis label={{value: "Temperature"}}/>
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#8884d8"
                />
              </LineChart>
            </ResponsiveContainer>
          }
        </div>
      </div>
    </>
  );
}

export default App;
