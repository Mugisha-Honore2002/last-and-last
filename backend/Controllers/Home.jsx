import React from 'react';
import { Link } from "react-router-dom";

const Sidebar = () => {
  // Function to handle button clicks
  const handleButtonClick = (action) => {
    alert(`You clicked on ${action}`);
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-gray-800 text-white shadow-lg">
      <h1 className="text-2xl font-bold text-center py-4">Dashboard</h1>
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <button
              className="w-full text-left py-2 px-4 hover:bg-gray-700 transition duration-200"
              onClick={() => handleButtonClick('Book')}
            >
              Book
            </button>
          </li>
          <li>
            <button
              className="w-full text-left py-2 px-4 hover:bg-gray-700 transition duration-200"
              onClick={() => handleButtonClick('Publisher')}
            >
              Publisher
            </button>
          </li>
          <li>
            <Link
            to="/supplier"
            className="w-full text-left py-2 px-4  hover:bg-gray-700 transition duration-200"
            >
              Supplier
            </Link>
          </li>
          <li>
            <button
              className="w-full text-left py-2 px-4 hover:bg-gray-700 transition duration-200"
              onClick={() => handleButtonClick('Member')}
            >
              Member
            </button>
          </li>
          <li>
            <button
              className="w-full text-left py-2 px-4 hover:bg-gray-700 transition duration-200"
              onClick={() => handleButtonClick('Borrow')}
            >
              Borrow
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
