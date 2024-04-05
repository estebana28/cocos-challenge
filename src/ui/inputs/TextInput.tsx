

type TextInputProps = {
  name: string
  label?: string
  placeholder: string
  type: string
  disabled?: boolean
  value?: React.InputHTMLAttributes<HTMLInputElement>
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined
}

export const TextInput = ({ name, label, placeholder, type, disabled, onChange, value }: TextInputProps) => {
  return (
    <>
      {label &&
        <label htmlFor={name}>{label}</label>
      }
      <input className='text-input' value={value as number | string} type={type} placeholder={placeholder} disabled={disabled} onChange={(e) => onChange && onChange(e)} name={name}  />
    </>
  )
}
