import React, { useState, useEffect } from "react"; // Importing React and necessary hooks
import axios from "axios"; // Importing axios for making HTTP requests

const SupplierManagement = () => {
  // State to hold form data for supplier registration
  const [formData, setFormData] = useState({ fullname: "", email: "" });
  // State to hold the list of suppliers
  const [suppliers, setSuppliers] = useState([]);
  // State to track which supplier is being edited
  const [editingId, setEditingId] = useState(null);
  // State for success or error messages
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Function to fetch suppliers from the backend
  const fetchSuppliers = async () => {
    try {
      const res = await axios.get("http://localhost:4000/GetAllSuppliers"); // Making a GET request
      console.log("Fetched suppliers:", res.data);

      const data = res.data.data; // Extracting data from the response

      // Checking if the data is in the expected format
      if (Array.isArray(data)) {
        setSuppliers(data); // Setting suppliers state if data is an array
      } else if (Array.isArray(data.suppliers)) {
        setSuppliers(data.suppliers); // Fallback if suppliers are nested
      } else {
        console.error("Unexpected response structure:", data);
        setSuppliers([]); // Fallback to empty array
        setError("Invalid data format received from backend."); // Setting error message
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch suppliers"); // Setting error message on fetch failure
    }
  };

  // useEffect to fetch suppliers when the component mounts
  useEffect(() => {
    fetchSuppliers();
  }, []);

  // Function to handle input changes in the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value }); // Updating form data state
  };

  // Function to handle form submission for adding or updating suppliers
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    setError(""); // Resetting error message
    setMessage(""); // Resetting success message
    try {
      let res;
      // Check if we are editing an existing supplier
      if (editingId) {
        res = await axios.put(`http://localhost:4000/UpdateSupplier/${editingId}`, formData); // PUT request to update
        setMessage(res.data.message || "Supplier updated successfully."); // Setting success message
      } else {
        res = await axios.post("http://localhost:4000/RegisterSupplier", formData); // POST request to add new supplier
        setMessage(res.data.message || "Supplier added successfully."); // Setting success message
      }
      console.log("Submit response:", res.data);

      // Resetting form fields and editing ID
      setFormData({ fullname: "", email: "" });
      setEditingId(null);
      await fetchSuppliers(); // Refreshing the supplier list
    } catch (err) {
      console.error("Submit error:", err);
      setError(err.response?.data?.message || "Failed to submit supplier."); // Setting error message on submission failure
    }
  };

  // Function to handle editing a supplier
  const handleEdit = (supplier) => {
    setFormData({ fullname: supplier.fullname, email: supplier.email }); // Setting form data to supplier's data
    setEditingId(supplier.supplier_id); // Setting editing ID to the supplier's ID
  };

  // Function to handle deleting a supplier
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/DeleteSupplier/${id}`); // DELETE request to remove supplier
      setMessage("Supplier deleted successfully."); // Setting success message
      fetchSuppliers(); // Refreshing the supplier list
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.response?.data?.message); // Setting error message on deletion failure
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Manage Suppliers</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>} {/* Displaying success message */}
      {error && <p className="text-red-600 mb-2">{error}</p>} {/* Displaying error message */}

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
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
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          {editingId ? "Update Supplier" : "Register Supplier"} {/* Button text changes based on editing state */}
        </button>
      </form>

      {Array.isArray(suppliers) && suppliers.length > 0 ? ( // Checking if suppliers exist
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">Full Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => ( // Mapping through suppliers to create table rows
              <tr key={supplier.supplier_id} className="text-center">
                <td className="p-2 border">{supplier.supplier_id}</td>
                <td className="p-2 border">{supplier.fullname}</td>
                <td className="p-2 border">{supplier.email}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(supplier)} // Edit button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.supplier_id)} // Delete button
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-600">No suppliers found.</p> // Message when no suppliers exist
      )}
    </div>
  );
};

export default SupplierManagement; // Exporting the component for use in other parts of the application
