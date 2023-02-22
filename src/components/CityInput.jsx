export default function CityInput({inputValue, onChange}) {
     return (
        <input
            value={inputValue}
            type={"text"} 
            className={"rounded-md"} 
            onChange={(e) => onChange(e.target.value)}
          ></input>
    )
}