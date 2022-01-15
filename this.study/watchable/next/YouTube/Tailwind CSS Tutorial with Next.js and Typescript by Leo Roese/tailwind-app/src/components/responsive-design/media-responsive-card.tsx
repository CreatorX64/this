const BreakpointResponsiveCard = (): JSX.Element => {
  return (
    <div className="overflow-hidden max-w-md mx-auto rounded-xl bg-white shadow-md md:max-w-2xl">
      <div className="md:flex">
        <div className="border-b border-gray-100 md:flex-shrink-0 md:border-b-0 md:border-r">
          <img
            className="object-cover w-full h-48 md:w-48 md:h-full"
            src="/vercel.svg"
            alt="Man looking at item at a store"
          />
        </div>
        <div className="p-8">
          <div className="text-sm tracking-wide font-semibold uppercase text-indigo-500">
            Case study
          </div>
          <a
            href="#!"
            className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
          >
            Finding customers for your new business
          </a>
          <p className="mt-2 text-gray-500">
            Getting a new business off the ground is a lot of hard work. Lorem
            ipsum dolor sit amet, consectetur adipisicing elit. Consequatur
            placeat quam delectus.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BreakpointResponsiveCard;
