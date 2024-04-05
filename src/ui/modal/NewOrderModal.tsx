/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMemo, useState } from 'react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Order } from '@/models/orderModel'
import { Controller, Resolver, useForm } from 'react-hook-form'
import PrimaryButton from '../buttons/PrimaryButton'
import OutlinedButton from '../buttons/OutlinedButton'
import { SelectUIComponent } from '../select/Select'
import { TextInput } from '../inputs/TextInput'
import { Instrument } from '@/models/instrumentModel'
import { calculateActionAmount } from '@/lib/orders'
import { Chip } from '../chip/Chip'

const sideOptions = [
  { value: '', label: '' },
  { value: 'BUY', label: 'Compra' },
  { value: 'SELL', label: 'Venta' }
]

const typeOptions = [
  { value: '', label: '' },
  { value: 'LIMIT', label: 'Limit' },
  { value: 'MARKET', label: 'Market' }
]

const schema = yup.object().shape({
  side: yup.mixed().oneOf(['BUY', 'SELL'], "Este campo es requerido").required("Este campo es requerido") as yup.MixedSchema<'BUY' | 'SELL'>,  
  type: yup.mixed().oneOf(['LIMIT', 'MARKET'], "Este campo es requerido").required("Este campo es requerido") as yup.MixedSchema<'LIMIT' | 'MARKET'>,
  quantity: yup.mixed().when('type', 
    ([type]) => {
      return type === 'MARKET' ? yup.number().required('Debes ingresar una cantidad') : yup.number().optional()
    }),
  price: yup.mixed().when('type', 
    ([type]) => {
      return type === 'LIMIT' ? yup.number().required('Debes ingresar un precio') : yup.number()
    }),
  createNewOrder: yup.mixed(),
  instrument_id: yup.string().notRequired()
});

type OrderForm = yup.InferType<typeof schema>;
// type OrderWithoutId = Omit<OrderForm, 'instrument_id'>

const resolver: Resolver<OrderForm> = yupResolver<OrderForm>(schema);

type OrderModalProps = {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  instrument: Instrument
}

export const OrderModal = ({ setOpenModal, instrument }: OrderModalProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [showPriceInput, setShowPriceInput] = useState<boolean>(false)
  const [orderResponse, setOrderResponse] = useState<Order>({} as Order)
  
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm<OrderForm>({
    resolver: resolver,
    defaultValues: {
      side: undefined,
      type: undefined,
      quantity: undefined,
      price: undefined,
    }
  })  

  const onSubmit = async (values: OrderForm) => {    
    setIsLoading(true)
    const order = new Order(instrument.id, values.side, values.type, Number(values.quantity), Number(values.price))    
    
    try {
      if (values.type === 'LIMIT') {
        order.quantity = calculateActionAmount(instrument, order)        
      }
      const res = await order.createNewOrder(order)
      setOrderResponse(res)      
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }  

  const handleTypeChange = (e: React.FormEvent<HTMLSelectElement>) => {    
    if (e.currentTarget.value === 'LIMIT') {
      (document.getElementsByName('price')[0] as HTMLInputElement).value = '';
      (document.getElementsByName('quantity')[0] as HTMLInputElement).value = '';
      setValue("quantity", undefined);
      setShowPriceInput(true)
      clearErrors("quantity")

    } else {
      setValue("price", undefined);
      (document.getElementsByName('quantity')[0] as HTMLInputElement).value = '';
      (document.getElementsByName('price')[0] as HTMLInputElement).value = '';
      setShowPriceInput(false)
      clearErrors("price")
    }
  }

  const closeModal = () => {
    reset()
    setOpenModal(false)
  }

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className='modal-header'>
          <h2>Crear orden para {}</h2>
          <button className="close" onClick={closeModal}>X</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='modal-body'>
            <div className='modal-input'>
              <Controller
                control={control}
                name="side"
                render={({ field: { onChange } }) => (
                  <SelectUIComponent
                    onChange={onChange}
                    options={sideOptions}
                    name="Tipo de operación"             
                  />
                )}
              />
              {errors?.side && <span className="error">{errors.side.message}</span>}
            </div>
            <div className='modal-input'>
              <Controller
                control={control}
                name="type"
                render={({ field: { onChange } }) => (
                  <SelectUIComponent
                    options={typeOptions}
                    name="Tipo de orden"
                    onChange={(e) => {
                      onChange(e)
                      handleTypeChange(e)
                    }}

                    />
                )}
                />
                {errors?.type && <span className="error">{errors.type.message}</span>}
            </div>
            <div className='modal-input'>
              <Controller
                control={control}
                name="quantity"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    onChange={onChange}
                    name="quantity"
                    label="Cantidad"
                    type="number"
                    value={value as React.InputHTMLAttributes<HTMLInputElement>}
                    placeholder="Ingrese la cantidad"
                    disabled={showPriceInput}
                  />
                )}
              />
              {errors?.quantity && <span className="error">{errors.quantity.message}</span>}
            </div>
            <div className='modal-input'>
              <Controller
                  control={control}
                  name="price"
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      onChange={onChange}
                      name="price"
                      label="Precio"
                      type="number"
                      value={value as React.InputHTMLAttributes<HTMLInputElement>}
                      placeholder="Ingrese el monto"
                      disabled={!showPriceInput}
                    />
                  )}
                />
                {errors?.price && <span className="error">{errors.price.message}</span>}
            </div>
            <div className='modal-footer'>
              <OutlinedButton onClick={closeModal} text="Cancelar" />
              <PrimaryButton text="Crear" type="submit"  />
            </div>
          </div>
        </form>
        {orderResponse.status &&
          <div className='modal-response'>
            <h3>Estado de la orden</h3>
            <p className='modal-response-id'>Id: {orderResponse.id}</p>
            <Chip status={orderResponse.status} />
          </div>
        }
      </div>
    </div>
  )
}
