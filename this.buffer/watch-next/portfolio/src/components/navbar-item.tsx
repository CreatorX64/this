import type { FC } from "react";
import Link from "next/link";

interface IProps {
  name: string;
  route: string;
  activeItem: string;
  setActiveItem: Function;
}

const NavbarItem: FC<IProps> = ({ name, route, activeItem, setActiveItem }) => {
  return activeItem !== name ? (
    <Link href={route}>
      <a>
        <span onClick={() => setActiveItem(name)} className="hover:text-green">
          {name}
        </span>
      </a>
    </Link>
  ) : null;
};

export default NavbarItem;
