import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { name, email } = req.body

  try {
    await prisma.newsletter.create({
      data: {
        name,
        email,
      },
    })
    res.status(201).json({ message: 'Newsletter created successfully' })
  } catch (error) {
    console.error(error, 'Newsletter not created')
  }
}
