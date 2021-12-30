export function MenuItem({ text, icon: Icon, onClick, className }) {
  return (
    <button
      className="flex items-center space-x-2 hover:text-white"
      onClick={onClick}
    >
      <Icon className={`w-5 h-5 ${className}`} />
      <p>{text}</p>
    </button>
  );
}
