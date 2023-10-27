import { InputHTMLAttributes } from "react"

export const Input = (props: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      className="pl-10 py-2 flex items-center gap-3 border-solid border border-form-border text-form-field placeholder:text-form-field rounded-2xl text-xs"
      {...props}
    />
  )
}
