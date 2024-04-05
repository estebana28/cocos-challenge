import { marketValue, setReturnClass, totalProfit, totalReturn } from '@/lib/utils'
import { Asset } from '@/models/assetModel'

type PortfolioTableProps = {
  assets: Asset[]
  isLoading: boolean
  error: string | unknown
}

export const PortfolioTable = ({ assets, isLoading, error }: PortfolioTableProps) => {
  
  if (error && typeof error === 'string') {
    return (
      <span>
        Error: {error}
      </span>
    )
  }

  if (isLoading) {
    return (
      <span>
        Cargando...
      </span>
    )
  }

  return (
    <div className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Cantidad</th>
            <th>Valor Mercado</th>
            <th>Ganancia</th>
            <th>Rendimiento</th>
          </tr>
        </thead>
        <tbody>
          {assets.length > 0 ? assets.map((item, index) => {
            const totalProfitValue = totalProfit(item.last_price, item.avg_cost_price, item.quantity)
            const totalReturnValue = totalReturn(item.last_price, item.avg_cost_price)
            const totalMarketValue = marketValue(item.last_price, item.quantity)
            return (
            <tr key={index}>
              <td>{item.ticker}</td>
              <td>{item.quantity}</td>
              <td>{`$ ${totalMarketValue}`}</td>
              <td className={setReturnClass(totalProfitValue)}>{`$ ${totalProfitValue}`}</td>
              <td className={setReturnClass(totalReturnValue)}>{`% ${totalReturnValue}`}</td>
            </tr>
            )
          }) : 
          <tr>
            <td colSpan={5}>No hay datos que mostrar</td>
          </tr>
          }
        </tbody>
      </table>
    </div>
  )
}

