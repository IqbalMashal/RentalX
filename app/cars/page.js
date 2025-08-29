"use client"
import CarsFiltersOption from "@/components/Home/CarsFiltersOption";
import CarsList from "@/components/Home/CarsList";
import ToastMsg from "@/components/ToastMsg";
import { BookCreatedFlagContext } from "@/context/BookCreatedFlagContext";
import { getCarsList } from "@/services";
import { isAuthenticated } from "@/lib/authenticate";
import { useEffect, useState } from "react";

export default function Cars() {
  const [carsList, setCarsList] = useState([]);
  const [carsOrgList, setCarsOrgList] = useState([]);
  const [showToastMsg, setShowToastMsg] = useState(false);

  useEffect(() => {
    getCarList_();
  }, []);

  const getCarList_ = async () => {
    const result = await getCarsList();
    setCarsList(result?.carLists);
    setCarsOrgList(result?.carLists);
  };

  const filterCarList = (brand) => {
    const filterList = carsOrgList.filter((item) => item.carBrand == brand);
    setCarsList(filterList);
  };

  const orderCarList = (order) => {
    const sortedData = [...carsOrgList].sort((a, b) =>
      order == -1 ? a.price - b.price : b.price - a.price
    );
    setCarsList(sortedData);
  };

  useEffect(() => {
    if (showToastMsg) {
      setTimeout(function () {
        setShowToastMsg(false);
      }, 4000);
    }
  }, [showToastMsg]);

  return (
    <div className="p-5 sm:px-10 md:px-20">
      <BookCreatedFlagContext.Provider value={{ showToastMsg, setShowToastMsg }}>
        <CarsFiltersOption
          carsList={carsOrgList}
          orderCarList={(value) => orderCarList(value)}
          setBrand={(value) => filterCarList(value)}
        />
        <CarsList carsList={carsList} />
        {showToastMsg ? <ToastMsg msg={'Booking Created Successfully!'} /> : null}
      </BookCreatedFlagContext.Provider>
    </div>
  );
}