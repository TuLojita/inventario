import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { Product } from '@/models';

type Data = { 
  message: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'DELETE':
      return deleteProduct(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id = "" } = req.query;

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

  await db.connect();
  const product = await Product.findOne({ id });
  await db.disconnect();

  if (!product) {
    return res.status(400).json({
      message: `No existe un producto con la ID: ${id}`
    })
  }

  product.deleteOne();
  res.status(200).json({ message: "Producto eliminado correctamente" })

}