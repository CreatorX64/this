import Image from "next/image";
import { useTheme } from "next-themes";
import type { FC } from "react";
import { AiFillGithub, AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { GoLocation } from "react-icons/go";
import { GiTie } from "react-icons/gi";

const Sidebar: FC = () => {
  const { theme, setTheme } = useTheme();

  const changeTheme = (): void => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div>
      {/* <img
        src="/avatar.jpg"
        alt="User avatar"
        className="w-32 h-32 rounded-full mx-auto"
      /> */}

      <Image
        src="/avatar.jpg"
        alt="User avatar"
        className="rounded-full mx-auto"
        height={128}
        width={128}
        layout="intrinsic"
        quality={100}
      />

      <h3 className="my-4 text-3xl font-medium tracking-wider font-display">
        <span className="text-green">Hakan</span> Güçlü
      </h3>
      <p className="rounded-full my-3 px-2 py-1 bg-gray-200 dark:bg-dark-200">
        Web Developer
      </p>
      <a
        href="/assets/hakan-guclu-resume.pdf"
        download="Hakan Guclu Resume.pdf"
        className="flex justify-center items-center rounded-full my-3 px-2 py-1 bg-gray-200 dark:bg-dark-200"
      >
        <GiTie className="w-6 h-6" /> Download Resume
      </a>
      {/* Social icons */}
      <div className="flex justify-around w-9/12 mx-auto my-5 text-green md:w-full">
        <a href="#!" aria-label="YouTube">
          <AiFillYoutube className="w-8 h-8 cursor-pointer" />
        </a>
        <a href="#!" aria-label="GitHub">
          <AiFillGithub className="w-8 h-8 cursor-pointer" />
        </a>
        <a href="#!" aria-label="LinkedIn">
          <AiFillLinkedin className="w-8 h-8 cursor-pointer" />
        </a>
      </div>
      {/* Address */}
      <div className="my-5 py-4 -ml-4 -mr-4 bg-gray-200 dark:bg-dark-200">
        <div className="flex justify-center items-center space-x-2">
          <GoLocation />
          <span>Istanbul, Turkey</span>
        </div>
        <p className="my-2">creatorX64@gmail.com</p>
        <p className="my-2">+(90) 565 123 1212</p>
      </div>
      <button
        className="w-8/12 rounded-full my-2 px-5 py-2 text-white bg-gradient-to-r from-green to-blue-400 focus:outline-none"
        onClick={() => window.open("mailto:creatorX64@gmail.com")}
      >
        Email Me
      </button>
      <button
        className="w-8/12 rounded-full my-2 px-5 py-2 text-white bg-gradient-to-r from-green to-blue-400 focus:outline-none"
        onClick={changeTheme}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default Sidebar;
