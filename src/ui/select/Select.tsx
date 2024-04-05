import { FormEventHandler } from 'react'



type SelectProps = {
  options: { value: string, label: string }[]
  name: string
  value?: string
  onChange?: FormEventHandler<HTMLSelectElement>
  handleChange?: FormEventHandler<HTMLSelectElement>
}



export const SelectUIComponent: React.FC<SelectProps> = ({ options, name, onChange }) => {

  return (
    <>
      <label htmlFor={name}>{name}</label>
      <select className='primary-select' name={name} onChange={onChange}
      >
        {options.map((option) => {
          return (
            <option 
              key={option.value} 
              value={option.value} 
            >{option.label}</option>)
        })}
      </select>
    </>
  )
}
