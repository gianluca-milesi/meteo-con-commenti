//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useContext } from "react"


function WeatherCard() {

    const { weather, city, setCity } = useContext(GlobalContext)

    //Per ora città a mano
    const cities = ["Rome", "Milan", "Naples", "Turin", "Florence", "Bologna", "Venice", "Palermo"]

    if (!weather) return null
    const { name, main, weather: weatherDetails } = weather
    const temperature = Math.round(main.temp)
    const description = weatherDetails[0].description
    const icon = weatherDetails[0].icon


    return (
        <div className="flex items-center justify-center gap-4">
            <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="py-1 px-3 secondary-color font-semibold rounded-md shadow-md"
            >
                {cities.map((c) => (
                    <option key={c} value={c}>
                        {c}
                    </option>
                ))}
            </select>

            <div className="flex items-center">
                <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    alt={description}
                    className="w-20 h-20"
                />
                <div className="flex items-center gap-2">
                    <p className="text-xl font-medium">{temperature}°C</p>
                    <p className="text-sm capitalize">{description}</p>
                </div>
            </div>
        </div>
    )
}

export default WeatherCard