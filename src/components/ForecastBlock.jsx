export default function ForecastBlock({weekDay, dailyForecast}) {
    return (
        <div className="bg-white/[.6] m-2 p-2 rounded-md md:h-52 h-auto md:w-1/6 w-4/6">
            <p className="text-lg md:text-sm mb-2 font-bold text-center">{weekDay}</p>
            <ul className="space-y-1">
                {dailyForecast.map((forecast) => {
                    return <li 
                        className="text-base md:text-xs justify-between w-auto flex" 
                        key={forecast.time}
                    >
                        <p>{`${forecast.time.split(":", 2).join(":")}`}</p>
                        <p>{`${Math.round(forecast.forecast.temp)}°C`}</p>
                    </li>
                })}
            </ul>
        </div>
    )
}