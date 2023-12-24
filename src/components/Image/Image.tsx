interface ImagePropsInt {
  imageUrl: string,
  imageAlt: string,
  imageClasses: string,
}

const Image = ({imageUrl, imageAlt, imageClasses}: ImagePropsInt) => {
  return (
    <img 
      src={imageUrl}
      alt={imageAlt}
      className={imageClasses}
    />
  )
}

export default Image


