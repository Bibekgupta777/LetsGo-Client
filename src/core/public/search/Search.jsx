import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const Search = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState(null);
  const [travellers, setTravellers] = useState(1);

  // Example destination suggestions
  const destinations = ["Kathmandu", "Pokhara", "Biratnagar", "Chitwan", "Lumbini"];

  const filterSuggestions = (input, suggestions) => {
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().startsWith(input.toLowerCase())
    );
  };

  const handleFromSelection = (value) => {
    setFrom(value);
    if (value === to) {
      setTo(""); // Reset "To" if it matches "From"
    }
  };

  const handleToSelection = (value) => {
    if (value === from) {
      alert("The 'To' destination cannot be the same as 'From'.");
      return;
    }
    setTo(value);
  };

  return (
    <div className="md:mt-24 mt-20 md:px-7 px-4 py-4 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">Search</h1>
      <form className="flex flex-col items-center space-y-6">
        <div className="flex space-x-6">
          {/* From Field with Suggestions */}
          <div className="flex flex-col">
            <label htmlFor="from" className="mb-2 font-medium text-gray-700">
              From*
            </label>
            <input
              type="text"
              id="from"
              placeholder="eg. Kathmandu"
              className="px-4 py-2 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
            {from && filterSuggestions(from, destinations).length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-md bg-white">
                {filterSuggestions(from, destinations).map((destination, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      handleFromSelection(destination);
                      setFrom(""); // Clear dropdown after selection
                    }}
                  >
                    {destination}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* To Field with Suggestions */}
          <div className="flex flex-col">
            <label htmlFor="to" className="mb-2 font-medium text-gray-700">
              To*
            </label>
            <input
              type="text"
              id="to"
              placeholder="eg. Pokhara"
              className="px-4 py-2 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
            {to && filterSuggestions(to, destinations).length > 0 && (
              <ul className="mt-2 border border-gray-300 rounded-md bg-white">
                {filterSuggestions(to, destinations).map((destination, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => {
                      handleToSelection(destination);
                      setTo(""); // Clear dropdown after selection
                    }}
                  >
                    {destination}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="flex space-x-6">
            {/* Date Picker with Calendar Icon */}
        <div className="flex flex-col">
          <label htmlFor="date" className="mb-2 font-medium text-gray-700">
            Date*
          </label>
          <div className="relative">
            <DatePicker
              selected={date}
              onChange={(selectedDate) => setDate(selectedDate)}
              minDate={new Date()}
              placeholderText="Select a date"
              className="w-full px-4 py-2 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <FaCalendarAlt className="absolute top-3 right-3 text-gray-500" />
          </div>
        </div>

        {/* Traveller Field */}
        <div className="flex flex-col">
          <label htmlFor="travellers" className="mb-2 font-medium text-gray-700">
            Travellers*
          </label>
          <input
            type="number"
            id="travellers"
            placeholder="1"
            className="w-full px-4 py-2 border border-orange-500 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
            min={1}
          />
        </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          SEARCH
        </button>
      </form>
    </div>
  );
};

export default Search;
