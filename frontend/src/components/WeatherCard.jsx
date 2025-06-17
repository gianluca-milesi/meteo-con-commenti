//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useContext } from "react"
//Components
import HourlyForecast from "./HourlyForecast"


function WeatherCard() {

    const { currentWeather, city, setCity, weatherLoading, weatherError } = useContext(GlobalContext)

    //Per ora città a mano
    const cities = ["Rome", "Milan", "Naples", "Turin", "Florence", "Bologna", "Venice", "Palermo", "Mosca"]

    if (weatherLoading) return <p className="text-light">Loading weather...</p>
    if (weatherError) return <p className="text-red-500">{weatherError}</p>
    if (!currentWeather) return null

    const { main, weather: weatherDetails } = currentWeather
    if (!weatherDetails?.[0]) {
        return <p className="text-light">Dettagli meteo non disponibili</p>
    }
    const temperature = Math.round(main.temp)
    const description = weatherDetails[0].description
    const icon = weatherDetails[0].icon
    const currentTime = new Date();
    const formattedTime = currentTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });


    return (
        <div className="flex flex-col gap-2 min-w-max">
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
            <div className="flex flex-col items-center gap-2">
                <div className="w-full secondary-color p-2 rounded-lg shadow-md">
                    <p className="text-xs text-lighter text-center font-semibold">Current ({formattedTime})</p>
                    <div className="flex items-center">
                        <img
                            src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
                            alt={description}
                            className="w-[50px] h-[50px] object-contain"
                        />                        <div className="flex flex-col">
                            <p className="text-xl text-black font-semibold">{temperature}°C</p>
                            <p className="text-xs text-lighter italic">{description}</p>
                        </div>
                    </div>
                </div>
                <HourlyForecast />
            </div>

        </div>
    )
}

export default WeatherCard