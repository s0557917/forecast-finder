import { convertDegreesToDirection } from "../utils/unit-convertion"
import HumidityCard from "./info-cards/HumidityCard"
import WindspeedCard from "./info-cards/WindspeedCard"
import WindDirectionCard from "./info-cards/WindDirectionCard"
import InfoBlock from "./InfoBlock"
import { Drop, Wind, Compass } from "phosphor-react"

export default function InfoBlocks({humidity, speed, direction}) {
    return (
        <div className="flex my-5 justify-evenly ">
            <InfoBlock 
                title={"Humidity"} 
                value={humidity}
                unit={"%"}
            >
                <Drop size={20} color="#0d0c0c" />
            </InfoBlock>

            <InfoBlock 
                title={"Wind Speed"} 
                value={speed}
                unit={"m/s"}
            >
                <Wind size={20} color="#0d0c0c" />
            </InfoBlock>

            <InfoBlock 
                title={"Wind Direction"} 
                value={direction}
                unit={""}
            >
                <Compass size={20} color="#0d0c0c" />
            </InfoBlock>            
        </div>
    )
}