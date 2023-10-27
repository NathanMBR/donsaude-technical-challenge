const Main = () => {
  return (
    <div className="flex h-screen w-screen bg-white">
      <aside className="flex flex-col p-6 items-center">
        <div id="logo"></div>

        <ul className="flex flex-col gap-3 mt-14 grow">
          <li>
            <button className="px-4 py-2 flex items-center gap-3 bg-primary hover:bg-primary-hover transition-colors duration-200 text-white rounded-2xl font-medium text-xs">
              <div className="w-5 h-5 bg-white"></div>
              <span>Indicadores</span>
            </button>
          </li>

          <li>
            <button className="px-4 py-2 flex items-center gap-3 transition-colors duration-200 text-typography-dimmed hover:text-typography hover:bg-layout-button-hover-background rounded-2xl font-medium text-xs">
              <div className="w-5 h-5 bg-typography-dimmed"></div>
              <span>Indicadores</span>
            </button>
          </li>
        </ul>

        <div className="w-full px-1 py-2 flex gap-2 bg-layout-button-hover-background text-typography-dimmed rounded-full">
          <div></div>

          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-[10px]/[10px] font-bold">Ibiporã</h1>
            <h3 className="text-[8px]/[8px]">Gustavo Borges</h3>
          </div>
        </div>
      </aside>
      <div className="w-full">
        <header className="flex justify-between px-12 py-6">
          <div className="flex gap-4">
            <button className="px-4 py-2 flex items-center gap-3 bg-primary-light hover:text-layout-button-hover-text transition-colors duration-200 text-primary rounded-2xl font-semibold text-xs">
              <div className="w-5 h-5 bg-primary"></div>
              <span>Novo atendimento</span>
            </button>

            <div className="relative">
              <input
                className="pl-10 py-2 flex items-center gap-3 border-solid border border-form-border text-form-field placeholder:text-form-field rounded-2xl text-xs"
                placeholder="Buscar usuário"
              >
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

        <main className="bg-layout-background rounded-tl-2xl min-h-full">
          <div className="flex gap-1 items-center px-12 pt-8 pb-4">
            <div className="w-[19px] h-[19px] bg-typography"></div>
            <h1 className="text-typography text-2xl font-bold">
              Novo parceiro
            </h1>
          </div>
          <section className="px-12 pt-4">
            <div className="bg-white p-6 rounded-2xl">
              <div className="flex flex-nowrap rounded-full p-1 gap-4 w-full border-solid border border-layout-background">
                <div
                  id="step 1"
                  className="px-3 py-2 flex gap-1 rounded-full grow items-center justify-center bg-primary-light"
                >
                  <span className="font-medium text-[8px] w-3 h-3 bg-primary rounded-full text-white text-center">
                    1
                  </span>
                  <span className="font-medium text-[10px] text-primary">
                    Informações
                  </span>
                </div>
                <div
                  id="step 2"
                  className="px-3 py-2 flex gap-1 rounded-full grow items-center justify-center"
                >
                  <span className="font-medium text-[8px] w-3 h-3 bg-form-border rounded-full text-form-label text-center">
                    2
                  </span>
                  <span className="font-medium text-[10px] text-form-field">
                    Informações
                  </span>
                </div>
              </div>
              <form action="" className="pt-6 pb-9">
                Conteúdo/Section
              </form>
              <div>Cancelar Próxima</div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Main;
