import Image from "../Image/Image";
import Button from "../ui/Button";

interface ProductCardPropsInt {

}

const ProductCard = ({}: ProductCardPropsInt) => {
  return (
    <div className="productCardCom border rounded-e-md p-2 flex flex-col">
      <Image 
        imageUrl="https://upload.wikimedia.org/wikipedia/commons/a/a2/Ford_Mustang_GT_Bleu_5.0-litre_V8_-_Free_Car_Picture_-_Give_Credit_Via_Link.jpg"
        imageAlt="Product image"
        imageClasses="rounded-md mb-3"
      />

      <h3>Lorem ipsum dolor sit amet.</h3>

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur 
        corporis facere temporibus. Magni debitis eligendi quibusdam voluptate?
        Provident sequi veniam sit corporis placeat ut quas!</p>

      <div className="flex items-center my-4 space-x-2">
        <span className="w-5 h-5 bg-indigo-600 rounded-full"/>
        <span className="w-5 h-5 bg-yellow-600 rounded-full"/>
        <span className="w-5 h-5 bg-red-600 rounded-full"/>
      </div>

      <div className="flex items-center justify-between"> 
        <span>$ 500,00</span>
        <Image 
          imageUrl="https://upload.wikimedia.org/wikipedia/commons/a/a2/Ford_Mustang_GT_Bleu_5.0-litre_V8_-_Free_Car_Picture_-_Give_Credit_Via_Link.jpg"
          imageAlt="Product image"
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