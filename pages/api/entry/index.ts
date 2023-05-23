import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { Entry } from '@/models';
import { IEntry } from '@/interfaces';

type Data =
| { message: string }
| IEntry[]

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return entries(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const entries = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  await db.connect();
  const entries = await Entry.find().select("-__v -_id");
  await db.disconnect();

  if (!entries) {
    return res.status(400).json({
      message: 'No hay entradas para mostrar'
    })
  }

  return res.status(200).json(entries);

}