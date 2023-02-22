import { MagnifyingGlass } from "phosphor-react"

export default function CityInput({inputValue, onChange}) {
     return (
      <div className="flex justify-center m-2">
        <div>
          <MagnifyingGlass 
            size={30} 
            color="#0d0c0c" 
            className="bg-white/[.6] rounded-l-md p-1"
          />
        </div>
        
        <input
            value={inputValue}
            type={"text"} 
            className={"rounded-r-md w-full bg-white/[.6]"} 
            onChange={(e) => onChange(e.target.value)}
        ></input>
      </div>
    )
}