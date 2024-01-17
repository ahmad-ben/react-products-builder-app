import { ProductsDataInt } from "../../interfaces";
import { txtSlicer } from "../../utils/functions";
import Image from "../Image/Image";
import Button from "../ui/Button";
import ProductColorCircle from "../ui/ProductColorCircle";

interface ProductCardPropsInt {
  productData: ProductsDataInt
}

const ProductCard = ( {productData} : ProductCardPropsInt) => {
  /* -------- VARIABLES -------- */
  const { imageURL, title, description, price, category, colors } = productData;

  /* -------- RENDERS -------- */
  const renderProductColors = colors.map(color => 
    <ProductColorCircle 
      key={color} color={color} 
    />
  )

  return (
    <div className="productCardCom 
      max-w-sm mx-auto md:max-w-lg md:max-0
      border rounded-md p-2 flex flex-col space-y-3">

      <Image 
        imageUrl={imageURL}
        imageAlt="Product image"
        imageClasses="rounded-md h-52 w-full lg:object-cover"
      />

      <h3 className="text-lg font-semibold"> {txtSlicer(title, 25)} </h3>

      <p className="text-xs text-gray-500 break-words"> 
        { txtSlicer(description) } </p>

      <div className="flex items-center flex-wrap space-x-1">
       { renderProductColors }
      </div>

      <div className="flex items-center justify-between"> 
        <span className="text-lg text-indigo-600 font-semibold">${price}</span>
        <Image 
          imageUrl={ category.imageURL }
          imageAlt={ category.name }
          imageClasses="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex items-center space-x-2 text-white">
        <Button 
          buttonClasses="bg-indigo-700"
          width="w-full" 
          onClick={() => {
            // console.log("Edit button clicked");
          }}
        > Edit </Button>
        <Button buttonClasses="bg-red-700" width="w-full"> Delete </Button>
      </div>
    </div>
  )
}

export default ProductCard

























