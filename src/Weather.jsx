import axios from "axios";
import { useState } from 'react';

export default function Weather() {

  const api = import.meta.env.VITE_SOME_API;
  // Initialise state variables
  const [cityName, setCityName] = useState("");
  const [cityData, setCityData] = useState({});


  const fetchWeatherData = async () => {
    try {
      // To obtain latitude and longtitude of location
      const cityResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${api}`)
      // console.log(cityResponse.data);
      const cityGeoData = cityResponse.data[0];

      // Get the weather data
      // const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${api}&units=metric`)
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${api}&units=metric`)
      // console.log(weatherResponse.data);
      setCityData(weatherResponse.data);

    } catch (error) {
      console.log(error);
    }
  }

  function handleInputData(e) {
    setCityName(e.target.value.toLowerCase());
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit button click");
    fetchWeatherData();
  }

  function WeatherTable() {

    const dailyTemp = cityData.list

    // console.log(dailyTemp);

    // create a new object for date grouping
    let dateGroup = {};
    for (const index in dailyTemp) {
      let date = dailyTemp[index].dt_txt.split(" ")[0]; // get the date from date-time string
      // console.log(date);
      
      // if there is not date array currently, create a new array and push the dailyTemp object inside
      if(!dateGroup[date]) dateGroup[date] = []; 
      dateGroup[date].push(dailyTemp[index]);

    }
    console.log(dateGroup);

    return (
      <div>
        {Object.keys(dateGroup).map((date) => (
          <div key={date}>
            <h3>{date}</h3>
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Temperature (°C)</th>
                  <th>Weather</th>
                </tr>
              </thead>
              <tbody>
                {dateGroup[date].map((hourlyData) => (
                  <tr key={hourlyData.dt}>
                    <td>{hourlyData.dt_txt.split(" ")[1]}</td>
                    <td>{hourlyData.main.temp}</td>
                    <td>
                      <img
                        src={`https://openweathermap.org/img/wn/${hourlyData.weather[0].icon}.png`}
                        alt={hourlyData.weather[0].description}
                      />
                      {hourlyData.weather[0].description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  }
  
  const hasLoaded = cityData.list !== undefined;

  return (
    <>
      <h1>Weather API</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="city">Enter City Name:</label>
        <input type="text" name="city" id="city" value={cityName} onChange={handleInputData}/>
        <button type="submit">submit</button>
      </form>

      <h2>You have selected: {cityName}</h2>
      {hasLoaded && <WeatherTable />}
      {/* {hasLoaded && <img src={`https://openweathermap.org/img/wn/${cityData.weather[0].icon}.png`} />}
      {hasLoaded && <p>Temperature: {cityData.main.temp}</p>}
      {hasLoaded && <p>Feels Like: {cityData.main.feels_like}</p>}
      {hasLoaded && <p>Humidity: {cityData.main.humidity}%</p>} */}
    </>
    
  );
}