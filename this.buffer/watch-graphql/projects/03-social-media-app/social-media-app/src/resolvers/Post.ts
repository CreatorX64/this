import { User } from "@prisma/client";
import { Context } from "..";

interface ParentPost {
  authorId: number;
}

export const Post = {
  user: async (
    parent: ParentPost,
    _: any,
    { prisma }: Context
  ): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: {
        id: parent.authorId
      }
    });
  }
};
