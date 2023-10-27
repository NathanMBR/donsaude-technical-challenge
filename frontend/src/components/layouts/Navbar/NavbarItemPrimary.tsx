import { PropsWithChildren } from "react";

export const NavbarItemPrimary = ({ children }: PropsWithChildren) => (
  <button className="px-4 py-2 w-full flex items-center gap-3 bg-primary hover:bg-primary-hover transition-colors duration-200 text-white rounded-2xl font-bold text-xs text-center">
    {children}
  </button>
);
