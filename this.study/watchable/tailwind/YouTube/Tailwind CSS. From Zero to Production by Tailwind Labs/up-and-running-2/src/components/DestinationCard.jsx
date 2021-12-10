const sizeClasses = {
  width: "w-32",
  height: "h-32"
};

export default function DestinationCard({ destination }) {
  return (
    <div className="flex items-center overflow-hidden rounded-lg bg-white shadow-lg">
      <img
        className={`flex-shrink-0 ${sizeClasses.width} ${sizeClasses.height}`}
        src={destination.imageUrl}
        alt={destination.imageAlt}
      />
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {destination.city}
        </h3>
        <p className="text-gray-600">
          ${destination.averagePrice} / night average
        </p>
        <div className="mt-4">
          <a
            href="#!"
            className="text-sm font-semibold text-brand-dark hover:text-brand"
          >
            Explore {destination.propertyCount} properties
          </a>
        </div>
      </div>
    </div>
  );
}
