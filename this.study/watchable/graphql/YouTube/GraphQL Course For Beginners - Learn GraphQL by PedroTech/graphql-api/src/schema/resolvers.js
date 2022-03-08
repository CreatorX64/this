import _ from "lodash";
import { movieList, userList } from "../dummy-data.js";

export const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      // console.log(context);
      // console.log(context.req.headers);
      // console.log(info);

      if (userList) {
        return { users: userList };
      }

      return { message: "Yo, there was an error" };
    },
    // parent: Previous level in the GraphQL graph
    // args: Arguments
    // context: Useful for authentication, authorization, etc. Context allows
    //          you to pass variables, numbers, values through every single resolver
    // info: Contains info concerning the GraphQL request
    user: (parent, args, context, info) => {
      const id = Number(args.id);
      const user = _.find(userList, { id });
      return user;
    },
    movies: () => {
      return movieList;
    },
    movie: (parent, args) => {
      const name = args.name;
      const movie = _.find(movieList, { name });
      return movie;
    }
  },
  User: {
    favoriteMovies: (parent, args) => {
      // In this function, "parent" is the user who favoriteMovies belongs to.
      // In parent, we can access user information like id, name, username, etc.
      // that are defined in the User type. In the real world, we would query
      // our database using the user's id to perhaps fetch the user's favorite
      // movies.

      return _.filter(
        movieList,
        (movie) =>
          movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
      );
    }
  },
  Mutation: {
    createUser: (parent, args) => {
      const user = args.input;
      const lastId = userList.at(-1).id;

      user.id = lastId + 1;
      userList.push(user);

      return user;
    },
    updateUsername: (parent, args) => {
      const { id, newUsername } = args.input;
      let userUpdated;

      userList.forEach((user) => {
        if (user.id === Number(id)) {
          user.username = newUsername;
          userUpdated = user;
        }
      });

      return userUpdated;
    },
    deleteUser: (parent, args) => {
      const id = Number(args.id);
      _.remove(userList, (user) => user.id === id);
      return null;
    }
  },
  UsersResult: {
    __resolveType(obj) {
      if (obj.users) {
        return "UsersSuccessfulResult";
      }

      if (obj.message) {
        return "UsersErrorResult";
      }

      return null;
    }
  }
};
