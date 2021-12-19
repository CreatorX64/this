import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { MicrophoneIcon, SearchIcon, XIcon } from "@heroicons/react/solid";
import Avatar from "./Avatar";
import HeaderOptions from "./HeaderOptions";

export default function Header() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(router.query.term);

  function search(evt) {
    evt.preventDefault();
    if (!searchTerm.trim()) return;
    router.push(`/search?term=${searchTerm}`);
  }

  return (
    <header className="sticky top-0 bg-white">
      <div className="flex w-full p-6 items-center">
        <Image
          src="https://www.google.co.uk/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          height={40}
          width={120}
          className="cursor-pointer"
          alt="Google logo"
          onClick={() => router.push("/")}
        />

        <form className="flex-grow flex items-center max-w-3xl ml-10 mr-5 rounded-full border-gray-200 px-6 py-3 shadow-lg">
          <input
            value={searchTerm}
            onChange={(evt) => setSearchTerm(evt.target.value)}
            type="text"
            className="flex-grow w-4 focus:outline-none"
          />
          <XIcon
            className="h-7 cursor-pointer text-gray-500 transition duration-100 hover:scale-110 sm:mr-3"
            onClick={() => {
              searchInputRef.current.value = "";
            }}
          />
          <MicrophoneIcon className="hidden h-6 mr-3 border-l-2 border-gray-300 pl-4 text-blue-500 sm:inline-flex" />
          <SearchIcon className="hidden h-6 text-blue-500 sm:inline-flex" />
          <button hidden type="submit" onClick={search}>
            Search
          </button>
        </form>
        <Avatar className="ml-auto" url="https://coaching.papareact.com/ai9" />
      </div>

      {/* Header options */}
      <HeaderOptions />
    </header>
  );
}
