import { User } from "@prisma/client";
import { Context } from "..";

interface ParentProfile {
  id: number;
  bio: string;
  userId: number;
}

export const Profile = {
  user: async (
    parent: ParentProfile,
    _: any,
    { prisma }: Context
  ): Promise<User | null> => {
    return await prisma.user.findUnique({
      where: {
        id: parent.userId
      }
    });
  }
};
