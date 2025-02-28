import React, { useEffect, useState } from "react";

function CarsFiltersOption({ carsList, setBrand, orderCarList }) {
  const [brandList, setBrandList] = useState([]);

  useEffect(() => {
    if (carsList) {
      filterCarList();
    }
  }, [carsList]);

  const filterCarList = () => {
    const BrandSet = new Set(carsList.map((car) => car.carBrand));
    setBrandList(Array.from(BrandSet));
  };

  return (
    <div className="mt-10 flex items-center justify-between">
      <div>
        <h2 className="text-[30px] font-bold">Cars Catalog</h2>
        <h2>Explore our cars you might like</h2>
      </div>
      <div className="flex gap-5">
        {/* ✅ Fix: Use `defaultValue` instead of `selected` */}
        <select
          className="select select-bordered w-full max-w-xs"
          onChange={(e) => orderCarList(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Price
          </option>
          <option value={-1}>Min to Max</option>
          <option value={1}>Max to Min</option>
        </select>

        <select
          className="select select-bordered w-full md:block max-w-xs hidden"
          onChange={(e) => setBrand(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Manufacturer
          </option>
          {brandList.map((brand, index) => (
            <option key={index} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default CarsFiltersOption;
