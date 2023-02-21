import { Wind } from "phosphor-react"

export default function WindspeedCard({windSpeed}) {
    return (
        <div className="flex flex-col bg-white/[.6] rounded-md w-auto h-24">
            <div className="flex justify-center items-center p-2 space-x-2">
                <Wind size={20} color="#0d0c0c" />
                <p className="text-xl">Wind Speed</p>
            </div>
            <p className="text-center text-3xl w-full font-bold">{windSpeed} m/s</p>
        </div>
    )
}