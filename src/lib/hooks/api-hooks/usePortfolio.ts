import { useQuery } from '@tanstack/react-query'
import { Portfolio } from '@/models/portfolioModel'
import { Asset } from '@/models/assetModel'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_URL_STRING


export const usePortfolio = () => {  
  const { data, isPending, error } = useQuery({
    queryKey: ['portfolio'],
    queryFn: () => axios.get(`${BASE_URL}/portfolio`).then((response) => response.data),
  })

  const assets = data && data.map((item: Asset) => new Asset(item.avg_cost_price, item.close_price, item.instrument_id, item.last_price, item.quantity, item.ticker))
  
  const portfolioInstance = new Portfolio(assets)  
  
  return {
    data: portfolioInstance,
    isPending,
    error
  }
}



