import { ReactNode, useState } from "react"

import { Navbar, Header } from "./components"
import { NewPartner } from "./components"

function App() {
  type Steps = "ALL_PARTNERS" | "NEW_PARTNER" | "ALL_ADDRESSES"
  const [step, setStep] = useState<Steps>("NEW_PARTNER")

  const _handleStepChange = (newStep: Steps) => {
    setStep(newStep)
  }

  const possibleSteps: Record<Steps, ReactNode> = {
    ALL_PARTNERS: <></>,
    NEW_PARTNER: <NewPartner />,
    ALL_ADDRESSES: <></>
  }

  return (
    <div className="flex min-h-screen">
      <Navbar />
      <div className="flex flex-col w-full">
        <Header />

        {
          possibleSteps[step]
        }
      </div>
    </div>
  )
}

export default App
