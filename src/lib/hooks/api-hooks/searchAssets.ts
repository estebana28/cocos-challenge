import { Instrument } from '@/models/instrumentModel'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_URL_STRING

export const searchAssets = async (query: string): Promise<Instrument[]> => {
  
  try {
    const response = await axios.get(`${BASE_URL}/search?query=${query}`).then((response) => response.data)   
    const instruments: Instrument[] = response.map((item: Instrument) => new Instrument(item.close_price, item.id, item.last_price, item.name, item.ticker, item.type))
    
    return instruments
  } catch (error) {
    console.log(error)
    return []
  } 
}