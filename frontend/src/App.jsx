//Context
import GlobalContext from "./contexts/GlobalContext.js"
//Hooks
import { useState } from "react"
import { useWeather } from "./hooks/useWeather.js"
import { useComments } from "./hooks/useComments.js"
//Pages
import HomePage from "./pages/HomePage.jsx"


function App() {

  const [city, setCity] = useState("Rome")

  const {
    currentWeather,
    forecast,
    loading: weatherLoading,
    error: weatherError,
  } = useWeather(city)

  const {
    comments,
    loading: commentsLoading,
    error: commentsError,
    addComment,
  } = useComments(city)

  return (
    <GlobalContext.Provider value={{
      city,
      setCity,
      currentWeather,
      forecast,
      weatherLoading,
      weatherError,
      comments,
      commentsLoading,
      commentsError,
      addComment,
    }}>
      <HomePage />
    </GlobalContext.Provider>
  )
}

export default App