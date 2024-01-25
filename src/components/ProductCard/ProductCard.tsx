import { ProductsDataInt } from "../../interfaces";
import { txtSlicer } from "../../utils/functions";
import Image from "../Image/Image";
import Button from "../ui/Button";
import ProductColorCircle from "../ui/ProductColorCircle";

interface ProductCardPropsInt {
  productData: ProductsDataInt,
  selectedProductToEdit: ProductsDataInt,
  setSelectedProductToEdit: (selectedProductToEdit: ProductsDataInt) => void
  openEditModal: () => void
  closeEditModal: () => void
  productIndex: number
  setEditedProductIndex: (productIndex: number) => void
}

const ProductCard = ( 
  {
    productData, 
    setSelectedProductToEdit, 
    openEditModal,
    closeEditModal,
    productIndex,
    setEditedProductIndex
  } : ProductCardPropsInt
) => {
  /* -------- VARIABLES -------- */
  const {imageURL, title, description, price, category, colors} = productData;

  /* -------- FUNCTIONS -------- */
  const editProductDataClicked = () => {
    setSelectedProductToEdit(productData)
    openEditModal()
    setEditedProductIndex(productIndex)
  }
  const handleProductPrice = (productPrice: string) => {
    console.log(productPrice.split(""));

    let test = [0, 1, 2, 3];
    console.log(test.splice(3, 0, 10)); //Why this gives []
    console.log(test); //Why this gives []

    let test1: (number|string)[] = [11, 22, 33, 44, 55, 66, 77, 88];
    console.log(test1.splice(2, 0, ",")); //Why this gives []
    console.log("Here", test1); //Why this gives []

    let test3 = ["1", "2", "3", "4", "5"];
    console.log(test3.length);

    // for (let index = 0; index < array.length; index++) {
    //   const element = array[index];
      
    // }

    let enhancedArr = test3;
    for (let idx = test3.length; idx > 3; idx - 3) {
      let wantedPlace = idx - 3;
      enhancedArr.splice(wantedPlace, 0, ",");
      console.log("For works");
      
    }

    console.log(enhancedArr);
    

    let enhancedPriceShip = productPrice.split("");
    productPrice.split("").map((number, idx) => {
      if(idx % 3 === 0 && idx !== 0) {
        enhancedPriceShip.splice(idx, 0, ",");
      }
    })
    console.log(enhancedPriceShip.join(""));
    return enhancedPriceShip.join();  
  }

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

      <button onClick={() => handleProductPrice("12345")} >Run the fun</button>
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
        <span className="text-lg text-indigo-600 font-semibold">price</span>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold">{category.name}</span>
          <Image 
            imageUrl={category.imageURL} 
            imageAlt={category.name} 
            imageClasses="w-10 h-10 rounded-full object-cover" 
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 text-white">
        <Button 
          buttonClasses="bg-indigo-700" width="w-full" 
          onClick={() => editProductDataClicked()}
        > Edit </Button>
        <Button 
          buttonClasses="bg-red-700" width="w-full" 
          onClick={() => 'DELETE FUNCTIONALITY'}
        > Delete </Button>
      </div>
    </div>
  )
}

export default ProductCard