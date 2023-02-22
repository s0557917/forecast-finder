export default function InfoBlock({title, value, children, unit}) {
    return (
        <div className="flex flex-col bg-white/[.6] rounded-md w-auto h-24 mx-2">
            <div className="flex flex-col md:flex-row justify-center items-center p-2 space-x-2">
                {children}
                <p className="md:text-xl text-[11px]">{title}</p>
            </div>
            <p className="md:text-3xl text-lg text-center w-full font-bold">{value}{unit}</p>
        </div>
    )
}