import { useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard/ProductCard'
import Button from './components/ui/Button'
import Modal from './components/ui/Modal'
import { productsData } from './data'

function App() {
  const [isOpen, setIsOpen] = useState(false)
  
  function closeModal() {
    setIsOpen(false)
  }
  
  function openModal() {
    setIsOpen(true)
  }

  const renderProductsArray = productsData.map(
    productData => 
      <ProductCard productData={productData} key={productData.id} /> 
  )
  
  return (
    <main className='appCom container mx-auto
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
      gap-2 md:gap-4 p-10'
    >
      <button  onClick={openModal}>Add</button>
      { renderProductsArray }
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        title='Add a new product'
      >
        <div className='flex items-center space-x-3'>
          <Button 
            buttonClasses='bg-indigo-700 hover:bg-indigo-800' width='w-full'>
            Submit</Button>
          <Button 
            buttonClasses='bg-gray-300 hover:bg-gray-400' width='w-full'>
            Cancel</Button>
        </div>
      </Modal>
    </main>
  )
}

export default App
