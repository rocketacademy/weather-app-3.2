// import logo from "/logo.png";
import "./App.css";

import Weather from "./Weather"

function App() {
  return (
    <>
      {/* <div>
        <img src={logo} className="logo react" alt="Rocket logo" />
      </div> */}
      <div className="card">
        <Weather />
      </div>
    </>
  );
}

export default App;
