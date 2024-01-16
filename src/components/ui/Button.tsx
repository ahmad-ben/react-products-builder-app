import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonPropsInt extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode,
  buttonClasses: string,
  width: "w-fit" | "w-full"
}

const Button = ({children, buttonClasses, width = "w-full", ...rest}: ButtonPropsInt) => {

  return (
    <button 
      className={`${buttonClasses} ${width} py-2 rounded-lg text-white`} 
      {...rest}
    >{ children }</button>
  )
}

export default Button