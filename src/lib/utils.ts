import { Instrument } from '@/models/instrumentModel';
import _ from 'lodash';

export const debounceSearch = async (searchFunction: (query: string) => Promise<Instrument[]>, query: string): Promise<Instrument[]> => {
  return new Promise((resolve) => {
    const debouncedSearch = _.debounce(async () => {
      if (_.size(query) >= 2) {
        const upperCaseQuery = query.toUpperCase();
        const data = await searchFunction(upperCaseQuery);
        resolve(data || []);
      } else {
        resolve([]);
      }
    }, 500);

    debouncedSearch();
  });
};


export const setReturnClass = (value: string): string => {
  switch (true) {
    case parseFloat(value) > 0:
      return 'positive'
      break;
    case parseFloat(value) < 0:
      return 'negative'
    default:
      return 'neutral'
      break;
  }
}

export const getReturnValue = (last_price: number, close_price: number): string => {
  return (last_price - close_price).toFixed(2)
}


export const marketValue = (last_price: number, quantity: number): string => {
  return (last_price * quantity).toFixed(2)
}


export const totalProfit = (last_price: number, avg_cost_price: number, quantity: number): string => {
  return ((last_price - avg_cost_price) * quantity).toFixed(2)
}

export const totalReturn = (last_price: number, avg_cost_price: number): string => {
  return ((last_price / avg_cost_price) - 1).toFixed(2)
}