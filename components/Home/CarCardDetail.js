"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGasPump } from "react-icons/fa";
import { MdAirlineSeatReclineNormal } from "react-icons/md";
import { PiSteeringWheelFill } from "react-icons/pi";
import { getCarsList } from "@/services";

export default function CarCardDetail({ id }) {
  const [car, setCar] = useState(null);
  const [error, setError] = useState("");

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

  if (error) return <p className="text-red-600">{error}</p>;
  if (!car) return <p>Loading car details...</p>;

  return (
    <div
      className="group bg-gray-50 p-2 sm:p-5 rounded-3xl m-1 sm:m-5
                 hover:bg-white hover:border-[1px] cursor-pointer duration-50
                 border-blue-500"
    >
      <h2 className="text-[20px] font-medium mb-2">{car.name}</h2>
      <h2 className="text-[28px] font-bold mb-2">
        <span className="text-[12px] font-light">$ </span>
        {car.price}
        <span className="text-[12px] font-light"> /day</span>
      </h2>

      <div className="flex justify-center">
        <Image
          src={car?.image?.url}
          alt={car.name}
          width={220}
          height={200}
          className="w-[250px] h-[150px] mb-3 object-contain"
        />
      </div>

      <div className="flex justify-around">
        <div className="text-center text-gray-500">
          <PiSteeringWheelFill className="w-full text-[22px] mb-2" />
          <h2 className="text-[14px] font-light">{car?.carType}</h2>
        </div>
        <div className="text-center text-gray-500">
          <MdAirlineSeatReclineNormal className="w-full text-[22px] mb-2" />
          <h2 className="text-[14px] font-light">{car.seat} Seat</h2>
        </div>
        <div className="text-center text-gray-500">
          <FaGasPump className="w-full text-[22px] mb-2" />
          <h2 className="text-[14px] font-light">{car.carAvg} MPG</h2>
        </div>
      </div>
    </div>
  );
}
