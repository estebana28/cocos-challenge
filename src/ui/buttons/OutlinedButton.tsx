import React from 'react'

type ButtonProps = {
  text: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
}
export default function OutlinedButton({ text, onClick, type }: ButtonProps) {
  return (
    <button className='outlined-button' onClick={onClick} type={type}>{text}</button>
  )
}