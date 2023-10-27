import { PropsWithChildren } from "react";

interface SecondaryButtonProps {
  onClick?: () => void
}

export const SecondaryButton = ({ children, onClick }: PropsWithChildren<SecondaryButtonProps>) => (
  <button
    className="px-4 py-2 w-full flex items-center gap-3 transition-colors duration-200 text-typography-dimmed hover:text-typography hover:bg-layout-button-hover-background rounded-2xl font-medium text-xs"
    onClick={onClick}
  >
    {children}
  </button>
)
