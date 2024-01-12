export const productValidation = (
  productObj: { 
    title: string, description: string, imageURL: string, price: string
  }
) => {
  const errorsObj: {
    title: string, description: string, imageURL: string, price: string 
  }  = { title: "", description: "", imageURL: "", price: "" };
  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(productObj.imageURL);

  if(
      !productObj.title.trim() || 
      productObj.title.length < 10 || 
      productObj.title.length > 80 
    ){ 
      errorsObj.title = "Product title must be between 10 and 80 characters!"; 
    }

    if(
      !productObj.description.trim() || 
      productObj.description.length < 10 || 
      productObj.description.length > 900 
    ){ 
      errorsObj.description = 
        "Product description must be between 10 and 900 characters!";
    }

    if( !productObj.imageURL.trim() || !validUrl ) { 
      errorsObj.imageURL = "Valid image URL is required!";
    }

    if( !productObj.price.trim() || isNaN(Number(productObj.price)) ) { 
      errorsObj.price = "Valid price is required!";
    }

  return errorsObj;
}