import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {



  const [latLon, setLatLon] = useState({})
  const [weather, setWeather] = useState({})
  const [first, setFirst] = useState(true)

  useEffect(() => {

    const success = pos => {
      console.log(pos.coords)
      const lat = pos.coords.latitude
      const lon = pos.coords.longitude
      setLatLon({lat, lon})
    }

    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect (() => {
    if(latLon.lat !== undefined){

      const API_KEY = '5de68c20a454e0f7b0552e106b624d2e';
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}`;
      
      axios.get(URL)
        .then(res => setWeather(res.data))
        .catch(err => console.log(err))
    }
  },[latLon])

  console.log(weather);

  let celsius = weather?.main?.temp - 273.15;
  let celsiusGrade = celsius.toFixed(2);
  let fahrenheit = celsius * 1.8 + 32;
  let fahrenheitGrade = fahrenheit.toFixed(2);


  return (
    <div className="App">
      <div className='Card'>
        <h1>Wheather App</h1>
      
        <ul>
          <li>
            {`${weather.name}`}, {`${weather.sys?.country}`}
          </li>

          <li><b>Temperature: </b>{ first ? `${celsiusGrade}°C` : `${fahrenheitGrade}°F`}</li>
          
          <li>
            <div>
            <img src={weather && `http://openweathermap.org/img/wn/${weather.weather?.[0].icon}@2x.png`} alt="Icon-Weather-Condition"/>
            </div>
            <div>
            {`${weather.weather?.[0].description}`}
            </div>
          </li>

          <li><b>Wind Speed: </b>{`${weather.wind?.speed}`}m/s</li>
          
          <li><b>Clouds: </b>{`${weather.clouds?.all}`}%</li>
          
          <li><b>Pressure: </b>{`${weather.clouds?.all}`}mb</li>

          <li><b>Humidity: </b>{`${weather.main?.humidity}`}%</li>
        
        </ul>

        <div>
          <button className='change-unit' onClick={() => setFirst(!first)}>Degress °F/°C</button>
        </div>

      </div>
    </div>
  )
}

export default App
