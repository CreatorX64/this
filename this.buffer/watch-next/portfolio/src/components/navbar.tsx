import type { FC } from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import NavbarItem from "./navbar-item";

const Navbar: FC = () => {
  const [activeItem, setActiveItem] = useState<string>("");
  const { pathname } = useRouter();

  useEffect(() => {
    switch (pathname) {
      case "/":
        setActiveItem("About");
        break;
      case "/projects":
        setActiveItem("Projects");
        break;
      case "/resume":
        setActiveItem("Resume");
        break;
    }
  }, [pathname]);

  return (
    <div className="flex justify-between my-3 px-5 py-3">
      <span className="border-b-4 border-green font-bold text-xl text-green md:text-2xl">
        {activeItem}
      </span>

      <div className="flex space-x-5 text-lg">
        <NavbarItem
          name="About"
          route="/"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <NavbarItem
          name="Projects"
          route="/projects"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
        <NavbarItem
          name="Resume"
          route="/resume"
          activeItem={activeItem}
          setActiveItem={setActiveItem}
        />
      </div>
    </div>
  );
};

export default Navbar;
