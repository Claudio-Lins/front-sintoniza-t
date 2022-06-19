import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const imprensas = await prisma.imprensa.findMany()
    return res.status(200).json({
      data: imprensas,
    })
  }
  if (req.method === 'POST') {
    const { title, linkYoutube, datePublished, fileUrl } = req.body
    const imprensa = await prisma.imprensa.create({
      data: {
        title,
        linkYoutube,
        datePublished: new Date(datePublished),
        fileUrl,
      },
    })
    return res.status(201).json({
      data: imprensa,
    })
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
    return res.status(201).json(imprensa)
  }

  if (req.method === 'DELETE') {
    const imprensaId = req.query.id
    const imprensa = await prisma.imprensa.delete({
      where: {
        id: Number(imprensaId),
      },
    })
    return res.status(200).json({ message: 'Imprensa deleted successfully' })
  }

  return res.status(404).json({ message: 'Route not fount' })
}
