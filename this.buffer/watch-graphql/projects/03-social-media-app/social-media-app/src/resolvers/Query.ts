import { Post } from "@prisma/client";
import { Context } from "..";

export const Query = {
  posts: (_0: any, _1: any, { prisma }: Context): Promise<Post[]> => {
    return prisma.post.findMany({
      orderBy: [
        {
          createdAt: "desc"
        }
      ]
    });
  }
};
