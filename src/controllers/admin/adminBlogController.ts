import { Response, Request } from "express";
import prisma from "../../prismaClient";

export const getAllBlogs: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const blogs = await prisma.blogs.findMany({});

    return res.status(200).json(blogs);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBlog: any = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = await req.body;
    const blog = await prisma.blogs.findUnique({ where: { blogId: id } });

    return res.status(200).json(blog);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const postBlog: any = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { title, description }: any = await req.body;

    const blog = await prisma.blogs.create({
      data: {
        description,
        date: String(Date.now()),
        title,
      },
    });

    return res.json({ blog: blog, status: 201 });
  } catch (error: any) {
    console.log(error.message);
  }
};
