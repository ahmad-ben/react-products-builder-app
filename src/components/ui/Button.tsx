import { ReactNode } from "react"

interface ButtonPropsInt {
  children: ReactNode,
  buttonClasses: string
}

const Button = ({children, buttonClasses}: ButtonPropsInt) => {
  return (
    <button className={`${buttonClasses} w-full py-2 rounded-md`} >{ children }</button>
  )
}

export default Button