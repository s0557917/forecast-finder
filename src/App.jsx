import { useEffect, useState } from "react"
import WeatherCard from "./components/WeatherCard"
import isObjectEmpty from "./utils/helpers"
import countryCityList from "./data/country-city-list"; 
import CityInput from "./components/CityInput";
import { weatherDisplaySwitch } from "./utils/weather-display-switch";
import {fetchCityName, fetchCityCoordinates, fetchWeather, fetchForecastWeather, fetchCountryFlag} from "./utils/fetchFunctions"

import useDebounce from "./hooks/useDebounce";

function App() {
  
  const [weather, setWeather] = useState({})
  const [forecastData, setForecastData] = useState([])
  const [city, setCity] = useState("")
  const [cityInputValue, setCityInputValue] = useState("")
  const [weatherLogo, setWeatherLogo] = useState(<></>)
  const [background, setBackground] = useState("bg-slate-300")
  const [countries, setCountries] = useState([])

  const [flag, setFlag] = useState(<h1>Flag</h1>)
  
  const debouncedValue = useDebounce(cityInputValue, 500)

  useEffect(() => {
    async function getUserCoordinates() {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        setCity(await fetchCityName(lat, lon) || "")
        setWeather(await fetchWeather(lat, lon) || {})
        setForecastData(await fetchForecastWeather(lat, lon) || [])
      })
    }

    getUserCoordinates()
  }, [])

  useEffect(() => {
    if(cityInputValue !== "") {
      setCity(cityInputValue)
      
      // async function checkCityAndGetFlag() {
      //   let city = ""
      //   let land = ""
  
      //   for (const [key, value] of Object.entries(countryCityList)) {
      //     const matchingCity = value.find((city) => city.toLowerCase() === cityInputValue.toLowerCase())
      //     if(matchingCity !== undefined) {
      //       city = matchingCity
      //       land = key
  
      //       // await fetchCountryFlag(land)
      //       break
      //     } 
      //   }
      // }

      async function getWeather() {
        const coords = await fetchCityCoordinates(cityInputValue)
  
        if(coords !== null && coords !== undefined) {
          setWeather(await fetchWeather(coords.lat, coords.lon) || {})
          setForecastData(await fetchForecastWeather(coords.lat, coords.lon) || [])
        }
      } 
  
      checkCityAndGetFlag()
      getWeather()
    }
  }, [debouncedValue])


  useEffect(() => {
    if(!isObjectEmpty(weather)) {
        const {bg, icon} = weatherDisplaySwitch(weather.weather[0].id)
        if(bg !== "" && icon !== <></>) {
          setBackground(bg)
          setWeatherLogo(icon)
        }

    }
  },[weather])
  


  return (
    <div className="w-screen h-screen flex justify-center items-center bg-red-400">

      <CityInput onChange={setCityInputValue}/>
      <div className={`w-4/5 rounded-lg bg-bottom bg-cover relative ${background} box-border`}>
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
