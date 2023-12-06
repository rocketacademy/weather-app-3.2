import axios from "axios";
import { useEffect, useState } from "react";
// import useSWR from "swr";

const API_KEY = import.meta.env.VITE_API_KEY;
const units = "metric";

export default function Weather({ city }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = () =>
      axios
        .get(
          `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        )
        .then((locationResponse) => {
          // const lat = locationResponse.data[0].lat;
          // const lon = locationResponse.data[0].lon;
          const { lat, lon } = locationResponse.data[0];
          return axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
          );
        })
        .then((weatherResponse) => setData(weatherResponse))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
    fetchData();
  }, [city]);

  // const { data, error, isLoading } = useSWR(city, async () => {
  //   const locationResponse = await axios.get(
  //     `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  //   );

  //   const { lat, lon } = locationResponse.data[0];

  //   const weatherResponse = await axios.get(
  //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
  //   );
  //   console.log(weatherResponse.data);
  //   return weatherResponse.data;
  // });

  return (
    <>
      <div>DATA HERE!</div>
      {isLoading && <LoadingMessage />}
      {error && <ErrorMessage error={error} />}
      {data && <DataMessage data={data} />}
    </>
  );
}

const LoadingMessage = () => <code>Loading...</code>;
const ErrorMessage = ({ error }) => <code>{error}</code>;
const DataMessage = ({ data }) => <code>{JSON.stringify(data, null, 2)}</code>;
