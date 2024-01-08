import { useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard/ProductCard'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import Modal from './components/ui/Modal'
import { formInputsList, productsData } from './data'

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
  const renderFormInputsList = formInputsList.map(
    inputData => 
      <div className='flex flex-col'>
        <label htmlFor={inputData.id}>{ inputData.label }</label>
        <Input type='text' id={inputData.id} name={inputData.name} />
      </div>
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
        { renderFormInputsList }
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
