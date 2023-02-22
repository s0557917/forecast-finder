import { getDailyWeather } from "./date-time";
import useJSONFetch from "../hooks/useJSONFetch";
import useSVGFetch from "../hooks/useSVGFetch"

async function fetchCityName(lat, lon) {
    const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${import.meta.env.VITE_WEATHER_API}`
    const data = await useJSONFetch(url)
    if(data !== null && data !== undefined) {
        return data[0].name
    }
}

async function fetchCityCoordinates(city) {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${import.meta.env.VITE_WEATHER_API}`
    const data = await useJSONFetch(url)
    if(data !== null && data !== undefined) {
        return {lat: data[0].lat, lon: data[0].lon}
    } else {
        return null
    }
} 

async function fetchWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
    const data = await useJSONFetch(url)
    if(data !== null && data !== undefined) {
        return data
    }
}

async function fetchForecastWeather(lat, lon) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${import.meta.env.VITE_WEATHER_API}`
    const data = await useJSONFetch(url)
    if(data !== null && data !== undefined) {
        return getDailyWeather(data.list)  
    }
}

async function fetchCountryFlag(country) {
    const url = `https://countryflagsapi.com/svg/${country.toLowerCase()}`
    const data = await useSVGFetch(url)
    if(data !== null && data !== undefined) {
      return data
    }
  }

export {fetchCityName, fetchCityCoordinates, fetchWeather, fetchForecastWeather, fetchCountryFlag}