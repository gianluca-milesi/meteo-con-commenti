//Api
import { fetchCurrentWeather, fetchForecast } from "../api/weather.js"
//Hooks
import { useState, useEffect } from "react"


export function useWeather(city) {
    const [currentWeather, setCurrentWeather] = useState(null)
    const [forecast, setForecast] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchData() {
        setLoading(true)
        setError(false)

        try {
            const [w, f] = await Promise.all([
                fetchCurrentWeather(city),
                fetchForecast(city)
            ])
            setCurrentWeather(w)
            setForecast(f)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [city])

    return { currentWeather, forecast, loading, error }
}