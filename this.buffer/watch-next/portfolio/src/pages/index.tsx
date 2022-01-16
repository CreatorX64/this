import type { NextPage, GetStaticProps } from "next";
import { services } from "../data";
import type { IService } from "../types";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       services: services.map(({ title, about }) => ({ title, about }))
//     }
//   };
// };

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      services: services.map(({ title, about }) => ({ title, about }))
    }
  };
};

interface IProps {
  services: IService[];
}

const HomePage: NextPage<IProps> = ({ services }) => {
  return (
    <>
      <div>
        <h1 className="text-2xl font-bold">Portfolio</h1>
      </div>
    </>
  );
};

export default HomePage;
