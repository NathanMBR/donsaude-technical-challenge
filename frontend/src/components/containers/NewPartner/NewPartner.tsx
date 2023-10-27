import { Content } from "../../layouts"

const Header = () => (
  <div className="flex gap-1 items-center px-12 pt-8 pb-4">
    <div className="w-[19px] h-[19px] bg-typography"></div>
    <h1 className="text-typography text-2xl font-bold">Novo parceiro</h1>
  </div>
)

const Section = () => (
  <section className="px-12 pt-4">
    <div className="bg-white p-6 rounded-2xl">
      <div className="flex flex-nowrap rounded-full p-1 gap-4 w-full border-solid border border-layout-background">
        <div id="step 1" className="px-3 py-2 flex gap-1 rounded-full grow items-center justify-center bg-primary-light">
          <span className="font-medium text-[8px] w-3 h-3 bg-primary rounded-full text-white text-center">1</span>
          <span className="font-medium text-[10px] text-primary">Informações</span>
        </div>
        <div id="step 2" className="px-3 py-2 flex gap-1 rounded-full grow items-center justify-center">
          <span className="font-medium text-[8px] w-3 h-3 bg-form-border rounded-full text-form-label text-center">2</span>
          <span className="font-medium text-[10px] text-form-field">Endereços</span>
        </div>
      </div>
      <form action="" className="pt-6 pb-9">
          Conteúdo/Section
      </form>
      <div>
        Cancelar Próxima
      </div>
    </div>
  </section>
)

export const NewPartner = () => {
  const header = <Header />

  return (
    <Content header={header}>
      <Section />
    </Content>
  )
}
