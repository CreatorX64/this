import type { FC } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

interface IProps {
  children: JSX.Element;
}

const Layout: FC<IProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-12 gap-6 my-14 px-5 sm:px-20 md:px-32 lg:px-48">
      <div className="col-span-12 rounded-2xl p-4 text-center bg-white lg:col-span-3">
        <Sidebar />
      </div>
      <div className="col-span-12 flex flex-col rounded-2xl bg-white lg:col-span-9">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
