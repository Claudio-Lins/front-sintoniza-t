import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req

  if(method === 'GET') {
    const imprensas = await prisma.imprensa.findMany()
    return res.status(200).json({
      data: imprensas
    })
  }else if (method === 'POST') {
    const { title, linkYoutube, datePublished, fileUrl } = req.body
    const imprensas = await prisma.imprensa.create({
      data: {
        title,
        linkYoutube,
        datePublished: new Date(datePublished),
        fileUrl
      }
    })
    return res.status(201).json({
      data: imprensas
    })
  }

  return res.status(404).json({message: 'Route not fount'})
}