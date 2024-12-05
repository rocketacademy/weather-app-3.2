import React from 'react'

function WeatherTable({data}) {

  const generateRows = (data) => {
    return data.map((item, index) => {
      const dateTime = new Date(item.dt * 1000);
      const date = dateTime.toLocaleDateString();
      const time = dateTime.toLocaleTimeString();

      return (
        <tr key={index}>
          <td>{date}</td>
          <td>{time}</td>
          <td>{JSON.stringify(item.main.temp)}</td>
          <td>{JSON.stringify(item.weather[0].main)}</td>
          <td>{JSON.stringify(item.wind.speed)}</td>
        </tr>
      );
    })
  };

  return (
    <div>
      <table border={1}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Main</th>
            <th>Weather</th>
            <th>Wind</th>
          </tr>
        </thead>
        <tbody>{generateRows(data)}</tbody>
      </table>
    </div>
  );
}

export default WeatherTable