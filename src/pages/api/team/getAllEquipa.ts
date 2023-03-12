import prisma from '../../../../lib/prisma'

export async function getAllEquipa() {
  const data = await prisma.team.findMany({
    orderBy: [
      {
        datePublished: 'desc',
      },
    ],
  })
  return data
}
