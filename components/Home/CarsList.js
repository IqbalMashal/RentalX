"use client"
import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import CarCardSkelton from './CarCardSkelton';
import { useRouter } from 'next/navigation';

function CarsList({ carsList }) {

    const router = useRouter();
    const [isLoaded, setIsLoaded] = useState(true);


    useEffect(() => {
        if (carsList && carsList.length > 0) {
            setIsLoaded(false);
        }
    }, [carsList]);

    function handleClick(car){
        router.push(`/cars/${car.id}`)
    }


    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {!isLoaded && carsList ? (
                carsList.map((car, index) => (
                    <div
                        key={car.id || index} // Use car.id if available, otherwise fallback to index
                        onClick={()=>handleClick(car)}
                        className='cursor-pointer hover:scale-105 transition-transform duration-300'
                        role='button'
                        tabIndex={0}
                        aria-label={`View details of ${car.name}`}
                    >
                        <CarCard car={car} />
                    </div>
                ))
            ) : (
                // Show skeleton loaders while data is loading
                Array.from({ length: 8 }).map((_, index) => (
                    <CarCardSkelton key={index} />
                ))
            )}
        </div>
    );
}

export default CarsList;