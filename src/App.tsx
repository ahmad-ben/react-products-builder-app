import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { v4 as uuid } from "uuid"
import './App.css'
import ErrorMessage from './components/Error/ErrorMessage'
import ProductCard from './components/ProductCard/ProductCard'
import Button from './components/ui/Button'
import Input from './components/ui/Input'
import Modal from './components/ui/Modal'
import ProductColorCircle from './components/ui/ProductColorCircle'
import Select from './components/ui/Select'
import { categories, formInputsList, productColors, productsData } from './data'
import { ProductsDataInt } from './interfaces'
import { ProductInputsNamesType } from './types'
import { productValidation } from './validation'

function App() {
  /* -------- VARIABLES -------- */
  const productDefaultState = {
    title: '',
    description: '',
    imageURL: '',
    price: '',
    colors: [],
    category: {
      name: '',
      imageURL: ''
    }
  }

  /* -------- STATES -------- */
  const [productsDataState, setProductsDataState] = 
    useState<ProductsDataInt[]>(productsData);
  const [productData, setProductData] = 
    useState<ProductsDataInt>(productDefaultState);
  const [isOpen, setIsOpen] = useState(false);
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    imageURL: '',
    price: '',
  });
  const [chosenColors, setChosenColors] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string,
    imageURL: string
  }>(categories[0]);
  const [selectedProductToEdit, setSelectedProductToEdit] = 
    useState<ProductsDataInt>(productDefaultState);
  const [isEditModalOpened, setIsEditModalOpened] = 
    useState<boolean>(false);
  const [editedProductIndex, setEditedProductIndex] = 
    useState<number>(0);
  const [isConfirmDeleteProductModalOpen, setIsConfirmDeleteProductModalOpen] = 
    useState<boolean>(false);
  const [productToDeleteId, setProductToDeleteId] = useState("");

  /* -------- HANDLERS -------- */
  const closeModal = () => setIsOpen(false)
  const openModal = () => setIsOpen(true)
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProductData({
      ...productData,
      [name]: value
    });

    setFormErrors({
      ...formErrors,
      [name]: ""
    });
  }
  const cancelHandler = () => {
    setProductData(productDefaultState);
    closeModal();
  }
  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = productData;
    setFormErrors(productValidation({
      title, 
      description, 
      imageURL, 
      price   
    }));

    const hasErrMessage = Object.values(formErrors).some(objProValue => objProValue !== "");

    console.log("hasErrMessage before", hasErrMessage);
    
    
    if(hasErrMessage || chosenColors.length === 0) return;
    setProductsDataState( prevProductsDataState => [
      {
        ...productData, 
          id: uuid(), colors: chosenColors, category: selectedCategory
      }, 
        ...prevProductsDataState
      ]
    )
    setChosenColors([]);
    setProductData(productDefaultState);
    closeModal();
    toast.success("New product added.")
  }
  const productColorCircleClicked = (productColor: string) => {
    setChosenColors( (prevChosenColors) => 
      prevChosenColors.includes(productColor) 
        ||
      selectedProductToEdit.colors.includes(productColor) ? 
        prevChosenColors.filter(i => i !== productColor):
        [ ...prevChosenColors, productColor ]
    )
    setSelectedProductToEdit(prev => {
      return {
        ...prev, 
        colors: prev.colors.filter(color => color !== productColor)
      }
    }) 
  }
  const closeEditModal = () => setIsEditModalOpened(false)
  const openEditModal = () => setIsEditModalOpened(true)
  const onEditedProductInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setSelectedProductToEdit({
      ...selectedProductToEdit,
      [name]: value
    });

    setFormErrors({
      ...formErrors,
      [name]: ""
    });
  }
  const submitEditedProductHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const { title, description, imageURL, price } = 
      selectedProductToEdit;

    setFormErrors(productValidation({
      title, 
      description, 
      imageURL, 
      price   
    }));

    const hasErrMessage = Object.values(formErrors)
      .some(objProValue => objProValue !== "");
    
    if(hasErrMessage 
        || 
      (chosenColors.concat(selectedProductToEdit.colors)).length === 0) 
        return;

    const updatedProductsArray = [...productsDataState];
    updatedProductsArray[editedProductIndex] = {
      ...selectedProductToEdit, 
      colors: chosenColors.concat(selectedProductToEdit.colors)
    };
    setProductsDataState(updatedProductsArray);

    closeEditModal();
    toast.success("Product updated.")
    setChosenColors([]);
    setSelectedProductToEdit(productDefaultState);
  }
  const cancelEditProductHandler = () => closeEditModal();
  const closeConfirmProductDeleteModal = () => 
    setIsConfirmDeleteProductModalOpen(false);
  const deleteProductFun = (productsId: string) => {
    setProductToDeleteId(productsId);
    setIsConfirmDeleteProductModalOpen(true);
  }
  const confirmProductDeletion = () => {
    setProductsDataState(
      (prev) => prev.filter((productData) => productData.id !== productToDeleteId)
    );
    setProductToDeleteId("");
    closeConfirmProductDeleteModal();
    toast.success('Product deleted.');
  }
  const cancelProductDeletion = () => {
    setProductToDeleteId("");
    closeConfirmProductDeleteModal();
  }

  useEffect(() => {
    console.log("formError changed: ", formErrors);

    const hasErrMessage = Object.values(formErrors).some(objProValue => objProValue !== "");

    console.log("hasErrMessage after", hasErrMessage);
  },[formErrors])
  /* -------- RENDERS -------- */
  const renderProductsArray = productsDataState.map(
    (productData, productIndex) => 
      <ProductCard 
        productData={productData} 
        productIndex={productIndex}
        setEditedProductIndex={setEditedProductIndex}
        key={productData.id} 
        selectedProductToEdit={selectedProductToEdit} 
        setSelectedProductToEdit={setSelectedProductToEdit}
        openEditModal={openEditModal} 
        closeEditModal={closeEditModal} 
        deleteProductFun={deleteProductFun}
      /> 
  )
  const renderFormInputsList = formInputsList.map(
    inputData => 
      <div key={inputData.id} className='flex flex-col'>
        <label 
          htmlFor={inputData.id} 
          className='mb-px text-sm font-medium text-gray-700'
        >{ inputData.label }</label>
        <Input 
          type='text' id={inputData.id} name={inputData.name} 
          value={productData[inputData.name]} onChange={onChangeHandler}
        />
        <ErrorMessage msg={formErrors[inputData.name]} />
      </div>
  )
  const renderChosenColors = chosenColors.map(
    chosenColor => 
      <span key={chosenColor} style={{backgroundColor: chosenColor}} 
      className={`rounded-md text-white p-1 bg-[${chosenColor}]`} >
      { chosenColor } </span>
  )
  const renderProductColorsCircles = productColors.map(
    productColor =>  
      <ProductColorCircle 
        key={productColor} color={productColor} 
        onClick={() => productColorCircleClicked(productColor)} 
      />
  )
  const renderProductInputWithError = (
    inputId: string, labelText: string, inputName: ProductInputsNamesType 
  ) => (
    <div className='flex flex-col'>
      <label 
        htmlFor={inputId} 
        className='mb-px text-sm font-medium text-gray-700'
      > {labelText} </label>
      <Input 
        type='text' id={inputId} name={inputName} 
        value={selectedProductToEdit[inputName]} onChange={onEditedProductInputChange}
      />
      <ErrorMessage msg={""} />
    </div>
  )

  return (
    <>
      <button 
        onClick={openModal}
        className='
          block text-white bg-indigo-600 py-3 px-6
          font-medium rounded-md mt-5 mx-auto
          hover:bg-indigo-800
        '
      >Build a product</button>
      <main className='appCom container mx-auto
        grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 
        gap-2 md:gap-4 pt-5 px-10'
      >
        { renderProductsArray }

        {/* ADD PRODUCT */}
        <Modal
          isOpen={isOpen}
          closeModal={closeModal}
          title='Add a new product'
        >
          <form onSubmit={submitHandler} className='space-y-3'>
            { renderFormInputsList }
            <Select 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
            <div className="productColorsCirclesContainer flex space-x-1">
              { renderProductColorsCircles }
            </div>
            { 
              chosenColors.length > 0 &&  
              <div className="chosenColorsContainer flex flex-wrap gap-1">
                { renderChosenColors }
              </div>
            }
            <div className='flex items-center space-x-3'>
              <Button 
                buttonClasses='bg-indigo-700 hover:bg-indigo-800 text-white' width='w-full'>
                Submit</Button>
              <Button 
                buttonClasses='bg-gray-400 hover:bg-gray-500 text-white' width='w-full' 
                type="button" onClick={cancelHandler}
              >
                Cancel</Button>
            </div>
          </form>
        </Modal>

        {/* EDIT PRODUCT */}
        <Modal
          isOpen={isEditModalOpened}
          closeModal={closeEditModal}
          title='Edit product'
        >
          <form onSubmit={submitEditedProductHandler} className='space-y-3'>

            {renderProductInputWithError("title", "Product Title", "title")}
            {renderProductInputWithError("description", "Product Description", "description")}
            {renderProductInputWithError("ImageURL", "Product Image URL", "imageURL")}
            {renderProductInputWithError("price", "Product Price", "price")}

            <Select 
              selectedCategory={selectedProductToEdit.category} 
              setSelectedCategory={(v) => setSelectedProductToEdit(
                prev => {return {
                  ...prev,
                  category: v
                }}
              )} 
            />
            <div className="productColorsCirclesContainer flex space-x-1">
              { renderProductColorsCircles }
            </div>
            { 
              selectedProductToEdit.colors.length > 0 &&  
              <div className="chosenColorsContainer flex flex-wrap gap-1">
                { chosenColors.concat(selectedProductToEdit.colors).map(
                  productColor => 
                    <span key={productColor} style={{backgroundColor: productColor}} 
                    className={`rounded-md text-white p-1 bg-[${productColor}]`} >
                    { productColor } </span>
                ) }
              </div>
            } 
            <div className='flex items-center space-x-3'>
              <Button 
                buttonClasses='bg-indigo-700 hover:bg-indigo-800 text-white'>
                Submit</Button>
              <Button 
                buttonClasses='bg-gray-400 hover:bg-gray-500 text-white' 
                type="button" onClick={cancelEditProductHandler}
              >
                Cancel</Button>
            </div>
          </form>
        </Modal>

        {/* CONFIRM DELETE PRODUCT */}
        <Modal
          isOpen={isConfirmDeleteProductModalOpen}
          closeModal={closeConfirmProductDeleteModal}
          title="Are you sure you want to remove this Product from your Store?"
          description="Deleting this product will remove it permanently from your inventory. Any associated data, sales history, and other related information will also be deleted. Please make sure this is the intended action."
        >
          <div className="flex items-center space-x-3">
            <Button buttonClasses="bg-[#c2344d] hover:bg-red-800 text-white" onClick={confirmProductDeletion}>
              Yes, remove
            </Button>
            <Button buttonClasses="bg-[#f5f5fa] hover:bg-gray-300 text-black" onClick={cancelProductDeletion}>
              Cancel
            </Button>
          </div>

        </Modal>
      </main>
      <Toaster/>
    </>
  )
}

export default App

