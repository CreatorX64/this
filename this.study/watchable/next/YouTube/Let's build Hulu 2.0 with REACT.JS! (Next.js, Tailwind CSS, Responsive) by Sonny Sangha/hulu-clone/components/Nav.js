import { useRouter } from "next/router";
import requests from "../utils/requests";

export default function Nav() {
  const router = useRouter();
  return (
    <nav className="relative">
      <div className="flex space-x-10 px-10 text-2xl whitespace-nowrap overflow-x-scroll scrollbar-hide sm:px-20 sm:space-x-20">
        {Object.entries(requests).map(([key, { title, url }]) => (
          <h2
            key={key}
            onClick={() => router.push(`/?genre=${key}`)}
            className="cursor-pointer transition duration-100 last:pr-24 hover:scale-125 hover:text-white active:text-red-500"
          >
            {title}
          </h2>
        ))}
      </div>
      <div className="absolute top-0 right-0 h-10 w-1/12 bg-gradient-to-l from-[#06202a]" />
    </nav>
  );
}
