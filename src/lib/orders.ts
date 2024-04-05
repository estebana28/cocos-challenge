import { Instrument } from '@/models/instrumentModel';
import { Order } from '@/models/orderModel';

export const calculateActionAmount = (instrument: Instrument, order: Order) => {  
  return order.quantity = Math.floor(order.price! / instrument.last_price) 
}