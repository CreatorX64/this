import { Post, Profile, User } from "@prisma/client";
import { Context } from "..";

export const Query = {
  me: async (
    _0: any,
    _1: any,
    { prisma, userInfo }: Context
  ): Promise<User | null> => {
    if (!userInfo) {
      return null;
    }

    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId
      }
    });
  },
  posts: (_0: any, _1: any, { prisma }: Context): Promise<Post[]> => {
    return prisma.post.findMany({
      where: {
        published: true
      },
      orderBy: [
        {
          createdAt: "desc"
        }
      ]
    });
  },
  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma }: Context
  ): Promise<Profile | null> => {
    return await prisma.profile.findUnique({
      where: {
        userId: Number(userId)
      }
    });
  }
};
