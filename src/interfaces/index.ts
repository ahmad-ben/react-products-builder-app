import { ProductInputsNamesType } from "../types";

export interface ProductsDataInt {
  id?: string;
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
  category: {
    name: string;
    imageURL: string;
  };
}

export interface FormInputInt {
  id: string;
  name: ProductInputsNamesType;
  label: string;
  type: string;
}

export interface CategoryInt {
  id: string;
  name: string;
  imageURL: string;
}
