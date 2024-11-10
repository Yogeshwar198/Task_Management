import React, { useContext } from 'react'
import { FiSearch } from "react-icons/fi";
import { CiFilter } from "react-icons/ci";
import { StoreContext } from '../context/store';

const Navbar = () => {
    // Access search query state from context
    const { searchQuery, setSearchQuery } = useContext(StoreContext); 

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update the search query state
  };
    return (
        <div className="flex justify-between items-center p-4 bg-gray-200 shadow-md shadow-gray-400 rounded-xl">
            {/* ----------------------- Search Bar ---------------------------- */}
            <div className="relative flex items-center max-w-lg">
                <FiSearch className="absolute left-3 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search project"
                    className="pl-10 w-full p-2 border border-gray-300 rounded-3xl shadow-md shadow-gray-400 outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label="Search project"
                    value={searchQuery}  
                    onChange={handleSearchChange}  
                />
            </div>

            {/* ---------------------- Filter Dropdown ------------------- */}
            <div className="relative max-w-lg">
                <CiFilter className="absolute left-3 top-3 text-gray-500" />
                <select
                    className="pl-7 w-full p-2 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-gray-500"
                    aria-label="Filter options"
                >
                    <option value="">Filter by</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                    <option value="option4">Option 4</option>
                </select>
            </div>
        </div>
    )
}

export default Navbar;
