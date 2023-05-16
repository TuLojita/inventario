import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { Product } from '@/models';

type Data = { 
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return createProduct(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id = '', name = '' } = req.body as { id: string, name: string };

  if (id.length < 3) {
    return res.status(400).json({
      message: 'El id debe tener al menos 3 dígitos'
    });
  }

  if (id.length > 4) {
    return res.status(400).json({
      message: 'El id debe tener máximo 4 dígitos'
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: 'El nombre debe de ser de 2 caracteres'
    });
  }

  await db.connect();
  const idProduct = await Product.findOne({ id });

  if (idProduct) {
    return res.status(400).json({
      message: 'Ya existe un producto con ese id'
    })
  }

  const product = await Product.findOne({ name });

  if (product) {
    return res.status(400).json({
      message: 'Ya existe un producto con ese nombre'
    })
  }


  const newProduct = new Product({
    id,
    name,
    quantity: 0
  });

  try {
    await newProduct.save({ validateBeforeSave: true });
    return res.status(200).json({ message: "Producto creado correctamente" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  }

}