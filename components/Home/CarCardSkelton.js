import React from 'react';

function CarCardSkelton() {
  return (
    <div className="rounded-lg shadow-md p-4 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex flex-col space-y-4">
        {/* Image Skeleton */}
        <div className="rounded-lg bg-slate-200 h-48 w-full"></div>

        {/* Title Skeleton */}
        <div className="h-6 bg-slate-200 rounded w-3/4"></div>

        {/* Subtitle Skeleton */}
        <div className="h-4 bg-slate-200 rounded w-1/2"></div>

        {/* Price and Rating Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-5 bg-slate-200 rounded w-1/4"></div>
          <div className="h-5 bg-slate-200 rounded w-1/4"></div>
        </div>

        {/* Button Skeleton */}
        <div className="h-10 bg-slate-200 rounded-lg w-full"></div>
      </div>
    </div>
  );
}

export default CarCardSkelton;