export class Asset {
  avg_cost_price: number
  close_price: number
  instrument_id: number 
  last_price: number
  quantity: number
  ticker: string

  constructor(avg_cost_price: number, close_price: number, instrument_id: number, last_price: number, quantity: number, ticker: string) {
    
    this.avg_cost_price = avg_cost_price
    this.close_price = close_price
    this.instrument_id = instrument_id
    this.last_price = last_price
    this.quantity = quantity
    this.ticker = ticker
  }

}