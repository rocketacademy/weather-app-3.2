import React from "react";
import "./App.css";

const Forecast = ({ forecastData }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th> Date</th>
          <th> Temperature</th>
          <th> Feels like</th>
          <th> Description</th>
        </tr>
      </thead>
      <tbody>
        {forecastData.list.map((list, i) => (
          <tr key={i}>
            <td>
              {new Date(list.dt_txt).toLocaleString("en-GB", {
                timeZone: "Asia/Singapore",
              })}
            </td>
            <td> {list.main.temp} &deg;C</td>
            <td> {list.main.feels_like} &deg;C</td>
            <td> {list.weather[0].main} </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Forecast;
