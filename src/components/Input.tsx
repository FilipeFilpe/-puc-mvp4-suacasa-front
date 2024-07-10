import { ComponentProps } from "react"

type InputProps = ComponentProps<'input'> & {
  label: string,
  className?: string,
}

export function Input({ name, label, type, placeholder, className, onChange, ...rest }: InputProps) {
  return (
    <div className={"flex flex-col gap-2 " + className}>
      <label htmlFor={name} className="font-medium">{label}</label>
      <input
        {...rest}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={"rounded-md p-2 pl-4 text-xl font-normal bg-gray-800 disabled:bg-gray-700 disabled:text-slate-500"}
        onChange={onChange}
      />
    </div>
  )
}