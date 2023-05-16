import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';

import { db } from '@/database';
import { User } from '@/models';
import { jwt } from '@/utils';

type Data =
  | { message: string }
  | {
    token: string;
    user: {
      identity: string;
      name: string;
      role: string;
    }
  }

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

  switch (req.method) {
    case 'POST':
      return registerUser(req, res)

    default:
      res.status(400).json({
        message: 'Bad request'
      })
  }
}

const registerUser = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { identity = '', password = '', name = '' } = req.body as { identity: string, password: string, name: string };

  if (password.length < 6) {
    return res.status(400).json({
      message: 'La contraseña debe de ser de 6 caracteres'
    });
  }

  if (name.length < 2) {
    return res.status(400).json({
      message: 'El nombre debe de ser de 2 caracteres'
    });
  }

  await db.connect();
  const user = await User.findOne({ identity });

  if (user) {
    return res.status(400).json({
      message: 'No puedes usar esa cédula'
    })
  }

  const newUser = new User({
    identity,
    password: bcrypt.hashSync(password),
    role: 'user',
    name,
  });

  try {
    await newUser.save({ validateBeforeSave: true });
    return res.status(200).json({ message: "Usuario creado correctamente" });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Revisar logs del servidor'
    })
  }

}