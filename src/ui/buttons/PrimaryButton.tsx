import React from 'react'

type ButtonProps = {
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
}
export default function PrimaryButton({ text, onClick, type, isLoading }: ButtonProps) {
  return (
    <button className='primary-button' onClick={onClick} type={type} disabled={isLoading}>{text}</button>
  )
}
