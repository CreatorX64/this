import type { NextPage } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { languages, tools } from "../data";
import Bar from "../components/bar";
import { fadeInUp, routeFadeIn } from "../animations";

const ResumePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Web Developer | Resume | Hakan</title>
      </Head>

      <motion.div
        className="px-6 py-2"
        variants={routeFadeIn}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {/* Education & Exp. */}
        <div className="grid gap-6 md:grid-cols-2">
          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <h5 className="my-3 text-2xl font-bold">Education</h5>
            <div>
              <h5 className="my-2 text-xl font-bold">
                Computer Science Engineering
              </h5>
              <p className="font-semibold">
                Academy of Technology (2017 - 2021)
              </p>
              <p className="my-3">
                I am currently pursuing B. tech in Computer Science Engineering
                from Academy of Technology
              </p>
            </div>
          </motion.div>

          <motion.div variants={fadeInUp} initial="initial" animate="animate">
            <h5 className="my-3 text-2xl font-bold">Experience</h5>
            <div>
              <h5 className="my-2 text-xl font-bold">Software Engineer Jr.</h5>
              <p className="font-semibold">TCS (2021 - on)</p>
              <p className="my-3">I don&apos;t know why I am doing this job</p>
            </div>
          </motion.div>
        </div>

        {/* Languages & Tools */}
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h5 className="my-3 text-2xl font-bold">Languages & Frameworks</h5>
            <div className="my-2">
              {languages.map((language) => (
                <Bar key={language.name} data={language} />
              ))}
            </div>
          </div>
          <div>
            <h5 className="my-3 text-2xl font-bold">Tools & Software</h5>
            <div className="my-2">
              {tools.map((tool) => (
                <Bar key={tool.name} data={tool} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ResumePage;
