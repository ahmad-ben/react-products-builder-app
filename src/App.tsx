import './App.css'
import ProductCard from './components/ProductCard/ProductCard'
import { productsData } from './data'

function App() {
  const renderProductsArray = productsData.map(productData => 
    <ProductCard productData={productData} key={productData.id} /> 
  )

  return (
    <div className='appCom 
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10'
    >
      { renderProductsArray }
    </div>
  )
}

export default App
