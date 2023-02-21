import { useEffect, useState } from "react"

export default function ForecastSection({forecastData}) {
    
    const [forecastHTML, setforecastHTML] = useState([]);
    const options = { weekday: "long" };

    const generateHTML = () => {
        if(forecastData !== undefined && forecastData.size > 0) {
            const html = []
            forecastData.forEach((value, key) => {
                const date = new Date(key)
                const weekDay = new Intl.DateTimeFormat("en-US", options).format(date)

                html.push(
                    <div className="bg-white/[.6] m-2 p-2 rounded-md h-auto w-1/6">
                        <p className="text-sm mb-2 font-bold text-center">{weekDay}</p>
                        <ul className="space-y-1">
                            {value.map((fc) => {
                                return <li className="text-xs justify-between w-auto flex" key={fc.time}>
                                    <p>{`${fc.time.split(":", 2).join(":")}`}</p>
                                    <p>{`${Math.round(fc.forecast.temp)}°C`}</p>
                                </li>
                            })}
                        </ul>
                    </div>
                )
            })

            setforecastHTML(html)
        }
    }

    useEffect(() => {
        generateHTML()
    }, [forecastData])

    return(
        <div className="flex w-full justify-between p-2">
            {forecastHTML}
        </div>
    )
}