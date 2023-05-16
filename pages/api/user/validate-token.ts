import type { NextApiRequest, NextApiResponse } from 'next';

import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils';

type Data =
  | { message: string }
  | {
    token: string;
    user: {
      _id: string;
      id: string;
      identity: string;
      name: string;
      role: string;
    }
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'GET':
      return checkJWT(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const checkJWT = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { token = '' } = req.cookies;

  let userId = '';

  try {
    userId = await jwt.isValidToken(token);

  } catch (error) {
    return res.status(401).json({
      message: 'Token de autorización no es válido'
    })
  }


  await db.connect();
  const user = await User.findById(userId);
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: 'No existe usuario con ese id' })
  }

  const { _id, id, name, identity, role } = user;

  return res.status(200).json({
    token: jwt.singToken(_id.toString(), identity),
    user: {
      _id: _id.toString(),
      id,
      name,
      identity,
      role,
    }
  })
}