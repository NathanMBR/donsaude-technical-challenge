import { PropsWithChildren } from "react";

interface PrimaryButtonProps {
  onClick?: () => void
}

export const PrimaryButton = ({ children, onClick }: PropsWithChildren<PrimaryButtonProps>) => (
  <button
    className="px-4 py-2.5 w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover transition-colors duration-200 text-white rounded-2xl font-bold text-xs"
    onClick={onClick}
  >
    {children}
  </button>
);
