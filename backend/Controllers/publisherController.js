const db = require("../db");

const RegisterPublisher = (req, res)=>{
    const {fullname, email}=req.body;
    const sql = "INSERT INTO publisher(fullname, email) VALUE (?,?)";
    db.query(sql,[fullname, email],(err, result)=>{
        if (err) {
            return res.status(404).send({message:"REGISTRATION OF PUBLISHER FAIL"});
        }
        res.status(201).send({message:"ADDED A NEW PUBLISHER", result:result})
    });
}
const GetAllPublisher = (req, res) => {
    const sql = "SELECT * FROM publisher";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO FETCH PUBLISHER" });
        }
        res.status(200).send({ message: "PUBLISHER RETRIEVED", data: results });
    });
};

const UpdatePublisher = (req, res) => {
    const { publisher_id } = req.params;
    const { fullname, email } = req.body;

    const sql = "UPDATE publisher SET fullname = ?, email = ? WHERE publisher_id = ?";
    
    db.query(sql, [fullname, email, publisher_id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO UPDATE PUBLISHER" });
        }
        res.status(200).send({ message: "PUBLISHER UPDATED SUCCESSFULLY", result });
    });
};

const DeletePublisher = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM publisher WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO DELETE PUBLISHER" });
        }
        res.status(200).send({ message: "PUBLISHER DELETED SUCCESSFULLY", result });
    });
};

module.exports = {RegisterPublisher, GetAllPublisher, UpdatePublisher, DeletePublisher};