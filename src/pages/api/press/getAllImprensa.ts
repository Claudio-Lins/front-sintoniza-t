import prisma from '../../../../lib/prisma'

export async function getAllImprensa() {
  const data = await prisma.press.findMany({
    orderBy: [
      {
        datePublished: 'desc',
      },
    ],
  })
  return data
}
