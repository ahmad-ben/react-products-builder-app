import { InputHTMLAttributes } from "react"

interface InputPropsInt extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({...rest}: InputPropsInt) => {
  return (
    <input 
      className='
        border border-gray-300 shadow-md rounded-lg p-3 text-md
        focus:border-indigo-500 focus:outline-none focus:ring-1 
        focus:ring-indigo-500 
      '
      {...rest} 
    />
  )
}

export default Input