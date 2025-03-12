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
    <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 shadow-md rounded-lg">
      {/* Title Section */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Cars Catalog</h2>
        <p className="text-gray-500">Explore our cars you might like</p>
      </div>

      {/* Filter Options */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        {/* Price Sort Dropdown */}
        <select
          className="bg-gray-100 text-gray-700 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          onChange={(e) => orderCarList(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Sort by Price
          </option>
          <option value={-1}>Min to Max</option>
          <option value={1}>Max to Min</option>
        </select>

        {/* Brand Filter Dropdown */}
        <select
          className="bg-gray-100 text-gray-700 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          onChange={(e) => setBrand(e.target.value)}
          defaultValue=""
        >
          <option value="" disabled>
            Select Manufacturer
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
