import { IconContext } from "@phosphor-icons/react"

import {
  pagesList,
  Logo,
  Logotype
} from "../../../assets"
import {
  PrimaryButton,
  SecondaryButton
} from ".."

export const Navbar = () => {
  return (
    <aside className="flex flex-col p-6 items-center">
      <div id="logo">
        <Logotype />
      </div>

      <ul className="flex flex-col gap-3 mt-14 grow">
      <IconContext.Provider value={{ size: 20 }}>
        {
          pagesList.map(page => (
            <li key={page.title}>
              {
                page.isActive
                  ? (<PrimaryButton>
                    <div>{page.icon}</div>
                    <span>{page.title}</span>
                  </PrimaryButton>)
                  : (<SecondaryButton>
                    <div>{page.icon}</div>
                    <span>{page.title}</span>
                  </SecondaryButton>)
              }
            </li>
          ))
        }
      </IconContext.Provider>
      </ul>

      <div className="w-full px-1 py-2 flex gap-2 bg-layout-button-hover-background text-typography-dimmed rounded-full">
          <div className="ml-1">
            <Logo />
          </div>

          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-[10px]/[10px] font-bold">Ibiporã</h1>
            <h3 className="text-[8px]/[8px]">Gustavo Borges</h3>
          </div>
      </div>
    </aside>
  )
}
