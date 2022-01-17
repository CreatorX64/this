import type { NextPage } from "next";
import { services } from "../data";
import ServiceCard from "../components/service-card";

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       services: services.map(({ title, about }) => ({ title, about }))
//     }
//   };
// };

// export const getStaticProps: GetStaticProps = async (context) => {
//   return {
//     props: {
//       services: services.map(({ title, about }) => ({ title, about }))
//     }
//   };
// };

// interface IProps {
//   services: IService[];
// }

const HomePage: NextPage = () => {
  return (
    <div className="flex-grow flex flex-col px-6 pt-1">
      <h5 className="my-3 font-medium">
        I am currently pursuing B. Tech Degree (final year) in Computer Science
        Engineering from Academy of Technology. I have 3+ years of experience in
        Web Development and I have a Youtube Channel where I teach Full Stack
        Web Development.
      </h5>
      <div className="flex-grow -mx-6 mt-5 p-4 bg-gray-400 dark:bg-dark-100">
        <h6 className="my-3 text-xl font-bold tracking-wide">What I Offer</h6>
        <div className="grid gap-6 lg:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-lg bg-gray-200 dark:bg-dark-200 lg:col-span-1"
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
