import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import CarCardSkelton from './CarCardSkelton';
import BookingModal from '../CarBooking/BookingModal';

function CarsList({ carsList }) {
    const [isLoaded, setIsLoaded] = useState(true);
    const [selectedCar, setSelectedCar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (carsList && carsList.length > 0) {
            setIsLoaded(false);
        }
    }, [carsList]);

    const handleCarClick = (car) => {
        setSelectedCar(car);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCar(null);
    };

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
            {!isLoaded && carsList ? (
                carsList.map((car, index) => (
                    <div
                        key={car.id || index} // Use car.id if available, otherwise fallback to index
                        onClick={() => handleCarClick(car)}
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
                Array.from({ length: 5 }).map((_, index) => (
                    <CarCardSkelton key={index} />
                ))
            )}

            {/* Modal for booking */}
            {isModalOpen && selectedCar && (
                <dialog
                    open={isModalOpen}
                    onClose={closeModal}
                    className='modal'
                    aria-labelledby='booking-modal-title'
                >
                    <div className='modal-box'>
                        <BookingModal car={selectedCar} onClose={closeModal} />
                    </div>
                </dialog>
            )}
        </div>
    );
}

export default CarsList;