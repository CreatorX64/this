import { useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { MicrophoneIcon, ViewGridIcon } from "@heroicons/react/solid";
import { SearchIcon } from "@heroicons/react/outline";
import Avatar from "../components/Avatar";
import Footer from "../components/Footer";

export default function Home() {
  const searchInputRef = useRef(null);
  const router = useRouter();

  function search(evt) {
    evt.preventDefault();
    const term = searchInputRef.current.value;
    if (!term.trim()) return;
    router.push(`/search?term=${term}`);
  }

  return (
    <>
      <Head>
        <title>Google Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex flex-col items-center justify-center min-h-screen">
        {/* Header */}
        <header className="flex justify-between w-full p-5 text-sm text-gray-700">
          {/* Left */}
          <div className="flex items-center space-x-4">
            <p className="link">About</p>
            <p className="link">Store</p>
          </div>

          {/* Right */}
          <div className="flex items-center space-x-4">
            <p className="link">Gmail</p>
            <p className="link">Images</p>

            {/* Icon */}
            <ViewGridIcon className="w-10 h-10 p-2 rounded-full cursor-pointer hover:bg-gray-100" />

            {/* Avatar */}
            <Avatar url="https://coaching.papareact.com/ai9" />
          </div>
        </header>

        {/* Body */}
        <form className="flex-grow flex flex-col items-center w-4/5 mt-44">
          <Image
            src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
            width={300}
            height={100}
            alt="Google logo"
          />

          <div className="flex items-center w-full max-w-md mt-5 border border-gray-200 px-5 py-3 rounded-full hover:shadow-lg focus-within:shadow-lg sm:max-w-xl lg:max-w-2xl">
            <SearchIcon className="h-5 mr-3 text-gray-500" />
            <input
              ref={searchInputRef}
              type="text"
              className="flex-grow focus:outline-none"
            />
            <MicrophoneIcon className="h-5 mr-3 text-gray-500" />
          </div>

          <div className="flex flex-col justify-center space-y-2 w-1/2 mt-8 sm:space-y-0 sm:flex-row sm:space-x-4">
            <button className="btn" onClick={search}>
              Google Search
            </button>
            <button className="btn" onClick={search}>
              I&apos;m Feeling Lucky
            </button>
          </div>
        </form>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
}
