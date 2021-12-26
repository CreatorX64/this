import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";
import Image from "next/image";
import {
  SearchIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  PaperAirplaneIcon,
  MenuIcon
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
import { modalState } from "../atoms/modalAtom";

export function Header() {
  const router = useRouter();
  const [open, setOpen] = useRecoilState(modalState);
  const { data: session } = useSession();

  return (
    <div className="sticky top-0 z-50 border-b shadow-sm bg-white">
      <div className="flex justify-between max-w-6xl px-5 lg:mx-auto">
        {/* Left - Logo */}
        <div
          onClick={() => router.push("/")}
          className="hidden relative w-24 cursor-pointer lg:inline-grid"
        >
          <Image
            src="/logo-lg.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>
        <div className="relative flex-shrink-0 w-10 cursor-pointer lg:hidden">
          <Image
            src="/logo-sm.png"
            layout="fill"
            objectFit="contain"
            alt="Instagram logo"
          />
        </div>

        {/* Middle - Search input field */}
        <div className="max-w-xs">
          <div className="relative mt-1 rounded-md p-3">
            <div className="absolute inset-y-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-500" />
            </div>
            <input
              type="text"
              className="w-full border-gray-300 rounded-md pl-10 bg-gray-50 focus:ring-black focus:border-black sm:text-sm"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right - Menu icons */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="nav-btn" onClick={() => router.push("/")} />
          <MenuIcon className="h-6 cursor-pointer md:hidden" />

          {session ? (
            <>
              <div className="relative nav-btn">
                <PaperAirplaneIcon className="nav-btn rotate-45" />
                <div className="absolute -top-1 -right-2 flex items-center justify-center w-5 h-5 rounded-full text-xs animate-pulse text-white bg-red-500">
                  3
                </div>
              </div>
              <PlusCircleIcon
                className="nav-btn"
                onClick={() => setOpen(true)}
              />
              <UserGroupIcon className="nav-btn" />
              <HeartIcon className="nav-btn" />

              <img
                src={session?.user?.image}
                alt="Profile picture"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={signOut}
              />
            </>
          ) : (
            <button onClick={signIn}>Sign in</button>
          )}
        </div>
      </div>
    </div>
  );
}
