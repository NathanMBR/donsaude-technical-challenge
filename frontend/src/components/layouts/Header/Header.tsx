import { MagnifyingGlass, PlusCircle } from "@phosphor-icons/react"

const NewServiceButton = () => {
  return (
    <button className="px-4 py-2 flex items-center gap-3 bg-primary-light hover:text-layout-button-hover-text transition-colors duration-200 text-primary rounded-2xl font-semibold text-xs">
      <div>
        <PlusCircle />
      </div>
      <span>Novo atendimento</span>
    </button>
  )
}

export const Header = () => {
  return (
    <header className="flex justify-between px-12 py-6">
      <div className="flex gap-4">
        <NewServiceButton />

        <div className="relative flex items-center">
          <MagnifyingGlass className="absolute ml-3" />

          <input className="pl-10 py-2 flex items-center gap-3 border-solid border border-form-border text-form-field placeholder:text-form-field rounded-2xl text-xs" placeholder="Buscar usuário" />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-8 h-8 bg-form-label rounded-full"></div>
        <div className="w-8 h-8 bg-form-label rounded-full"></div>
        <div className="h-full w-px bg-form-border"></div>
        <div className="w-8 h-8 bg-primary-light rounded-full"></div>
      </div>
    </header>
  )
}
