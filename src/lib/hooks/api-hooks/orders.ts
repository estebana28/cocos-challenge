import { Order } from '@/models/orderModel'

const BASE_URL = import.meta.env.VITE_URL_STRING

type OrderStatus = {
  id: number
  status: 'PENDING' | 'FILLED' | 'REJECTED'
}

export const postNewOrder = async (orderData: Order) => {
  const response = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(orderData)
  })
  const orderResponse: OrderStatus = await response.json()
  return orderResponse
}