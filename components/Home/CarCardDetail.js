"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { FaGasPump, FaCalendarAlt, FaClock, FaUser, FaPhone } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { PiSteeringWheelFill } from "react-icons/pi";
import { BiCar } from "react-icons/bi";
import { getCarsList, createBooking } from "@/services";
import { readToken } from "@/lib/authenticate";

export default function CarCardDetail({ id }) {
  const [token, setToken] = useState(null);
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const result = await getCarsList();
        const match = result?.carLists?.find(
          (c) => String(c.id) === String(id)
        );
        if (!ignore) setCar(match ?? null);
      } catch (e) {
        if (!ignore) setError("Failed to load car details.");
      }
    }
    if (id) load();
    return () => { ignore = true; };
  }, [id]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    try {
      const currentToken = readToken();
      setToken(currentToken);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setToken(null);
    }
  };

  const handleBookNow = () => {
    if (!token) {
      router.push('/login');
      return;
    }
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    if (!token) {
      router.push('/login');
      return;
    }

    setIsSubmitting(true);
    try {
      const formValue = {
        ...data,
        carId: id
      };
      
      await createBooking(formValue);
      alert("Booking created successfully!");
      reset();
      setShowForm(false);
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <p className="text-red-600 text-lg">{error}</p>
    </div>
  );

  if (!car) return (
    <div className="flex justify-center items-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="ml-4 text-gray-600">Loading car details...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Car Details Card */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 sm:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Car Image and Basic Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{car.name}</h1>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold text-blue-600">${car.price}</span>
                <span className="text-gray-500 text-lg">/day</span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-2xl shadow-sm">
              <Image
                src={car?.image?.url}
                alt={car.name}
                width={550}
                height={550}
                className="w-full h-[200px] object-contain"
              />
            </div>
          </div>

          {/* Car Specifications */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Vehicle Specifications</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <PiSteeringWheelFill className="text-blue-600 text-2xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Transmission</p>
                  <p className="font-semibold text-gray-800">{car?.carType}</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <MdAirlineSeatReclineNormal className="text-green-600 text-2xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Seating Capacity</p>
                  <p className="font-semibold text-gray-800">{car.seat} Seats</p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl shadow-sm flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <FaGasPump className="text-orange-600 text-2xl" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Fuel Efficiency</p>
                  <p className="font-semibold text-gray-800">{car.carAvg} MPG</p>
                </div>
              </div>
            </div>

            {!showForm && (
              <button
                onClick={handleBookNow}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <BiCar className="inline mr-2" />
                Book This Car Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Booking Form */}
      {showForm && (
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-3xl shadow-xl border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Complete Your Booking</h2>
            <button
              onClick={() => setShowForm(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                  Personal Information
                </h3>
                
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("userName", { 
                      required: "Full name is required",
                      minLength: { value: 2, message: "Name must be at least 2 characters" }
                    })}
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-sm mt-1">{errors.userName.message}</p>
                  )}
                </div>

                <div className="relative">
                  <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    {...register("contactNumber", { 
                      required: "Contact number is required",
                      pattern: { 
                        value: /^\d{10,15}$/,
                        message: "Please enter 10-15 digits only"
                      }
                    })}
                    type="tel"
                    placeholder="Contact Number (e.g., 6454102558)"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                  {errors.contactNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.contactNumber.message}</p>
                  )}
                </div>
              </div>

              {/* Rental Dates */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">
                  Rental Period
                </h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register("pickUpDate", { required: "Pick-up date is required" })}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {errors.pickUpDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.pickUpDate.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register("pickUpTime", { required: "Pick-up time is required" })}
                      type="time"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {errors.pickUpTime && (
                      <p className="text-red-500 text-xs mt-1">{errors.pickUpTime.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register("dropOffDate", { required: "Drop-off date is required" })}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {errors.dropOffDate && (
                      <p className="text-red-500 text-xs mt-1">{errors.dropOffDate.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <FaClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      {...register("dropOffTime", { required: "Drop-off time is required" })}
                      type="time"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    />
                    {errors.dropOffTime && (
                      <p className="text-red-500 text-xs mt-1">{errors.dropOffTime.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-6 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-white rounded-xl p-2 shadow-sm">
                  <Image
                    src={car?.image?.url}
                    alt={car.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{car.name}</p>
                  <p className="text-blue-600 font-bold">${car.price}/day</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </div>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}