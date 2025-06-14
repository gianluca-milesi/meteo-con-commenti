//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useContext } from "react"
//Components
import HourlyForecast from "./HourlyForecast"


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
        <div className="flex gap-2 min-w-max">
            <div className="flex items-center gap-2">
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
                <div className="min-w-[80px] flex flex-col items-center justify-center secondary-color p-2 rounded-lg shadow-md">
                    <p className="text-xs text-lighter">Now</p>
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={description}
                        className="w-[50px] h-[50px]"
                    />
                    <p className="text-sm font-semibold">{temperature}°C</p>
                </div>
            </div>

            <HourlyForecast />
        </div>
    )
}

export default WeatherCard