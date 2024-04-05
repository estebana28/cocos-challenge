import { Instrument } from '../../models/instrumentModel'
import { getReturnValue, setReturnClass } from '../../lib/utils'
import { useState } from 'react'
import { OrderModal } from '../modal/NewOrderModal'


type InstrumentTableProps = {
  data: Instrument[] | []
  isLoading?: boolean
  error?: string | unknown
}

export default function InstrumentsTable({ data, isLoading, error }: InstrumentTableProps) {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [instrument, setInstrument] = useState<Instrument>({} as Instrument)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleOnRowClick = (instrument: Instrument) => {       
    setInstrument(instrument)
    setOpenModal(true)
  }


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
    <div  className='table-container'>
      <table>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Nombre</th>
            <th>Último Precio</th>
            <th>Retorno</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? data.map((item) => {
            const returnValue = getReturnValue(item.last_price, item.close_price)
            
            return (
            <tr key={item.id} onClick={() => handleOnRowClick(item)}>
              <td>{item.ticker}</td>
              <td className='name-cell'>{item.name}</td>
              <td>{`$ ${item.last_price}`}</td>
              <td className={setReturnClass(returnValue)}>{`$ ${returnValue}`}</td>
            </tr>)
          }) : 
          <tr>
            <td colSpan={5}>No hay datos que mostrar</td>
          </tr>
          
          }
        </tbody>
      </table>
      {openModal && <OrderModal setOpenModal={setOpenModal} instrument={instrument} />}
    </div>
  )
}
