import { InputHTMLAttributes } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  id: string,
  errorMessage?: string
  inputRegister?: UseFormRegisterReturn
}

export const Input = ({ label, id, placeholder = label, errorMessage, inputRegister, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className="px-3 w-full py-2 flex items-center gap-3 border-solid border border-form-border text-form-field placeholder:text-form-field rounded-2xl text-xs"
        id={id}
        name={id}
        placeholder={placeholder}
        {...props}
        {...inputRegister}
      />
      {
        errorMessage
          ? <span className="text-red-500 text-sm">{errorMessage}</span>
          : null
      }
    </div>
  )
}
