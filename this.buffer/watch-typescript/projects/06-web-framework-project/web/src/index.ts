import { Collection } from "./models/Collection";
import { UserList } from "./views/UserList";
import { User, UserProps } from "./models/User";
// import { UserEdit } from "./views/UserEdit";

// const root = document.querySelector("#root");

// if (root !== null) {
//   const user = User.buildUser({ id: 3 });

//   user.on("change", () => {
//     const userEdit = new UserEdit(root, user);
//     userEdit.render();
//   });

//   user.fetch();
// }

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  const root = document.querySelector("#root");
  if (root !== null) {
    new UserList(root, users).render();
  }
});

users.fetch();
