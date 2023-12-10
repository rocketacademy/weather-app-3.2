import axios from "axios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const API_KEY = import.meta.env.VITE_API_KEY;
const units = "metric";

export default function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Chaining promises with axios
  useEffect(() => {
    const getData = () => {
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        )
        .then((locationResponse) => {
          const { lat, lon } = locationResponse.data[0];
          return Promise.all([
            axios.get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
            ),
            axios.get(
              `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
            ),
          ]);
        })
        .then(([weatherResponse, forecastResponse]) => {
          setWeatherData(weatherResponse.data);
          setForecastData(forecastResponse.data);
        })
        .catch((error) => setError(error.message))
        .finally(() => setIsLoading(false));
    };
    getData();
    return () => {
      setError(null);
      setIsLoading(true);
      setWeatherData(null);
      setForecastData(null);
    };
  }, [city]);

  // Chaining promises with fetch
  // useEffect(() => {
  //   const getData = () => {
  //     fetch(
  //       `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  //     )
  //       .then((response) => response.json())
  //       .then((locationResponse) => {
  //         const { lat, lon } = locationResponse[0];
  //         return Promise.all([
  //           fetch(
  //             `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  //           ).then((response) => response.json()),
  //           fetch(
  //             `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  //           ).then((response) => response.json()),
  //         ]);
  //       })
  //       .then(([weatherResponse, forecastResponse]) => {
  //         setWeatherData(weatherResponse);
  //         setForecastData(forecastResponse);
  //       })
  //       .catch((error) => setError(error.message))
  //       .finally(() => setIsLoading(false));
  //   };
  //   getData();
  //   return () => {
  //     setError(null);
  //     setIsLoading(true);
  //     setWeatherData(null);
  //     setForecastData(null);
  //   };
  // }, [city]);

  //Async/await with axios
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const locationResponse = await axios.get(
  //         `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  //       );
  //       const { lat, lon } = locationResponse.data[0];
  //       const weatherResponse = await axios.get(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  //       );
  //       const forecastResponse = await axios.get(
  //         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  //       );
  //       setWeatherData(weatherResponse.data);
  //       setForecastData(forecastResponse.data);
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getData();
  //   return () => {
  //     setError(null);
  //     setIsLoading(true);
  //     setWeatherData(null);
  //     setForecastData(null);
  //   };
  // }, [city]);

  //Async/await with Fetch
  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const locationResponse = await fetch(
  //         `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  //       );
  //       const { lat, lon } = (await locationResponse.json())[0];
  //       const weatherResponse = await fetch(
  //         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  //       );
  //       const forecastResponse = await fetch(
  //         `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  //       );
  //       setWeatherData(await weatherResponse.json());
  //       setForecastData(await forecastResponse.json());
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   getData();
  //   return () => {
  //     setError(null);
  //     setIsLoading(true);
  //     setWeatherData(null);
  //     setForecastData(null);
  //   };
  // }, [city]);

  //learn tanstack-query and swr next for API calls

  return (
    <div className="container">
      {isLoading && <LoadingMessage />}
      {error && <ErrorMessage error={error} />}
      {weatherData && <DataMessage city={city} weatherData={weatherData} />}
      {forecastData && (
        <TableForecast city={city} forecastData={forecastData} />
      )}
    </div>
  );
}

const LoadingMessage = () => <code>Loading...</code>;

const ErrorMessage = ({ error }) => <code>{error}</code>;

const DataMessage = ({ weatherData }) => (
  <div className="align-left">
    <p>
      City: {weatherData.name}, {weatherData.sys.country}
    </p>
    <p>
      Condtion: {weatherData.weather[0].description}
      <img
        src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
        alt="icon"
      />
    </p>
    <p>Temperature: {weatherData.main.temp} °C</p>
  </div>
);

const TableForecast = ({ forecastData }) => (
  <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell align="right">City</TableCell>
          <TableCell align="right">Temperature °C</TableCell>
          <TableCell align="right">Weather</TableCell>
          <TableCell align="right">Icon</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {forecastData.list.map((list, index) => (
          <TableRow
            key={index}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell component="th" scope="row">
              {list.dt_txt}
            </TableCell>
            <TableCell align="right">
              {forecastData.city.name}, {forecastData.city.country}
            </TableCell>
            <TableCell align="right">{list.main.temp} °C</TableCell>
            <TableCell align="right">{list.weather[0].description}</TableCell>
            <TableCell align="right">
              <img
                src={`https://openweathermap.org/img/wn/${list.weather[0].icon}.png`}
                alt="icon"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);
