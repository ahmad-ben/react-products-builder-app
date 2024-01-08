import { ChangeEvent, useState } from 'react'
import './App.css'
import ProductCard from './components/ProductCard/ProductCard'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import Modal from './components/ui/Modal'
import { formInputsList, productsData } from './data'
import { ProductsDataInt } from './interfaces'

function App() {
  /* -------- STATES -------- */
  const [productData, setProductData] = useState<ProductsDataInt>({
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }
  })
  const [isOpen, setIsOpen] = useState(false)
  
  /* -------- HANDLERS -------- */
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setProductData({
      ...productData ,
      [name]: value
    })
  }

  /* -------- RENDERS -------- */
  const renderProductsArray = productsData.map(
    productData => 
      <ProductCard productData={productData} key={productData.id} /> 
  )
  const renderFormInputsList = formInputsList.map(
    inputData => 
      <div className='flex flex-col'>
        <label 
          htmlFor={inputData.id} 
          className='mb-px text-sm font-medium text-gray-700'
        >{ inputData.label }</label>
        <Input 
          type='text' id={inputData.id} name={inputData.name} 
          value={productData[inputData.name]} onChange={onChangeHandler}
        />
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
        <form className='space-y-3'>
          { renderFormInputsList }
          <div className='flex items-center space-x-3'>
            <Button 
              buttonClasses='bg-indigo-700 hover:bg-indigo-800' width='w-full'>
              Submit</Button>
            <Button 
              buttonClasses='bg-gray-400 hover:bg-gray-500' width='w-full'>
              Cancel</Button>
          </div>
        </form>
      </Modal>
    </main>
  )
}

export default App
