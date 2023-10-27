import { ButtonHTMLAttributes, PropsWithChildren } from "react";

interface SecondaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const SecondaryButton = ({ children, onClick }: PropsWithChildren<SecondaryButtonProps>) => (
  <button
    className="px-4 py-2.5 w-full flex items-center justify-center gap-3 transition-colors duration-200 text-typography-dimmed hover:text-typography hover:bg-layout-button-hover-background rounded-2xl font-bold text-xs"
    onClick={onClick}
  >
    {children}
  </button>
)
