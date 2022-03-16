import { Context } from "..";

interface ParentUser {
  id: number;
}

export const User = {
  posts: async (parent: ParentUser, _: any, { prisma, userInfo }: Context) => {
    // If the user requesting the posts is the user who posts belong to, return
    // all the posts instead of just returning published ones.

    if (userInfo?.userId === parent.id) {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id
        },
        orderBy: {
          createdAt: "desc"
        }
      });
    }

    return await prisma.post.findMany({
      where: {
        authorId: parent.id,
        published: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });
  }
};
