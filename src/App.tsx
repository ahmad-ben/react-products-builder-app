import './App.css'
import ProductCard from './components/ProductCard/ProductCard'
import Modal from './components/ui/Modal'
import { productsData } from './data'

function App() {
  const renderProductsArray = productsData.map(
    productData => 
      <ProductCard productData={productData} key={productData.id} /> 
  )

  return (
    <main className='appCom container mx-auto
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      gap-2 md:gap-4 p-10'
    >
      { renderProductsArray }
      <Modal />
    </main>
  )
}

export default App
