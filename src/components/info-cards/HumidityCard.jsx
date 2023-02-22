import { Drop } from "phosphor-react"

export default function HumidityCard({humidity}) {
    return (
        <div className="flex flex-col bg-white/[.6] rounded-md w-auto md:h-24 h-20 mx-2">
            <div className="flex justify-center items-center p-2 space-x-2">
                <Drop size={20} color="#0d0c0c" />
                <p className="md:text-xl text-sm">Humidity</p>
            </div>
            <p className="md:text-3xl text-xl text-center w-full font-bold">{humidity} %</p>
        </div>
    )
}