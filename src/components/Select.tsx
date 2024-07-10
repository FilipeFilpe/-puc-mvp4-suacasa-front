import { ComponentProps } from "react"

type Item = {
  value: string | number,
  text: string
}
type SelectProps = Omit<ComponentProps<'select'>, 'onChange'> & {
  label: string,
  onChange: (event: string) => void
  items: Array<Item>
}

export function Select({ name, label, items, className, value, onChange, ...rest }: SelectProps) {
  return (
    <div className={"flex flex-col gap-2 " + className}>
      <label htmlFor={name} className="font-medium">{label}</label>
      <select
        {...rest}
        id={name}
        name={name}
        className={"rounded-md p-2 pl-4 text-xl font-normal bg-gray-800 disabled:bg-gray-700 disabled:text-slate-500"}
        value={value}
        onChange={(event) => onChange(String(event.target.value))}
      >
        <option value="">Selecione...</option>
        {
          items && items?.map(({ value, text }: Item) => <option key={value} value={value}>{text}</option>)
        }
      </select>
    </div>
  )
}