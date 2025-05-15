import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function RegisterMemberForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "Role", // default role
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    try {
      const response = await axios.post("http://localhost:4000/RegisterMember", formData);
      setMessage(response.data.message);
      setFormData({ fullname: "", email: "", password: "", role: "member" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-xl rounded-xl p-6">
      <Link to="/" className="font-bold text-md">X</Link>
      <h2 className="text-2xl font-bold mb-4 text-center">Register Member</h2>
      {message && <p className="text-green-600 text-center mb-3">{message}</p>}
      {error && <p className="text-red-600 text-center mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option disabled>Role</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          Register 
        </button>
        <p>Already have an account  &nbsp; 
               <Link to="/login" className="text-blue-500 underline">
          Login
          </Link>
        </p>
      </form>
    </div>
  );
}
