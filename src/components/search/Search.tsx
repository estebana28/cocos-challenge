/* eslint-disable @typescript-eslint/no-unused-vars */
import { searchAssets } from '@/lib/hooks/api-hooks/searchAssets'
import { debounceSearch } from '@/lib/utils'
import { Instrument } from '@/models/instrumentModel'
import { SearchInput } from '@/ui/inputs/SearchInput'
import InstrumentsTable from '@/ui/tables/InstrumentsTable'
import _ from 'lodash'
import { useMemo, useState } from 'react'

export const SearchComponent = () => {
  const [searchResult, setSearchResult] = useState<Instrument[]>([]);

const handleClick = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const result = await debounceSearch(searchAssets, e.currentTarget.value);
  setSearchResult(result);
};
  
  return (
    <div className='search-container'>
      <SearchInput name='search' label='Buscardor de activos' handleSearch={handleClick} />
      <InstrumentsTable data={searchResult} isLoading={false} error={''}  />
    </div>
  )
}
