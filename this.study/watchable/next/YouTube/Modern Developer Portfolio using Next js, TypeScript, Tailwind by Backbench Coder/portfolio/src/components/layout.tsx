import type { FC } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface IProps {
  children: JSX.Element;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="grid gap-6 my-14 px-5 sm:px-32 md:grid-cols-layout md:px-20 lg:px-36">
      <div className="rounded-2xl p-4 text-center bg-white dark:bg-dark-500 shadow-custom-light dark:shadow-custom-dark">
        <Sidebar />
      </div>
      <div className="flex flex-col overflow-hidden w-full max-w-6xl mx-auto rounded-2xl bg-white dark:bg-dark-500 shadow-custom-light dark:shadow-custom-dark">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
