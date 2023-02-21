import checkIfObjectIsEmpty from "../utils/helpers"

export default function WeatherCard({weather, city, weatherLogo}) {
    return(
        <>
            {!checkIfObjectIsEmpty(weather) &&
                <>
                    <div className="bg-white/[.20] z-10 rounded-lg absolute top-0 bottom-0 left-0 right-0"></div>
                    <div className="flex w-full items-center px-4 py-3 justify-between">
                    
                        <p className="w-auto text-5xl z-20">{city}</p>
                        
                        <div className="flex w-auto items-center z-20">
                            {weatherLogo}
                            <p className="text-6xl pl-3">{weather.main.temp}°C</p>
                        </div>
                    </div>

                    <div>
                        <p>Weather: {weather.weather[0].main}</p>
                        <p>Feels like: {weather.main.feels_like}°C</p>
                        <p>Humidity: {weather.main.humidity}%</p>
                        <p>Wind Speed: {weather.wind.speed} m/s</p>
                        <p>Wind Direction: {weather.wind.deg}°</p>
                    </div>
                </>
            }
        </>
    )
}