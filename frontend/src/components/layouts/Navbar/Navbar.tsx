import { IconContext } from "@phosphor-icons/react"
import { pagesList } from "../../../assets"

export const Navbar = () => {
  const getButtonStyle = (isActive: boolean) => isActive
    ? "px-4 py-2 w-full flex items-center gap-3 bg-primary hover:bg-primary-hover transition-colors duration-200 text-white rounded-2xl font-medium text-xs"
    : "px-4 py-2 w-full flex items-center gap-3 transition-colors duration-200 text-typography-dimmed hover:text-typography hover:bg-layout-button-hover-background rounded-2xl font-medium text-xs"

  return (
    <aside className="flex flex-col p-6 items-center">
      <div id="logo">
        Logo
      </div>

      <ul className="flex flex-col gap-3 mt-14 grow">
        {
          pagesList.map(page => (
            <li key={page.title}>
              <button className={getButtonStyle(page.isActive)}>
                <IconContext.Provider value={{ size: 20 }}>
                  {page.icon}
                </IconContext.Provider>
                <span>{page.title}</span>
              </button>
            </li>
          ))
        }
      </ul>

      <div className="w-full px-1 py-2 flex gap-2 bg-layout-button-hover-background text-typography-dimmed rounded-full">
          <div>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="26" height="26" rx="13" fill="#D0005E"/>
              <path d="M15.3529 10.6471V5L14.4934 5C12.3694 5 10.647 6.99651 10.647 9.46057V10.6471H15.3529Z" fill="white"/>
              <path d="M15.3529 16.5394V15.3529H10.647V21H11.5065C13.6318 21 15.3529 19.0023 15.3529 16.5394Z" fill="white"/>
              <path d="M5 10.6471H17.8377C19.5848 10.6471 21 11.9256 21 13.5016V15.3529H8.16226C6.41525 15.3529 5 14.0744 5 12.4984V10.6471Z" fill="white"/>
            </svg>
          </div>

          <div className="flex flex-col justify-center gap-1">
            <h1 className="text-[10px]/[10px] font-bold">Ibiporã</h1>
            <h3 className="text-[8px]/[8px]">Gustavo Borges</h3>
          </div>
      </div>
    </aside>
  )
}
