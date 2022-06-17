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
  }

  if (req.method === 'PUT') {
    const imprensaId = req.query.id
    const { title, linkYoutube, datePublished, fileUrl } = req.body
    const imprensa = await prisma.imprensa.update({
      where: {
        id: Number(imprensaId),
      },
      data: {
        title,
        linkYoutube,
        datePublished: new Date(datePublished),
        fileUrl,
      },
    })
    res.status(201).json({ message: 'Imprensa updated successfully' })
  }
}
