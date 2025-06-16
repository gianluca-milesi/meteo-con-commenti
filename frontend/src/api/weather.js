const API_KEY = import.meta.env.VITE_API_KEY


export async function fetchCurrentWeather(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
    if (!response.ok) {
        throw new Error("Errore nel recupero del meteo attuale")
    }
    return await response.json()
}

export async function fetchForecast(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
    if (!response.ok) {
        throw new Error("Errore nel recupero delle previsioni meteo")
    }
    return await response.json()
}