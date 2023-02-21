import { useEffect, useState } from "react"
import WeatherCard from "./components/WeatherCard"
import SunnyIcon from "./components/icons/ClearIcon"
import CloudyIcon from "./components/icons/CloudyIcon";
import StormIcon from "./components/icons/StormIcon";
import RainCloud from "./components/icons/RainIcon";
import SnowIcon from "./components/icons/SnowIcon"
import checkIfObjectIsEmpty from "./utils/helpers"

import { fetchData } from "./utils/fetch";

import useDebounce from "./hooks/useDebounce";

function App() {
  
  const [weather, setWeather] = useState({})
  const [city, setCity] = useState("")
  const [weatherLogo, setWeatherLogo] = useState(<></>)
  const [background, setBackground] = useState("bg-slate-300")
  const [countries, setCountries] = useState([])
  
  const debouncedValue = useDebounce(city, 500)

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
        setBackground("bg-rainy")
        setWeatherLogo(<RainCloud />)
      } else if(weatherId > 600 && weatherId < 700) {
        setBackground("bg-rainy")
        setWeatherLogo(<SnowIcon />)
      }
  }

  async function fetchCityCoordinates() {
    try{
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API}`
      const response = await fetch(url)
      const data = await response.json()
      return {lat: data[0].lat, lon: data[0].lon}
    } catch(error) {
      console.log("Error: ", error)
      return null
    }
  } 

  async function fetchWeatherAPI(lat, lon) {
    
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
      const response = await fetch(url)
      const data = await response.json()
      console.log("DATA: ", data)
      setWeather(data)
    } catch(error) {
      console.log("Error: ", error)
    }
  }
  
  useEffect(() => {
    async function getUserCoordinates() {
      navigator.geolocation.getCurrentPosition((position) => {
        fetchWeatherAPI(position.coords.latitude, position.coords.longitude)
      });
    }

    getUserCoordinates()
  }, [])

  useEffect(() => {
    if(city !== "") {
      async function getWeather() {
        const coords = await fetchCityCoordinates()
  
        if(coords !== null && coords !== undefined) {
          fetchWeatherAPI(coords.lat, coords.lon)
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
      <div className="flex w-2/5 my-2 justify-between">
        <input 
          type={"text"} 
          className={"w-3/5 rounded-md left-1/2 z-50"} 
          onChange={(e) => setCity(e.target.value)}
        ></input>
        <button 
          className="w-1/5 bg-slate-100 rounded-md " 
          // onClick={}
        >
          Search
        </button>
      </div>

      <div className={`w-2/5 h-4/5 rounded-lg bg-bottom bg-cover relative ${background}`}>
        <WeatherCard 
          weather={weather}
          weatherLogo={weatherLogo}
          city={city}
        />
      </div>
    </div>
  )
}

export default App
