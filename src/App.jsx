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
  const [weatherIcon, setWeatherIcon] = useState(<></>)
  const [background, setBackground] = useState("bg-slate-300")
  
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
      setCityInputValue("")

      async function getWeather() {
        const coords = await fetchCityCoordinates(cityInputValue)
  
        if(coords !== null && coords !== undefined) {
          setWeather(await fetchWeather(coords.lat, coords.lon) || {})
          setForecastData(await fetchForecastWeather(coords.lat, coords.lon) || [])
        }
      } 
  
      getWeather()
    }
  }, [debouncedValue])


  useEffect(() => {
    if(!isObjectEmpty(weather)) {
        const {bg, icon} = weatherDisplaySwitch(weather.weather[0].id)
        if(bg !== "" && icon !== <></>) {
          setBackground(bg)
          setWeatherIcon(icon)
        }

    }
  },[weather])

  return (
    <div className="flex items-center justify-center h-screen">
      <div className={`md:w-4/5 w-full md:h-auto h-screen rounded-lg bg-bottom bg-cover box-border ${background}`}>
        <CityInput
          inputValue={cityInputValue} 
          onChange={setCityInputValue}
        />
        <WeatherCard 
          weather={weather}
          weatherIcon={weatherIcon}
          city={city}
          forecastData={forecastData}
        />
      </div>
    </div>
  )
}

export default App
