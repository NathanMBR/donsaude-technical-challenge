import { CaretLeft } from "@phosphor-icons/react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"

import { zodCreatePartnerSchema } from "../../../validation"
import { Input } from "../.."
import {
  Content,
  PrimaryButton,
  SecondaryButton
} from "../../layouts"
import { CreatePartnerPartial } from "../../../interfaces"

type CreatePartnerFormData = Zod.infer<typeof zodCreatePartnerSchema>

interface NewPartnerProps {
  onBack: () => void
  onNext: (partner: CreatePartnerPartial) => void
}

const Header = ({ onBack }: NewPartnerProps) => (
  <div className="flex gap-1 items-center px-12 pt-8 pb-4">
    <CaretLeft size={20} onClick={onBack} />

    <h1 className="text-typography text-2xl font-bold">Novo parceiro</h1>
  </div>
)


const Section = ({ onNext }: NewPartnerProps) => {
  const {
    register,
    formState: {
      errors
    },
    handleSubmit
  } = useForm<CreatePartnerFormData>({ resolver: zodResolver(zodCreatePartnerSchema) })
  const [confirmPassword, setConfirmPassword] = useState("")
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState("")

  const createPartner = (partner: CreatePartnerFormData) => {
    if (partner.password !== confirmPassword)
      return setConfirmPasswordErrorMessage("As senhas precisam ser iguais")

    setConfirmPasswordErrorMessage("")

    onNext(partner)
  }

  return (
    <section className="px-12 pt-4">
      <div className="bg-white p-6 rounded-2xl">
        <div className="flex flex-nowrap rounded-full p-1 gap-4 w-full border-solid border border-layout-background">
          <div className="px-3 py-2 flex gap-1 rounded-full grow items-center justify-center bg-primary-light">
            <span className="font-medium text-[8px] w-3 h-3 bg-primary rounded-full text-white text-center">1</span>
            <span className="font-medium text-[10px] text-primary">Informações</span>
          </div>

          <div className="px-3 py-2 flex gap-1 rounded-full grow items-center justify-center">
            <span className="font-medium text-[8px] w-3 h-3 bg-form-border rounded-full text-form-label text-center">2</span>
            <span className="font-medium text-[10px] text-form-field">Endereços</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(createPartner)} noValidate>
          <div className="pt-6 pb-9 grid grid-cols-2 gap-x-4 gap-y-6">
            <Input id="categoria" label="Categoria" inputRegister={register("category")} errorMessage={errors.name?.message} />
            <Input id="cnpj" label="CNPJ" inputRegister={register("cnpj")} errorMessage={errors.cnpj?.message} />
            <Input id="name" label="Nome" placeholder="Digite o nome completo" inputRegister={register("name")} errorMessage={errors.name?.message} />
            <Input id="email" label="E-mail" inputRegister={register("email")} errorMessage={errors.email?.message} />
            <Input id="phone" label="Telefone" inputRegister={register("phone")} errorMessage={errors.phone?.message} />
            <Input id="cellphone" label="Celular" inputRegister={register("cellphone")} errorMessage={errors.cellphone?.message} />
            <Input id="clinicalManagerName" label="Responsável Clínico" inputRegister={register("clinicalManagerName")} errorMessage={errors.clinicalManagerName?.message} />
            <Input id="financialManagerName" label="Responsável Financeiro" inputRegister={register("financialManagerName")} errorMessage={errors.financialManagerName?.message} />
            <Input id="password" label="Senha" type="password" inputRegister={register("password")} errorMessage={errors.password?.message} />
            <Input id="confirmPassword" label="Confirme a senha" type="password" onChange={event => setConfirmPassword(event.target.value)} errorMessage={confirmPasswordErrorMessage} />
          </div>

          <div className="flex w-full justify-end">
            <div className="flex justify-end w-[506px] gap-3">
              <SecondaryButton type="button">Cancelar</SecondaryButton>

              <PrimaryButton type="submit">Próxima</PrimaryButton>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export const NewPartner = (props: NewPartnerProps) => (
  <Content header={<Header {...props} />} >
    <Section {...props} />
  </Content>
)
