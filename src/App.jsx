import { useEffect, useState } from "react"
import WeatherCard from "./components/WeatherCard"
import SunnyIcon from "./components/icons/ClearIcon"
import CloudyIcon from "./components/icons/CloudyIcon";
import StormIcon from "./components/icons/StormIcon";
import RainCloud from "./components/icons/RainIcon";
import SnowIcon from "./components/icons/SnowIcon"
import checkIfObjectIsEmpty from "./utils/helpers"
import { getDailyWeather } from "./utils/date-time";

import { fetchData } from "./utils/fetch";

import useDebounce from "./hooks/useDebounce";

function App() {
  
  const [weather, setWeather] = useState({})
  const [forecastData, setForecastData] = useState([])
  const [city, setCity] = useState("")
  const [cityInputValue, setCityInputValue] = useState("")
  const [weatherLogo, setWeatherLogo] = useState(<></>)
  const [background, setBackground] = useState("bg-slate-300")
  const [countries, setCountries] = useState([])
  
  const debouncedValue = useDebounce(cityInputValue, 500)

  const switchIcon = () => {
      const weatherId = weather.weather[0].id

      if(weatherId === 800) {
        setBackground("bg-clear")
        setWeatherLogo(<SunnyIcon />)
      } else if(weatherId > 800 && weatherId < 900) {
        setBackground("bg-cloudy")
        setWeatherLogo(<CloudyIcon />)
      } else if(weatherId > 200 && weatherId < 300) {
        setBackground("bg-stormy")
        setWeatherLogo(<StormIcon />)
      } else if(weatherId > 300  && weatherId < 400 || weatherId > 500  && weatherId < 600) {
        setBackground("bg-rain")
        setWeatherLogo(<RainCloud />)
      } else if(weatherId > 600 && weatherId < 700) {
        setBackground("bg-rain")
        setWeatherLogo(<SnowIcon />)
      }
  }

  async function fetchCityName(lat, lon) {
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_WEATHER_API}`
    const data = await fetchData(url)
    if(data !== null && data !== undefined) {
      setCity(data[0].name)
    }
  }

  async function fetchCityCoordinates(city) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API}`
    const data = await fetchData(url)
    if(data !== null && data !== undefined) {
      return {lat: data[0].lat, lon: data[0].lon}
    } else {
      return null
    }
  } 

  async function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
    const data = await fetchData(url)
    if(data !== null && data !== undefined) {
      setWeather(data)
    }
  }

  async function fetchForecastWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
    const data = await fetchData(url)
    if(data !== null && data !== undefined) {
      const dailyForecastData = getDailyWeather(data.list)
      setForecastData(dailyForecastData)
    }
  }
  
  useEffect(() => {
    async function getUserCoordinates() {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        fetchCityName(lat, lon)
        fetchWeather(lat, lon)
        fetchForecastWeather(lat, lon)
      });
    }

    getUserCoordinates()
  }, [])

  useEffect(() => {
    if(cityInputValue !== "") {
      setCity(cityInputValue)
      async function getWeather() {
        const coords = await fetchCityCoordinates(cityInputValue)
  
        if(coords !== null && coords !== undefined) {
          fetchWeather(coords.lat, coords.lon)
          fetchForecastWeather(coords.lat, coords.lon)
        }
      } 
  
      getWeather()
    }
  }, [debouncedValue])
  

  // useEffect(() => {
  //   async function fetchCountries() {
  //     const url = `http://battuta.medunes.net/api/country/all/?key=${import.meta.env.VITE_CITY_API}`
  //     const options = {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Access-Control-Allow-Origin': '*'
  //       }
  //     }
  //     const response = await fetch(url, options)
  //     const data = await response.json()
  //     console.log("COUNTRIES", data)
  //     setCountries(data)
  //   }

  //   fetchCountries()
  // }, [])


  useEffect(() => {
    if(!checkIfObjectIsEmpty(weather)) {
        switchIcon()
    }
  },[weather])
  


  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="flex w-4/5 my-2 justify-between">
        <input 
          type={"text"} 
          className={"w-3/5 rounded-md left-1/2 z-50"} 
          onChange={(e) => setCityInputValue(e.target.value)}
        ></input>
      </div>

      <div className={`w-4/5 h-4/5 rounded-lg bg-bottom bg-cover relative ${background}`}>
        <WeatherCard 
          weather={weather}
          weatherLogo={weatherLogo}
          city={city}
          forecastData={forecastData}
        />
      </div>
    </div>
  )
}

export default App
