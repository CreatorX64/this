import Image from "next/image";

export function Story({ img, username }) {
  return (
    <div>
      <img
        src={img}
        alt="User avatar"
        className="object-contain cursor-pointer w-14 h-14 border-2 border-red-500 rounded-full p-[1.5px] transition duration-200 ease-out hover:scale-110"
      />
      <p className="truncate w-14 text-xs">{username}</p>
    </div>
  );
}
