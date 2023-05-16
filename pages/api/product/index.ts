import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { Product } from '@/models';
import { IProduct } from '../../../interfaces/product';

type Data =
| { message: string }
| IProduct[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return products(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const products = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  await db.connect();
  const product = await Product.find().select("-createdAt -updatedAt -__v -_id").lean();
  await db.disconnect();

  if (!product) {
    return res.status(400).json({
      message: 'No hay productos para mostrar'
    })
  }

  return res.status(200).json(product);

}