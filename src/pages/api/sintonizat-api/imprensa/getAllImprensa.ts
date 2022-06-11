import prisma  from '../../../../../lib/prisma'

export async function getAllImprensa() {
  const data = await prisma.imprensa.findMany({
    select: {
      id: true,
      title: true,
      datePublished: true,
    },

    orderBy: [
      {
        datePublished: 'desc'
      },
    ],

  })
  return data
}