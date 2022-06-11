import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const newsletterId = req.query.id

  if (req.method === 'DELETE') {
    const newsletter = await prisma.newsletter.delete({
      where: {
        id: Number(newsletterId),
      },
    })
    res.status(200).json({ message: 'Newsletter deleted successfully' })
  } else {
    console.log('Not a DELETE request')
  }
}
