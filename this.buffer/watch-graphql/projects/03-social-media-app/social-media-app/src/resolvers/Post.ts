import { User } from "@prisma/client";
import { userLoader } from "../loaders/userLoader";

interface ParentPost {
  authorId: number;
}

export const Post = {
  user: async (parent: ParentPost, _1: any, _2: any): Promise<User | null> => {
    return userLoader.load(parent.authorId);
  }
};
