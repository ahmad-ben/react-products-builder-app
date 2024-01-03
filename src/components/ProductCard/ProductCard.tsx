import { ProductsDataInt } from "../../interfaces";
import { txtSlicer } from "../../utils/functions";
import Image from "../Image/Image";
import Button from "../ui/Button";

interface ProductCardPropsInt {
  productData: ProductsDataInt
}

const ProductCard = ( {productData} : ProductCardPropsInt) => {
  const { imageURL, title, description, price, category } = productData;

  return (
    <div className="productCardCom 
      max-w-sm mx-auto md:max-w-lg md:max-0
      border rounded-e-md p-2 flex flex-col">
      <Image 
        imageUrl={imageURL}
        imageAlt="Product image"
        imageClasses="rounded-md mb-3"
      />

      <h3> { title } </h3>

      <p> { txtSlicer(description) } </p>

      <div className="flex items-center my-4 space-x-2">
        <span className="w-5 h-5 bg-indigo-600 rounded-full"/>
        <span className="w-5 h-5 bg-yellow-600 rounded-full"/>
        <span className="w-5 h-5 bg-red-600 rounded-full"/>
      </div>

      <div className="flex items-center justify-between"> 
        <span>$ { price }</span>
        <Image 
          imageUrl={ category.imageURL }
          imageAlt={ category.name }
          imageClasses="w-10 h-10 rounded-full object-cover"
        />
      </div>

      <div className="flex items-center space-x-2 text-white mt-5">
        <Button 
          buttonClasses="bg-indigo-700"
          width="w-full" 
          onClick={() => {
            console.log("Edit button clicked");
          }}
        > Edit </Button>
        <Button buttonClasses="bg-red-700" width="w-full"> Delete </Button>
      </div>
    </div>
  )
}

export default ProductCard

























