//import { fetchAllInstruments } from '@/lib/hooks/api-hooks/useInstruments'

export class Instrument {
  close_price: number
  id: number
  last_price: number
  name: string
  ticker: string
  type: string

  constructor(close_price: number, id: number, last_price: number, name: string, ticker: string, type: string) {

    this.close_price = close_price
    this.id = id
    this.last_price = last_price
    this.name = name
    this.ticker = ticker
    this.type = type
  }

}