import { TextInput } from './TextInput'

type SearchInputProps = {
  handleSearch?: React.ChangeEventHandler<HTMLInputElement>
  name?: string
  label?: string  
  placeholder?: string
  type?: string
}

export const SearchInput = ({ handleSearch, name = 'search', label, placeholder = 'Buscar...', type = 'text' }: SearchInputProps): JSX.Element => {

  return (
    <div className='search-input'>
      <TextInput name={name} label={label} placeholder={placeholder} type={type}  onChange={handleSearch} />
    </div>
  )
}
