import React from "react";

// PurgeCSS literally checks all text (including text outside class or className)
// and purges classes that it didn't see. So if we interpolate this value into our
// classes below, PurgeCSS won't care about the computed value and the class we
// aimed to use will be purged. Instead of interpolating, we must construct our
// classes explicitly so that PurgeCSS can see them and keep them in the production
// build.

// const imgSize = 32;

const sizeClasses = {
  height: "h-32",
  width: "w-32"
};

export const DestinationCard = ({ destination }) => {
  return (
    <div className="flex items-center rounded-lg bg-white shadow-lg overflow-hidden">
      <img
        className={`flex-shrink-0 ${sizeClasses.height} ${sizeClasses.width}`}
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
            className="text-sm font-semibold text-brand-dark transition hover:text-brand"
          >
            Explore {destination.propertyCount} properties
          </a>
        </div>
      </div>
    </div>
  );
};
