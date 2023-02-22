export default function CityInput({onChange}) {
    return (
        <input 
            type={"text"} 
            className={"rounded-md"} 
            onChange={(e) => onChange(e.target.value)}
          ></input>
    )
}