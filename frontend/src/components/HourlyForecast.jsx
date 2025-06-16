//Contexts
import GlobalContext from "../contexts/GlobalContext"
//Hooks
import { useContext } from "react"


function HourlyForecast() {

    const { forecast, forecastLoading, forecastError } = useContext(GlobalContext)

    if (forecastLoading) return <p className="text-light text-sm">Loading forecast...</p>
    if (forecastError) return <p className="text-red-500 text-sm">{forecastError}</p>
    if (!forecast) return null

    const now = new Date()
    const today = now.toISOString().split("T")[0]
    const todayForecasts = forecast.list.filter(f => {
        const forecastDate = new Date(f.dt_txt)
        const isToday = f.dt_txt.startsWith(today)
        return isToday && forecastDate >= now
    })

    return (
        <div className="flex gap-2">
            {todayForecasts.map((f, i) => {
                const hour = new Date(f.dt_txt).toLocaleTimeString("it-IT", {
                    hour: "2-digit",
                    minute: "2-digit"
                })
                const temperature = Math.round(f.main.temp)
                const icon = f.weather[0].icon
                const description = f.weather[0].description

                return (
                    <div key={i} className="min-w-[80px] flex flex-col items-center justify-center secondary-color p-2 rounded-lg shadow-md">
                        <p className="text-xs text-lighter">{hour}</p>
                        <img
                            src={`https://openweathermap.org/img/wn/${icon}.png`}
                            alt={description}
                        />
                        <p className="text-sm font-semibold">{temperature}°C</p>
                    </div>
                )
            })}
        </div>
    )
}

export default HourlyForecast