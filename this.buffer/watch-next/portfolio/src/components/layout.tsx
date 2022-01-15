import Sidebar from "./sidebar";

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props): JSX.Element => {
  return (
    <div className="grid grid-cols-12 gap-6 my-14 px-5 sm:px-20 md:px-32 lg:px-48">
      <div className="col-span-12 rounded-2xl p-4 text-center bg-white lg:col-span-3">
        <Sidebar />
      </div>
      <div className="col-span-12 rounded-2xl bg-white lg:col-span-9">
        {children}
      </div>
    </div>
  );
};

export default Layout;
