import './App.css';
import Search from './components/search/Search';
import Forecast from './components/Forecast';
import Currentweather from './components/current-weather/Current-weather';
import {WEATHER_API_URL, WEATHER_API_KEY} from './api';
import {useState} from 'react';


function App() {

  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

const handleonSearchChange = async (location) => {
  const weatherUrl = `${WEATHER_API_URL}/weather?q=${location}&units=metric&appid=${WEATHER_API_KEY}`
  const forcastUrl = `${WEATHER_API_URL}/forecast?q=${location}&cnt=16&units=metric&appid=${WEATHER_API_KEY}`
  
  const currentWeatherFetch = await fetch(weatherUrl);
  const forcastFetch = await fetch(forcastUrl)

  const forcastData = await forcastFetch.json()
  const weatherData = await currentWeatherFetch.json()
  console.log(forcastData);
 
setCurrentWeather(weatherData)
// console.log(weatherData);
setForecast(forcastData)
}

  return (
    <div className="container">
      <Search onsubmit={handleonSearchChange}/>
      {/* <button onClick={handleonSearchChange}>submit</button> */}
      {currentWeather&&<Currentweather data={currentWeather} />}
      {forecast && <Forecast data={forecast}/>}
    </div>
  );
}

export default App;
 // const forecastFetch = fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`);

// Promise.all([currentWeatherFetch, forecastFetch])
// .then(async (response) => {
//   const weatherResponse = await response[0].json();
//   const forecastResponse = await response[1].json();

//   setCurrentWeather({ city:searchData.label, ...weatherResponse});
//   setForecast({ city:searchData.label, ...forecastResponse});
// })
// .catch((err) => console.log(err))