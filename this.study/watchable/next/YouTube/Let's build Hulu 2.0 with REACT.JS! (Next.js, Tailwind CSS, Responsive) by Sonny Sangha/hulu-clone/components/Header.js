import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  UserIcon
} from "@heroicons/react/outline";
import Image from "next/image";
import HeaderItem from "./HeaderItem";

export default function Header() {
  return (
    <header className="flex flex-col justify-between items-center h-auto m-5 sm:flex-row">
      <div className="flex justify-evenly max-w-2xl">
        <HeaderItem title="Home" Icon={HomeIcon} />
        <HeaderItem title="Trending" Icon={LightningBoltIcon} />
        <HeaderItem title="Verified" Icon={BadgeCheckIcon} />
        <HeaderItem title="Collections" Icon={CollectionIcon} />
        <HeaderItem title="Search" Icon={SearchIcon} />
        <HeaderItem title="Account" Icon={UserIcon} />
      </div>
      <Image
        className="object-contain"
        src="https://links.papareact.com/ua6"
        width={200}
        height={100}
        alt="Hulu logo"
      />
    </header>
  );
}
