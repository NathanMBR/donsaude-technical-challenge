import { IconContext } from "@phosphor-icons/react"

import {
  pagesList,
  Logo,
  Logotype
} from "../../../assets"

export const Navbar = () => {
  const getButtonStyle = (isActive: boolean) => isActive
    ? "px-4 py-2 w-full flex items-center gap-3 bg-primary hover:bg-primary-hover transition-colors duration-200 text-white rounded-2xl font-medium text-xs"
    : "px-4 py-2 w-full flex items-center gap-3 transition-colors duration-200 text-typography-dimmed hover:text-typography hover:bg-layout-button-hover-background rounded-2xl font-medium text-xs"

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
              <button className={getButtonStyle(page.isActive)}>
                <div>{page.icon}</div>
                <span>{page.title}</span>
              </button>
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
