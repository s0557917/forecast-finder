import SunnyIcon from "../components/icons/ClearIcon"
import CloudyIcon from "../components/icons/CloudyIcon";
import StormIcon from "../components/icons/StormIcon";
import RainCloud from "../components/icons/RainIcon";
import SnowIcon from "../components/icons/SnowIcon"

export const weatherDisplaySwitch = (weatherId) => {
    
    let bg = ""
    let icon = <></>

    if(weatherId === 800) {
        bg = "bg-clear"
        icon = <SunnyIcon />
    } else if(weatherId > 800 && weatherId < 900) {
        bg = "bg-cloudy"
        icon = <CloudyIcon />
    } else if(weatherId >= 200 && weatherId < 300) {
        bg = "bg-storm"
        icon = <StormIcon />
    } else if((weatherId >= 300  && weatherId < 400) || (weatherId >= 500  && weatherId < 600)) {
        console.log("IT WAS RAIN")
        bg = "bg-rain"
        icon = <RainCloud />
    } else if(weatherId >= 600 && weatherId < 700) {
        bg = "bg-rain"
        icon = <SnowIcon />
    }

    return {bg, icon}
}