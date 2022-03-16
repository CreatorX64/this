import { User } from "@prisma/client";
import DataLoader from "dataloader";
import { prisma } from "..";

type BatchUsers = (ids: readonly number[]) => Promise<User[]>;

const batchUsers: BatchUsers = async (ids) => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids as number[]
      }
    }
  });

  // Our batched users must be in the same order in which the "ids" were passed
  // to this function by the dataloader. The ids can be passed in any order so
  // we can't get away with a simple sort. That's why we create an intermediary
  // map of user.ids to users, then map the passed ids to the users by
  // accessing them through our intermediary map.

  const userMap: { [key: string]: User } = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return ids.map((id) => userMap[id]);
};

export const userLoader = new DataLoader<number, User>(batchUsers);
