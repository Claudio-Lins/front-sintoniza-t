import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let imprensaId = req.query.id

  if (req.method === 'DELETE') {
    const imprensa = await prisma.press.delete({
      where: {
        id: Number(imprensaId),
      },
    })
    res.status(200).json(imprensa)
  }

  if (req.method === 'PUT') {
    try {
      const { id, title, linkYoutube, datePublished, fileUrl } = req.body
    await prisma.press.update({
      where: {
        id: Number(req.query.id),
      },
      data: {
        id,
        title,
        linkYoutube,
        datePublished: new Date(datePublished),
        fileUrl,
      },
    })
    res.status(201).json({ message: 'Imprensa updated successfully' })
    } catch (error) {
      console.error('Method:PUT',error)
    }
  }
}
