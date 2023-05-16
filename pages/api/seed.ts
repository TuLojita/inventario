import { db, initialUsers } from '@/database';
import { User } from '@/models';
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
}

export default async function handler (req: NextApiRequest, res: NextApiResponse<Data>) {
    
    if( process.env.NODE_ENV === 'production' ) {
        return res.status(401).json({
            message: 'Acceso denegado'
        });
    }

    await db.connect();

    await User.deleteMany();
    await User.insertMany( initialUsers.users );

    await db.disconnect();

    res.status(200).json({ message: 'Proceso realizado correctamente' })
}