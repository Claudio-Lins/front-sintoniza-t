import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let equipaId = req.query.id

  if (req.method === 'DELETE') {
    const equipa = await prisma.equipa.delete({
      where: {
        id: Number(equipaId),
      },
    })
    res.status(200).json(equipa)
  }

  if (req.method === 'PUT') {
    try {
      const {
        name,
        email,
        telemovel,
        nationality,
        cargo,
        datePublished,
        fileUrl,
      } = req.body
    await prisma.equipa.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        name,
        email,
        telemovel,
        nationality,
        cargo,
        datePublished: new Date(datePublished),
        fileUrl,
      },
    })
    res.status(201).json({ message: 'equipa updated successfully' })
    } catch (error) {
      console.error('Method:PUT',error)
    }
  }
}
