import Image from "next/image";

export default function Avatar({ url, className }) {
  return (
    <div
      className={`inline-block w-10 h-10 rounded-full overflow-hidden cursor-pointer transition duration-150 hover:scale-110 ${className}`}
    >
      <Image
        src={url}
        width={40}
        height={40}
        layout="responsive"
        alt="Profile pic"
      />
    </div>
  );
}
