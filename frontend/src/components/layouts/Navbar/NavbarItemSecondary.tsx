import { PropsWithChildren } from "react";

export const NavbarItemSecondary = ({ children }: PropsWithChildren) => (
  <button className="px-4 py-2 w-full flex items-center gap-3 transition-colors duration-200 text-typography-dimmed hover:text-typography hover:bg-layout-button-hover-background rounded-2xl font-bold text-xs text-center">
    {children}
  </button>
)
