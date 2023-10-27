import { IconContext } from "@phosphor-icons/react"

import { Navbar, Header } from "./components"
import { NewPartner } from "./components"

function App() {
  return (
    <div className="flex h-screen w-screen">
      <IconContext.Provider value={{ size: 20 }}>
        <Navbar />
        <div className="w-full">
          <Header />

          <NewPartner />
        </div>
      </IconContext.Provider>
    </div>
  )
}

export default App
