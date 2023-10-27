import { Address } from "../../../interfaces"

interface AddressItemProps {
  address: Address
  // onSelect: (addressId: number) => void
}

export const AddressItem = ({ address }: AddressItemProps) => {
  return (
  <li>
    { address.street }
  </li>
  )
}
