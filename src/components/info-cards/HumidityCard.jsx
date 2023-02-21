import { Drop } from "phosphor-react"

export default function HumidityCard({humidity}) {
    return (
        <div className="flex flex-col bg-white/[.6] rounded-md w-auto h-24">
            <div className="flex justify-center items-center p-2 space-x-2">
                <Drop size={20} color="#0d0c0c" />
                <p className="text-xl">Humidity</p>
            </div>
            <p className="text-center text-3xl w-full font-bold">{humidity} %</p>
        </div>
    )
}