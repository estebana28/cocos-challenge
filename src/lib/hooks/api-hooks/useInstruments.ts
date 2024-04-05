import { useQuery } from '@tanstack/react-query'
import { Instrument } from '@/models/instrumentModel'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_URL_STRING

export const useInstruments = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ['instruments'],
    queryFn: () => axios.get(`${BASE_URL}/instruments`).then((response) => response.data),
  })

  const instruments = data && data.map((item: Instrument) => new Instrument(item.close_price, item.id, item.last_price, item.name, item.ticker, item.type))  

  return {
    data: instruments,
    isPending,
    error
  }
}