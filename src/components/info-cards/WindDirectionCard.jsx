import { Compass } from "phosphor-react"

export default function WindDirectionCard({windDirection}) {
    return (
        <div className="flex flex-col bg-white/[.6] rounded-md w-auto h-24">
            <div className="flex justify-center items-center p-2 space-x-2">
                <Compass size={20} color="#0d0c0c" />
                <p className="text-xl">Wind Direction</p>
            </div>
            <p className="text-center text-3xl w-full font-bold">{windDirection}</p>
        </div>
    )
}