export const Header = () => {
  return (
    <header className="flex justify-between px-12 py-6">
      <div className="flex gap-4">
        <button className="px-4 py-2 flex items-center gap-3 bg-primary-light hover:text-layout-button-hover-text transition-colors duration-200 text-primary rounded-2xl font-semibold text-xs">
          <div className="w-5 h-5 bg-primary"></div>
          <span>Novo atendimento</span>
        </button>

      <div className="relative">
        <input className="pl-10 py-2 flex items-center gap-3 border-solid border border-form-border text-form-field placeholder:text-form-field rounded-2xl text-xs" placeholder="Buscar usuário">
          <div className="absolute w-5 h-5 bg-form-field"></div>
        </input>
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
