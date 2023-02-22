import { useEffect, useState } from "react"
import ForecastBlock from "./ForecastBlock";

export default function ForecastSection({forecastData}) {
    
    const [forecastHTML, setforecastHTML] = useState([]);
    const options = { weekday: "long" };

    function generateHTML() {
        if(forecastData !== undefined && forecastData.size > 0) {
            const html = []
            forecastData.forEach((dailyForecasts, forecastDate) => {
                const date = new Date(forecastDate)
                const weekDay = new Intl.DateTimeFormat("en-US", options).format(date)

                html.push(
                    <ForecastBlock 
                        key={date}
                        weekDay={weekDay}
                        dailyForecast={dailyForecasts}
                    />
                )
            })

            setforecastHTML(html)
        }
    }

    useEffect(() => {
        generateHTML()
    }, [forecastData])

    return(
        <div className="flex flex-col items-center w-full p-2 md:justify-between md:flex-row md:h-auto">
            {forecastHTML}
        </div>
    )
}