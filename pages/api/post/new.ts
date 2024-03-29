import { PrismaClient, Post } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import { slugify } from 'utils/slugify';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (req.method === 'POST') {
    // Process a POST request
    try {
      const response = await prisma.post.create({
        data: {
          ...req.body,
          slug: slugify(req.body.title),
        },
      });
      res.status(200).json({
        success: true,
        message: 'Post created successfully.',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ success: false, message: 'Bir hata olustu, lutfen daha sonra tekrar deneyiniz' });
    }
  } else {
    res.status(500).json({ success: false, message: 'Endpoint not provided!' });
  }
};
