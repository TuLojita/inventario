import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { jwt } from '@/utils';
import { db } from '@/database';
import { User } from '@/models';

type Data =
  | { message: string }
  | {
    token: string;
    user: {
      _id: string;
      id: string;
      name: string;
      identity: string;
      role: string;
    }
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return loginUser(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const loginUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { identity = '', password = '' } = req.body;

  await db.connect();
  const user = await User.findOne({ identity });
  await db.disconnect();

  if (!user) {
    return res.status(400).json({ message: 'Cédula o contraseña no válidos' })
  }

  if (!bcrypt.compareSync(password, user.password!)) {
    return res.status(400).json({ message: 'Cédula o contraseña no válidos' })
  }

  const { _id, id, name, role } = user;

  const token = jwt.singToken(_id.toString(), identity)

  return res.status(200).json({
    token, //jwt
    user: {
      _id: _id.toString(),
      id,
      identity,
      name,
      role
    }
  })


}