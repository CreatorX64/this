import { User, UserProps } from "../models/User";
import { UserEdit } from "./UserEdit";
import { CollectionView } from "./CollectionView";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    // new UserShow(itemParent, model).render();
    new UserEdit(itemParent, model).render();
  }
}
