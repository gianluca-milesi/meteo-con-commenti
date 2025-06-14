//Context
import { useEffect, useState } from "react"
import GlobalContext from "./contexts/GlobalContext.js"
//Pages
import HomePage from "./pages/HomePage.jsx"
//Environment
const API_KEY = import.meta.env.VITE_API_KEY


function App() {

  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [comments, setComments] = useState([])
  const [city, setCity] = useState("Rome")

  async function fetchWeather() {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      if (!response.ok) {
        throw new Error("Errore nel recupero del meteo")
      }
      const data = await response.json()
      setWeather(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchForecast(city) {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
      if (!response.ok) {
        throw new Error("Errore nel recupero delle previsioni meteo")
      }
      const data = await response.json()
      setForecast(data)
    } catch (err) {
      console.error(err)
    }
  }

  async function fetchComments() {
    try {
      const response = await fetch(`http://localhost:3000/api/comments?city=${city}`)
      if (!response.ok) {
        throw new Error("Errore nel recupero dei commenti")
      }
      const data = await response.json()
      setComments(data)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchWeather()
    fetchForecast(city)
    fetchComments()
  }, [city])


  return (
    <GlobalContext.Provider value={{
      weather, setWeather,
      forecast, fetchForecast,
      comments, setComments, fetchComments,
      city, setCity,
    }}>
      <HomePage />
    </GlobalContext.Provider>
  )
}

export default App