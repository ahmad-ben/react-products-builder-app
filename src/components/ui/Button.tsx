import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonPropsInt extends ButtonHTMLAttributes<HTMLButtonElement>{
  children: ReactNode,
  buttonClasses: string,
  width: "w-fit" | "w-full"
}

const Button = ({children, buttonClasses, width = "w-full", ...rest}: ButtonPropsInt) => {
  console.log(rest);

  return (
    <button 
      className={`${buttonClasses} ${width} py-2 rounded-md`} 
      {...rest}
    >{ children }</button>
  )
}

export default Button