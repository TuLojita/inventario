import { IProduct } from "@/interfaces";
import { idGenerate } from "@/utils";
import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";

interface ValidId {
  error: boolean;
  message: string;
}

interface StateEntry {
  products: IProduct[];
  validID: ValidId;

  // Funciones
  addNewProduct: () => void;
  deleteEntry: (id: string) => void;
  productsUpdate: (update: IProduct, id: string) => void;

  setBillState: Dispatch<SetStateAction<string>>;
  setStartDateState: Dispatch<SetStateAction<string>>;
  setValidID: Dispatch<SetStateAction<{
    error: boolean;
    message: string;
  }>>;
}

export const ProductsContext = createContext({} as StateEntry);

interface Props {
  children: JSX.Element | JSX.Element[]
}

const INITIAL_PRODUCTS: IProduct = {
  _id: idGenerate(),
  id: "",
  name: "",
  bill: "",
  startDate: "",
  quantity: 0
}

export const ProductsProvider = ({ children }: Props) => {

  const [products, setProducts] = useState<IProduct[]>([INITIAL_PRODUCTS]);
  const [billState, setBillState] = useState("");
  const [startDateState, setStartDateState] = useState("");
  const [validID, setValidID] = useState<ValidId>({ error: false, message: "" });

  // Agregar entradas
  const addNewProduct = () => {
    let newProducts = [...products];
    newProducts.push({
      _id: idGenerate(),
      id: "",
      name: "",
      bill: "",
      startDate: "",
      quantity: 0
    });
    setProducts(newProducts);
  }

  // Eliminar entradas
  const deleteEntry = (id: string) => {
    if (products.length < 2) {
      return;
    }
    const newArray = products.filter(entry => entry._id !== id);
    setProducts(newArray);
  }

  // Actualizar productos
  const productsUpdate = (update: IProduct, id: string) => {
    let updateProduct: IProduct[] = [...products];
    updateProduct.map(product => {
      if (product._id === id) {
        product.id = update.id;
        product.name = update.name,
        product.bill = update.bill,
        product.startDate = update.startDate,
        product.quantity = update.quantity
      }
    });
    setProducts(updateProduct);
    updateEntry();
  }

  useEffect(() => {
    updateEntry();
  }, [billState, startDateState]);

  const updateEntry = () => {
    let updateProducts: IProduct[] = [...products];
    updateProducts.map(product => {
      product.bill = billState;
      product.startDate = startDateState;
    });
    setProducts(updateProducts);
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        validID,
        setValidID,
        addNewProduct,
        deleteEntry,
        productsUpdate,
        setBillState,
        setStartDateState
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}