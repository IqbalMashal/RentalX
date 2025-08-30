"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import CarCardDetail from "@/components/Home/CarCardDetail";

export default function CarByIdPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [carId, setCarId] = useState(null);

  useEffect(() => {
    // Add some debugging
    console.log("Params:", params);
    
    // Check if params exist and get the ID
    if (params) {
      // Try different possible parameter names
      const id = params.objectID;
      console.log("Extracted ID:", id);
      
      if (id) {
        setCarId(id);
        setIsLoading(false);
      } else {
        // If no ID found after a short delay, show error
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    }
  }, [params]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="p-5 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading car details...</p>
        </div>
      </div>
    );
  }

  // Show error if no ID found
  if (!carId) {
    return (
      <div className="p-5 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-600 text-lg">Car ID not found</p>
          <p className="text-gray-600 mt-2">Please check the URL and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5">
      <CarCardDetail id={carId} />
    </div>
  );
}