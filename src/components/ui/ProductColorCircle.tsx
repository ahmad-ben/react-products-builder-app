import { HTMLAttributes } from "react"

interface ProductColorCirclePropsInt extends HTMLAttributes<HTMLSpanElement>{
  color: string,
}

const ProductColorCircle = ({color, ...rest}: ProductColorCirclePropsInt) => {
  return (
    <span 
      className={`w-5 h-5 mb-1 rounded-full cursor-pointer`}
      style={{backgroundColor: color}} {...rest}
    />
  )
}

export default ProductColorCircle