import {
  ChartPie,
  IdentificationBadge,
  CurrencyDollar,
  UsersFour,
  User,
  GearSix
} from '@phosphor-icons/react'

export const pagesList = [
  {
    title: 'Indicadores',
    icon: <ChartPie />,
    isActive: false
  },

  {
    title: 'Atendimento',
    icon: <IdentificationBadge />,
    isActive: false
  },

  {
    title: 'Financeiro',
    icon: <CurrencyDollar />,
    isActive: false
  },

  {
    title: 'Parceiros',
    icon: <UsersFour />,
    isActive: true
  },

  {
    title: 'Usuários',
    icon: <User />,
    isActive: false
  },

  {
    title: 'Configurações',
    icon: <GearSix />,
    isActive: false
  }
]
