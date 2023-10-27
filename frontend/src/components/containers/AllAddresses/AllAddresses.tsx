import { CaretLeft } from "@phosphor-icons/react"
import {
  useState,
  useEffect
} from "react"

import { Content } from "../.."
import { API_URL } from "../../../config"
import { CreatePartnerPartial, Address, Pagination } from "../../../interfaces"
import { AddressItem } from "./AddressItem"

interface AllAddressesProps {
  onBack: () => void
  onNext: () => void
  partialPartner: CreatePartnerPartial
}

const Header = ({ onBack }: AllAddressesProps) => (
  <div className="flex gap-1 items-center px-12 pt-8 pb-4">
    <CaretLeft size={20} onClick={onBack} className="cursor-pointer" />

    <h1 className="text-typography text-2xl font-bold">Novo parceiro</h1>
  </div>
)

const Section = ({ onNext: _ }: AllAddressesProps) => {
  const [paginatedAddresses, setPaginatedAddresses] = useState<Pagination<Address> | null>(null)
  const [addresses, setAddresses] = useState<Array<Address>>([])
  const [page, _setPage] = useState(1)
  const [quantity, _setQuantity] = useState(10)
  const [search, _setSearch] = useState("")

  useEffect(() => {
    const fetchUrl = new URL(`${API_URL}/addresses`)
    fetchUrl.searchParams.set("page", `${page}`)
    fetchUrl.searchParams.set("quantity", `${quantity}`)
    fetchUrl.searchParams.set("search", search)

    fetch(fetchUrl.toString())
      .then(res => res.json())
      .then((data: Pagination<Address>) => {
        console.log(data)
        setPaginatedAddresses(data)
        setAddresses(data.data)
      })
  }, [
    page,
    quantity,
    search
  ])

  return (
    <section>
      <div className="bg-white p-6 rounded-2xl">
        <div className="flex flex-nowrap rounded-full p-1 gap-4 w-full border-solid border border-layout-background">
          <div className="px-3 py-2 flex gap-1 rounded-full grow items-center justify-center">
            <span className="font-medium text-[8px] w-3 h-3 bg-form-border rounded-full text-form-label text-center">1</span>
            <span className="font-medium text-[10px] text-form-field">Informações</span>
          </div>

          <div className="px-3 py-2 flex gap-1 rounded-full grow items-center justify-center bg-primary-light">
            <span className="font-medium text-[8px] w-3 h-3 bg-primary rounded-full text-white text-center">2</span>
            <span className="font-medium text-[10px] text-primary">Endereços</span>
          </div>
        </div>
      </div >
      <div className="pt-6 pb-9 pl-2 grid grid-cols-2 gap-x-4 gap-y-6">
        {
          addresses.length > 0
            ? <ul>
              {
                addresses.map(address => <AddressItem
                  key={address.id}
                  address={address}
                />)
              }
            </ul>
            : <p>Nenhum endereço encontrado</p>
        }

        {
          paginatedAddresses
            ? <span>Mostrando {Math.min(paginatedAddresses.quantityPerPage, paginatedAddresses.total)} de {paginatedAddresses.total} {paginatedAddresses.total > 1 ? "resultados" : "resultado"}</span>
            : null
        }
      </div>
    </section>
  )
}

export const AllAddresses = (props: AllAddressesProps) => (
  <Content header={<Header {...props} />}>
    <Section {...props} />
  </Content>
)

