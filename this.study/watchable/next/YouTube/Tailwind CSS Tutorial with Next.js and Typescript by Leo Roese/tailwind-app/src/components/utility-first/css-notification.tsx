import Image from "next/image";

const CssNotification = (): JSX.Element => {
  return (
    <div className="flex items-center space-x-6 max-w-sm rounded-xl mx-auto p-6 bg-white shadow-md">
      <div className="flex-shrink-0">
        {/* <img className="w-12 h-12" src="/vercel.svg" alt="ChitChat logo" /> */}
        <div className="w-12 h-12">
          <Image src="/vercel.svg" alt="ChitChat logo" width={48} height={48} />
        </div>
      </div>
      <div>
        <div className="text-xl font-medium text-black">ChitChat</div>
        <p className="text-gray-500">You have a new message!</p>
      </div>
    </div>
  );
};

export default CssNotification;
