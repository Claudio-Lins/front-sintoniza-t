import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const equipas = await prisma.equipa.findMany()
    return res.status(200).json({
      data: equipas,
    })
  }
  if (req.method === 'POST') {
    const {
      name,
      email,
      telemovel,
      nationality,
      cargo,
      datePublished,
      fileUrl,
    } = req.body
    const equipa = await prisma.equipa.create({
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
    return res.status(201).json({
      data: equipa,
    })
  }

  if (req.method === 'PUT') {
    const equipaId = req.query.id
    const {
      name,
      email,
      telemovel,
      nationality,
      cargo,
      datePublished,
      fileUrl,
    } = req.body
    const equipa = await prisma.equipa.update({
      where: {
        id: Number(equipaId),
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
    return res.status(201).json(equipa)
  }

  if (req.method === 'DELETE') {
    const equipaId = req.query.id
    const equipa = await prisma.equipa.delete({
      where: {
        id: Number(equipaId),
      },
    })
    return res.status(200).json({ message: 'equipa deleted successfully' })
  }

  return res.status(404).json({ message: 'Route not fount' })
}
