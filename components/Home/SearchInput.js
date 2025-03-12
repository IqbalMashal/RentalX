import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa"; // Using react-icons for modern icons

function SearchInput() {
  return (
    <div className="mt-8">
      <h2 className="text-center text-2xl text-gray-600 mb-6 font-semibold">
        Let's Search What You Need
      </h2>
      <div className="flex justify-center">
        <div className="flex bg-white p-2 gap-4 rounded-full shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center gap-2 px-4">
            <FaMapMarkerAlt className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Location"
              className="p-2 outline-none bg-transparent placeholder-gray-400 text-gray-700 w-40 md:w-48"
              aria-label="Enter location"
            />
          </div>
          <div className="flex items-center border-l border-gray-300 pl-4">
            <input
              type="date"
              className="p-2 outline-none bg-transparent text-gray-700"
              aria-label="Select date"
            />
          </div>
          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
            aria-label="Search"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchInput;