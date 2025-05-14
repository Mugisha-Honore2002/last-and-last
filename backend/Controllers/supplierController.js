const db = require("../db");

const RegisterSupplier = (req, res)=>{
    const {fullname, email}=req.body;
    const sql = "INSERT INTO supplier(fullname, email) VALUES (?,?)";
    db.query(sql,[fullname, email],(err, result)=>{
        if (err) {
            return res.status(404).send({message:"REGISTRATION OF SUPPLIER FAIL"});
        }
        res.status(201).send({message:"ADDED A NEW SUPPLIER", result:result})
    });
}
const GetAllSuppliers = (req, res) => {
    const sql = "SELECT * FROM supplier";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO FETCH SUPPLIERS" });
        }
        res.status(200).send({ message: "SUPPLIERS RETRIEVED", data: results });
    });
};

const UpdateSupplier = (req, res) => {
    const { supplier_id } = req.params; // Extracting supplier ID from request parameters
    const { fullname, email } = req.body; // Extracting fullname and email from request body

    // SQL query to update supplier information
    const sql = "UPDATE supplier SET fullname = ?, email = ? WHERE supplier_id = ?";
    
    // Executing the query
    db.query(sql, [fullname, email, supplier_id], (err, result) => {
        if (err) {
            // Handling any errors that occur during the query
            return res.status(500).send({ message: "FAILED TO UPDATE SUPPLIER" });
        }
        // Sending a success response if the update is successful
        res.status(200).send({ message: "SUPPLIER UPDATED SUCCESSFULLY", result });
    });
};


const DeleteSupplier = (req, res) => {
    const { supplier_id } = req.params;
    const sql = "DELETE FROM supplier WHERE supplier_id = ?";
    db.query(sql, [supplier_id], (err, result) => {
        if (err) {
            console.error("Database error:", err); // Log the error for debugging
            return res.status(500).send({ message: "FAILED TO DELETE SUPPLIER" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "SUPPLIER NOT FOUND" }); // Handle case where no rows were deleted
        }
        res.status(200).send({ message: "SUPPLIER DELETED SUCCESSFULLY", result });
    });
};


module.exports = {RegisterSupplier, GetAllSuppliers, UpdateSupplier, DeleteSupplier};