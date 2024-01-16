interface ProductColorCirclePropsInt {
  color: string
}

const ProductColorCircle = ({color}: ProductColorCirclePropsInt) => {
  return (
    <span 
      className={`w-5 h-5 mb-1 rounded-full cursor-pointer`}
      style={{backgroundColor: color}}
    />
  )
}

export default ProductColorCircle