import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { Entry, Product } from '@/models';
import { IProduct } from '@/interfaces';

type Data = { 
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return createEntry(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { creator = '', date = '', products = [], bill = '' } = req.body as { creator: string, date: string, products: IProduct[], bill: string };

  let error = false;
  let errorMessage = "";

  if(bill === "") {
    return res.status(401).json({
      message: 'El número de factura es obligatorio'
    })
  }

  products.map(async (product) => {
    if(product.id === "") {
      error = true;
      return errorMessage = 'Todos los productos deben de tener una ID';
    }

    if(product.quantity === 0) {
      error = true;
      return errorMessage = 'Todos los productos deben de tener una cantidad mayor a 0';
    }

    if(product.quantity.toString() === "0") {
      error = true;
      return errorMessage = 'Todos los productos deben de tener una cantidad mayor a 0';
    }

    if(product.quantity.toString() === "") {
      error = true;
      return errorMessage = 'Todos los productos deben de tener una cantidad mayor a 0';
    }

  });

  if(error) {
    return res.status(401).json({
      message: errorMessage
    })
  }

  await db.connect();
  const entry = await Entry.findOne({ bill });
  await db.disconnect();

  if (entry) {
    return res.status(400).json({
      message: 'Ya existe una entrada con ese número de factura'
    })
  }

  const newEntry = new Entry({
    creator,
    date,
    products,
    bill
  });

  try {
    await newEntry.save({ validateBeforeSave: true });
    return res.status(200).json({ message: "Entrada creado correctamente" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  }

}