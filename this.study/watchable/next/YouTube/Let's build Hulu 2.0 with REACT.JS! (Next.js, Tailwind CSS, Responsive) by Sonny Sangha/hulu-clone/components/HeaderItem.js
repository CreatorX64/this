export default function HeaderItem({ title, Icon }) {
  return (
    <div className="group flex flex-col items-center w-12 cursor-pointer hover:text-white sm:w-20">
      <Icon className="h-8 mb-1 group-hover:animate-bounce" />
      <p className="opacity-0 tracking-widest uppercase group-hover:opacity-100">
        {title}
      </p>
    </div>
  );
}
