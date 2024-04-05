import { postNewOrder } from '../lib/hooks/api-hooks/orders'

export class Order {
  instrument_id: number
  id?: number | undefined
  side: 'BUY' | 'SELL'
  type: 'LIMIT' | 'MARKET'
  quantity?: number | null | undefined
  price?: number | null | undefined
  status?: 'PENDING' | 'FILLED' | 'REJECTED' | undefined

  constructor(instrument_id: number, side: 'BUY' | 'SELL', type: 'LIMIT' | 'MARKET', quantity: number | null | undefined, price?: number | null | undefined) {

    this.instrument_id = instrument_id
    this.side = side 
    this.type = type
    this.quantity = quantity
    this.price = price
  }

  public async createNewOrder(order: Order) {
    const orderResponse = await postNewOrder(order)    
    order.id = orderResponse.id
    order.status = orderResponse.status
    return order
  }
  
}