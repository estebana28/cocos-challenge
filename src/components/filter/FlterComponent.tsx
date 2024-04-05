import PrimaryButton from '@/ui/buttons/PrimaryButton'
import { TextInput } from '@/ui/inputs/TextInput'
import { Controller, useForm } from 'react-hook-form'


type FilterComponentProps = {
  handleFilter: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FilterComponent = ({ handleFilter }: FilterComponentProps) => {

  const { control } = useForm();
  
  return (
    <div className='filter-container'>
      <Controller
                control={control}
                name="filter"
                render={({ field: { name } }) => (
                  <TextInput
                    name={name}
                    type="text"
                    placeholder="Filtre un activo..."
                    onChange={handleFilter}
                  />
                )}
              />
      <PrimaryButton text='Filtrar' />
    </div>
  )
}
