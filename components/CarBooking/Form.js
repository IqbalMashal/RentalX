import { BookCreatedFlagContext } from "@/context/BookCreatedFlagContext";
import { createBooking, getStoreLocations } from "@/services";
import React, { useContext, useEffect, useState } from "react";

function Form({ car }) {
  const [storeLocation, setStoreLocation] = useState([]);
  const { showToastMsg, setShowToastMsg } = useContext(BookCreatedFlagContext);
  const [formValue, setFormValue] = useState({
    location: '', // Initialize location as an empty string
    pickUpDate: '',
    dropOffDate: '',
    pickUpTime: '',
    dropOffTime: '',
    contactNumber: '',
    userName: 'Rahul Sanap',
    carId: ""
  });

  const today = new Date();

  useEffect(() => {
    const fetchStoreLocations = async () => {
      try {
        const resp = await getStoreLocations();
        if (resp?.storesLocations) {
          setStoreLocation(resp.storesLocations);
        }
      } catch (error) {
        console.error("Error fetching store locations:", error);
      }
    };

    fetchStoreLocations();

    if (car) {
      setFormValue((prevState) => ({
        ...prevState,
        carId: car.id
      }));
    }
  }, [car]);

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async () => {
    try {
      const resp = await createBooking(formValue);
      if (resp) {
        setShowToastMsg(true);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const handleReset = () => {
    setFormValue({
      location: '',
      pickUpDate: '',
      dropOffDate: '',
      pickUpTime: '',
      dropOffTime: '',
      contactNumber: '',
      userName: 'Rahul Sanap',
      carId: ""
    });
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto">
      <div className="flex flex-col w-full mb-6">
        <label className="text-gray-600 mb-2">PickUp Location</label>
        <select
          className="select select-bordered w-full rounded-lg mt-2"
          name="location"
          value={formValue.location} // Controlled by formValue.location
          onChange={handleChange}
        >
          <option disabled value="">
            PickUp Location?
          </option>
          {storeLocation &&
            storeLocation.map((loc, index) => (
              <option key={index} value={loc?.address}>
                {loc?.address}
              </option>
            ))}
        </select>
      </div>

      <div className="flex flex-col sm:flex-row gap-5 mb-6">
        <div className="flex flex-col w-full">
          <label className="text-gray-600 mb-2">Pick Up Date</label>
          <input
            type="date"
            min={today.toISOString().split("T")[0]}
            onChange={handleChange}
            name="pickUpDate"
            className="input input-bordered w-full rounded-lg mt-2"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-gray-600 mb-2">Drop Off Date</label>
          <input
            type="date"
            onChange={handleChange}
            name="dropOffDate"
            className="input input-bordered w-full rounded-lg mt-2"
          />
        </div>
      </div>

      <div className="flex gap-5 mb-6">
        <div className="flex flex-col w-full">
          <label className="text-gray-600 mb-2">Pick Up Time</label>
          <input
            type="time"
            onChange={handleChange}
            name="pickUpTime"
            className="input input-bordered w-full rounded-lg mt-2"
          />
        </div>

        <div className="flex flex-col w-full">
          <label className="text-gray-600 mb-2">Drop Off Time</label>
          <input
            type="time"
            name="dropOffTime"
            onChange={handleChange}
            className="input input-bordered w-full rounded-lg mt-2"
          />
        </div>
      </div>

      <div className="flex flex-col w-full mb-6">
        <label className="text-gray-600 mb-2">Contact Number</label>
        <input
          placeholder="Type here"
          onChange={handleChange}
          name="contactNumber"
          className="input input-bordered w-full rounded-lg mt-2"
        />
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleReset}
          className="btn btn-outline text-gray-600 border-gray-300 hover:bg-gray-100 w-32 rounded-lg py-2"
        >
          Close
        </button>
        <button
          onClick={handleSubmit}
          className="btn bg-blue-500 text-white hover:bg-blue-700 w-32 rounded-lg py-2"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default Form;