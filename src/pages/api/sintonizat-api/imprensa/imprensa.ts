import { title } from 'process';
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, linkYoutube, datePublished, fileUrl } = req.body;

  if (req.method === "POST") {
    const imprensa = await prisma.imprensa.create({
      data: {
        title,
        linkYoutube,
        datePublished,
        fileUrl,
      },
    })
    res.status(200).json({ message: "Imprensa created successfully" });
  }
  if (req.method === "DELETE") {
    const imprensa = await prisma.imprensa.delete({
      where: {
        id: Number(req.query.id),
      },
    })
    res.status(200).json({ message: "Imprensa deleted successfully" });
  }
}
// Language: typescri