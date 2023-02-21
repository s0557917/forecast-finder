import checkIfObjectIsEmpty from "../utils/helpers"
import ForecastSection from "./ForecastSection"
import { convertDegreesToDirection } from "../utils/unit-convertion"
import HumidityCard from "./info-cards/HumidityCard"
import WindspeedCard from "./info-cards/WindspeedCard"
import WindDirectionCard from "./info-cards/WindDirectionCard"

export default function WeatherCard({weather, city, weatherLogo, forecastData}) {
    
    return(
        <>
            {!checkIfObjectIsEmpty(weather) &&
                <div className="p-7">
                    <div className="bg-white/[.10] z-10 rounded-lg absolute top-0 bottom-0 left-0 right-0"></div>
                    <div className="flex w-full items-center justify-between">
                    
                        <div className="flex flex-col z-20">
                            <p className="w-auto text-7xl">{city}</p>
                            <p className="w-auto text-lg">{new Date().toDateString()} - {weather.weather[0].description}</p>
                        </div>
                        
                        <div className="flex w-auto items-center z-20">
                            <div className="mr-5">
                                {weatherLogo}
                            </div>
                            <div className="text-center">
                                <p className="text-7xl pl-3">{Math.round(weather.main.temp)}°C</p>
                                <p className="text-xl">Feels like: {Math.round(weather.main.feels_like)}°C</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex my-5 justify-evenly">
                        <HumidityCard humidity={weather.main.humidity}/>
                        <WindspeedCard windSpeed={weather.wind.speed}/>
                        <WindDirectionCard windDirection={convertDegreesToDirection(weather.wind.deg)}/>
                    </div>

                    <ForecastSection forecastData={forecastData}/>
                </div>
            }
        </>
    )
}