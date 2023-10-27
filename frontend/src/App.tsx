import { ReactNode, useState } from "react"

import { Navbar, Header } from "./components"
import { NewPartner, AllAddresses } from "./components"
import { CreatePartnerPartial } from "./interfaces"

function App() {
  type Steps = "ALL_PARTNERS" | "NEW_PARTNER" | "ALL_ADDRESSES"
  const [step, setStep] = useState<Steps>("NEW_PARTNER")
  const [partialPartner, setPartialPartner] = useState<CreatePartnerPartial | null>(null)

  const handleStepChange = (newStep: Steps) => {
    setStep(newStep)
  }

  const possibleSteps: Record<Steps, ReactNode> = {
    ALL_PARTNERS: <></>,
    NEW_PARTNER: <NewPartner
      onBack={() => {}}
      onNext={
        (partner: CreatePartnerPartial) => {
          setPartialPartner(partner)
          handleStepChange("ALL_ADDRESSES")
        }
      }
    />,
    ALL_ADDRESSES: <AllAddresses
      partialPartner={partialPartner!}
      onBack={() => {
        handleStepChange("NEW_PARTNER")
      }}
      onNext={() => {}}
    />
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
