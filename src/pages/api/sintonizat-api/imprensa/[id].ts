import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const imprensaId = req.query.id
  
  if (req.method === 'DELETE') {
    const imprensa = await prisma.imprensa.delete({
      where: {
        id: Number(imprensaId),
      },
    })
    res.status(200).json({ message: 'Imprensa deleted successfully' })
  } else {
    console.log('Not a DELETE request')
  }
}