import axios from "axios";
import useSWR from "swr";

const API_KEY = import.meta.env.VITE_API_KEY;

export default function Weather({ city }) {
  const fetcher = async (url) => (await axios.get(url)).data;
  const { data, error, isLoading } = useSWR(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
    fetcher
  );

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
const ErrorMessage = ({ error }) => <code>{error} </code>;
const DataMessage = ({ data }) => <code>{JSON.stringify(data)} </code>;
