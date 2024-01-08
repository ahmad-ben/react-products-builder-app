import { InputHTMLAttributes } from "react"

interface InputPropsInt extends InputHTMLAttributes<HTMLInputElement> {}

const Input = ({...rest}: InputPropsInt) => {
  return (
    <input {...rest} className='border-2 border-gray-500'/>
  )
}

export default Input