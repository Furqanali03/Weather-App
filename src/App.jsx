import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null); // Data state
  const [city, setCity] = useState(''); // Default city
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://api.weatherapi.com/v1/current.json?key=b4db485d7c4c485fa6d84351232508&q=${city}&aqi=no` // API URL
        );
        setData(res.data); // Set weather data
        setError(null); // Reset any previous errors
      } catch (err) {
        console.error('Error fetching the weather data', err);
        setError('No data found !');
      } finally {
        setLoading(false); // Turn off loading
      }
    }
    getData();
  }, [city]); // Dependency array to refetch data when city changes

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const getBackgroundImage = (condition) => {
    switch (condition) {
      case 'Sunny':
        return 'url(https://images.pexels.com/photos/15030605/pexels-photo-15030605/free-photo-of-sunrise.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
      case 'Cloudy':
        return 'url(https://images.pexels.com/photos/231008/pexels-photo-231008.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
      case 'Rainy':
        return 'url(https://images.pexels.com/photos/27402577/pexels-photo-27402577/free-photo-of-rainy-night-city-lights.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
      // Add more cases as needed
      default:
        return 'url(https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)';
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${getBackgroundImage(data?.current.condition.text)})` }}>
      <div className="container">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Shehar ka naam daalein"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={() => setCity(city)}>Get Weather</button>
        
        {loading && <h2>Loading...</h2>}

        {error && <h2>{error}</h2>}

        {data && !loading && (
          <div className="weather-info">
            <h2>{data.location.name}, {data.location.country}</h2>
            <img src={data.current.condition.icon} alt={data.current.condition.text} />
            <h3>{Math.round(data.current.temp_c)}°C</h3>
            <p>{data.current.condition.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
