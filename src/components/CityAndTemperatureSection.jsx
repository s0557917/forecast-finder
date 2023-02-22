export default function CityAndTemperatureSection({city, description, temp, feelsLikeTemp, weatherIcon}) {
    return (
        <div className="flex w-full justify-between">
                        
            <div className="flex flex-col z-20">
                <p className="w-auto md:text-7xl text-2xl">{city}</p>
                <p className="w-auto md:text-lg text-sm">{new Date().toDateString()} - {description}</p>
            </div>
            
            <div className="flex w-full items-center justify-end z-20">
                <div className="mr-5">
                    {weatherIcon}
                </div>
                <div className="text-center">
                    <p className="md:text-7xl text-2xl pl-3">{Math.round(temp)}°C</p>
                    <p className="md:text-xl text-sm">Feels like: {Math.round(feelsLikeTemp)}°C</p>
                </div>
            </div>
        </div>
    )
}