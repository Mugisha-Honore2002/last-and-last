import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-3xl text-center bg-white rounded-2xl shadow-lg p-10">
        <h1 className="text-4xl font-bold text-blue-700 mb-6">WELCOME TO CBG-LIBRARY</h1>
        
        <p className="text-gray-700 text-md leading-relaxed mb-8">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt tenetur magnam ab sapiente pariatur ducimus sunt, 
          iste tempora delectus quibusdam saepe asperiores eum beatae, modi quae! Repellat perferendis ut delectus. <br /><br />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio hic quas voluptatum corrupti cumque maxime velit illum 
          nesciunt. Ipsam nesciunt repellendus aperiam voluptatem reprehenderit vitae dolores molestiae in itaque excepturi?
        </p>

        <div className="flex justify-center gap-6">
          <Link
            to="/login"
            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
