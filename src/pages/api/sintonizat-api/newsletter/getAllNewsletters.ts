import prisma  from '../../../../../lib/prisma'

export async function getAllNewsletters() {
  const data = await prisma.newsletter.findMany()
  return data
}