//Context
import { useState } from "react"
import GlobalContext from "./contexts/GlobalContext.js"
//Pages
import HomePage from "./pages/HomePage.jsx"


function App() {

  const [city, setCity] = useState("Rome")


  return (
    <GlobalContext.Provider value={{ city, setCity }}>
      <HomePage />
    </GlobalContext.Provider>
  )
}

export default App