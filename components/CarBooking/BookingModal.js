import React, { useEffect } from 'react';
import CarCard from '../Home/CarCard';
import Form from './Form';
import { useUser } from '@clerk/nextjs';

function BookingModal({ car }) {
    return React.createElement(
        'form',
        { method: 'dialog', className: 'modal-box w-11/12 max-w-5xl' },
        React.createElement(
            'div',
            { className: 'border-b-[1px] pb-2' },
            React.createElement(
                'h3',
                { className: 'text-[30px] font-light text-gray-400' },
                'Rent A Car Now!'
            )
        ),
        React.createElement(
            'div',
            { className: 'grid grid-cols-1 md:grid-cols-2 p-5' },
            React.createElement(
                'div',
                null,
                React.createElement(CarCard, { car: car })
            ),
            React.createElement(
                'div',
                null,
                React.createElement(Form, { car: car })
            )
        )
    );
}

export default BookingModal;