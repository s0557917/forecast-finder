export function getDailyWeather(forecast) {   
    if(forecast !== null && forecast !== undefined && forecast.length > 0) {
        const weatherMap = new Map()

        forecast.forEach((currForecast) => {
            const [currDate, currTime] = currForecast.dt_txt.split(" ")
                const weatherArray = (weatherMap.get(currDate) !== undefined && weatherMap.get(currDate).length > 0) 
                    ? weatherMap.get(currDate) 
                    : []

                const forecastAndTime = {time: currTime, forecast: currForecast.main}
                weatherMap.set(currDate, [...weatherArray, forecastAndTime])
        })

        return weatherMap
    }
}