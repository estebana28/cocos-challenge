/* eslint-disable @typescript-eslint/no-unused-vars */
import { Suspense, useMemo, useState } from 'react'
import { Asset } from '@/models/assetModel';
import { FilterComponent } from '@/components/filter/FlterComponent'
import { PortfolioTable } from '@/ui/tables/PortfolioTable'
import { usePortfolio } from '@/lib/hooks/api-hooks/usePortfolio';


export default function PortfolioComponent() {
  const { data, isPending, error } = usePortfolio();  
  const [filterQuery, setFilterQuery] = useState<string>('');

  const filteredAssets = useMemo(() => {
    return data && data.assets && data.assets.filter((item: Asset) => 
      item.ticker.includes(filterQuery.toUpperCase()));
  }, [data, filterQuery]);

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterQuery(e.currentTarget.value);
  }

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error
  
  return (
    <div className='portfolio-container'>
      <FilterComponent handleFilter={handleFilter}  />
      <Suspense fallback={<div>Loading...</div>}>
        <PortfolioTable assets={filteredAssets} isLoading={isPending} error={error}  />
      </Suspense>
    </div>
  )
}