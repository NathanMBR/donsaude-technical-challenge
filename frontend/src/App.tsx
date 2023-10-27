import { Navbar, Header } from "./components"
import { NewPartner } from "./components"

function App() {
  return (
    <div className="flex h-screen w-screen">
      <Navbar />
      <div className="w-full">
        <Header />

        <NewPartner />
      </div>
    </div>
  )
}

export default App
