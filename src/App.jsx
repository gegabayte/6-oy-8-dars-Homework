import React, { useState } from "react";
import './App.css'

function Card({ city, temperature, description }) {
  return (
    <div className=" my-4 card shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="card-body">
        <div className="team d-flex justify-content-center flex-wrap">
          <h5 style={{fontSize: '15px'}} className="card-title mx-5">Shahar: <span style={{fontSize: '12px', color: 'lightgrey'}}>{city}</span></h5>
          <p style={{fontSize: '15px'}} className="card-text">Harorat: <span style={{fontSize: '12px', color: 'red'}}>{temperature}</span><span style={{color: 'blue',fontSize: '12px'}}>°C</span></p>
        </div>
        <p style={{color: '#240A34', fontSize: '15px'}} className="card-text text-center mt-5">Brief information : { <span style={{color: '#124076', fontSize: '12px'}}>{description}</span>}</p>
      </div>
    </div>
  );
}

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  const fetchWeatherData = () => {
    const apiKey = "YOUR_API_KEY";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=dallas&appid=895284fb2d2c50a520ea537456963d9c`;

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          description: data.weather[0].description,
        });
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError("City not found");
        setWeatherData(null);
      });
  };

  return (
    <div className="container mt-5 mx-auto shadow p-3 mb-5 bg-body-tertiary rounded">
      <h1 className="text-center mt-4 mb-5">Weather</h1>
      <form className="w-50 mx-auto" onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter City Name"
            value={city}
            onChange={handleChange}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </form>
      {weatherData && (
        <div className="row justify-content-center">
          <div className="col-md-6">
            <Card
              city={weatherData.city}
              temperature={weatherData.temperature}
              description={weatherData.description}
            />
          </div>
        </div>
      )}
      {error && <p className="text-danger">{error}</p>}
    </div>
  );
}

export default App;