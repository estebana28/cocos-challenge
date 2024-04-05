import { Suspense, useMemo, useState } from 'react';
import { useInstruments } from '@/lib/hooks/api-hooks/useInstruments';
import InstrumentsTable from '@/ui/tables/InstrumentsTable';
import { Instrument } from '@/models/instrumentModel';
import { FilterComponent } from '../filter/FlterComponent';

export default function Home() {
  const { data, isPending, error } = useInstruments()
  const [filterQuery, setFilterQuery] = useState<string>('');

  
  const filteredInstruments = useMemo(() => {
    return data && data?.filter((item: Instrument) => 
      item.ticker.includes(filterQuery.toUpperCase()));
  }, [data, filterQuery]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {  
    setFilterQuery(e.currentTarget.value);
  }

  return (
    <div className='home-container'>
      <FilterComponent handleFilter={handleFilter}  />
      <Suspense fallback={<div>Cargando...</div>}>
        <InstrumentsTable data={filteredInstruments} isLoading={isPending} error={error}  />
      </Suspense>
    </div>
  )
}
