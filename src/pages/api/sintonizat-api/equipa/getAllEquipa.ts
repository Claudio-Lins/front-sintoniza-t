import prisma from '../../../../../lib/prisma'

export async function getAllEquipa() {
  const data = await prisma.equipa.findMany({
    orderBy: [
      {
        datePublished: 'desc',
      },
    ],
  })
  return data
}
