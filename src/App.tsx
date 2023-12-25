import './App.css'
import ProductCard from './components/ProductCard/ProductCard'

function App() {
  return (
    <div className='appCom 
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 p-10'
    >
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  )
}

export default App
