import { useState, useEffect } from "react"
const API_KEY = import.meta.env.VITE_API_KEY
const CITY = "Roma"

function WeatherCard() {

    const [weather, setWeather] = useState(null)

    async function fetchWeather() {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric&lang=it`)
            if (!response.ok) {
                throw new Error("Errore nel recupero dei dati meteo")
            }
            const data = await response.json()
            setWeather(data)
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchWeather()
    }, [])

    if (!weather) return null
    const { name, main, weather: weatherDetails } = weather
    const temperature = Math.round(main.temp)
    const description = weatherDetails[0].description
    const icon = weatherDetails[0].icon


    return (
        <div className="flex flex-col items-center justify-center text-center space-y-2">
            <h2 className="text-2xl font-semibold">{name}</h2>
            <img
                src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                alt={description}
                className="w-20 h-20"
            />
            <p className="text-xl font-medium">{temperature}°C</p>
            <p className="text-sm capitalize">{description}</p>
        </div>
    )
}

export default WeatherCard