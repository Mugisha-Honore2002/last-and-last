import React, { useState } from "react"; // Import React and useState hook
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios"; // Import axios for making HTTP requests

export default function LoginForm() {
  // State to hold form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State to hold success message and error message
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Hook for programmatic navigation

  // Handle input changes
  const handleChange = (e) => {
    // Update formData state with the input value
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setError(""); // Clear previous error message
    setMessage(""); // Clear previous success message

    try {
      // Make a POST request to the login endpoint with form data
      const response = await axios.post("http://localhost:4000/login", formData);
      // Set success message with the response data
      setMessage(response.data.message + " Welcome " + response.data.name);
      
      // Store the token in local storage (optional, for future authenticated requests)
      localStorage.setItem("token", response.data.token);

      // Redirect to /home after successful login
      navigate("/home"); // Redirect to home page
    } catch (err) {
      // Handle errors and set error message
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Member Login</h2>

      {/* Display success or error messages */}
      {message && <p className="text-green-600 text-center mb-3">{message}</p>}
      {error && <p className="text-red-600 text-center mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange} // Update state on input change
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          required // Ensure this field is filled
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange} // Update state on input change
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          required // Ensure this field is filled
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Login
        </button>

        <p>
          Don’t have an account? &nbsp;
          <Link to="/signup" className="text-blue-500 underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}
