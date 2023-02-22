import isObjectEmpty from "../utils/helpers"
import ForecastSection from "./ForecastSection"
import InfoBlocks from "./InfoBlocks"
import CityAndTemperatureSection from "./CityAndTemperatureSection"
import { convertDegreesToDirection } from "../utils/unit-convertion"

export default function WeatherCard({weather, city, weatherIcon, forecastData}) {
    
    return(
        <>
            {!isObjectEmpty(weather) &&
                <div className="p-7 h-full">
                    {/* <div className="bg-white/[.10] z-10 rounded-lg absolute top-0 bottom-0 left-0 right-0"></div> */}
                    <CityAndTemperatureSection 
                        city={city}
                        description={weather.weather[0].description}
                        weatherIcon={weatherIcon}
                        temp={weather.main.temp}
                        feelsLikeTemp={weather.main.feels_like}
                    />

                    <InfoBlocks 
                        humidity={weather.main.humidity} 
                        speed={weather.wind.speed} 
                        direction={convertDegreesToDirection(weather.wind.deg)}
                    />
                    <ForecastSection forecastData={forecastData}/>
                </div>
            }
        </>
    )
}