import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import CarCardSkelton from './CarCardSkelton';
import BookingModal from '../CarBooking/BookingModal';

function CarsList(props) {
    const [isLoaded, setIsLoaded] = useState(true);
    const [selectedCar, setSelectedCar] = useState([]);

    useEffect(() => {
        if (props.carsList) {
            setIsLoaded(false);
        }
    }, [props.carsList]);

    return (
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
            {/* <CarCardSkelton/> */}
            {!isLoaded && props.carsList.map((car, index) => (
                <div key={index} onClick={() => {
                    window.my_modal_4.showModal();
                    setSelectedCar(car);
                }}>
                    <CarCard car={car} />
                </div>
            ))}
            {isLoaded ?
                [1, 2, 3, 4, 5].map((item, index) => (
                    <CarCardSkelton key={index} />
                ))
                : null}

            {/* You can open the modal using ID.showModal() method */}
            <dialog id="my_modal_4" className="modal">
                <BookingModal car={selectedCar} />
            </dialog>
        </div>
    );
}

export default CarsList;
