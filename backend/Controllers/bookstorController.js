const db = require("../db");

const RegisterBook = (req, res) => {
    const { title, description, year, publisher_id, supplier_id } = req.body;
    const sql = `INSERT INTO bookstore (title, description, year, publisher_id, supplier_id)VALUES (?, ?, ?, ?, ?)`;
    db.query(sql, [title, description, year, publisher_id, supplier_id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO ADD BOOK" });
        }
        res.status(201).send({ message: "BOOK ADDED SUCCESSFULLY", result:result });
    });
};

const GetAllBooks = (req, res) => {
    const sql = "SELECT * FROM bookstore";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO FETCH BOOKS" });
        }
        res.status(200).send({ message: "BOOKS RETRIEVED SUCCESSFULLY", data: results });
    });
};
const UpdateBook = (req, res) => {
    const { book_id } = req.params;
    const { title, description, year, publisher_id, supplier_id } = req.body;
    const sql = `UPDATE bookstore SET title = ?, description = ?, year = ?, publisher_id = ?, supplier_id = ?  WHERE book_id = ?`;
    db.query(sql, [title, description, year, publisher_id, supplier_id, book_id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO UPDATE BOOK" });
        }
        res.status(200).send({ message: "BOOK UPDATED SUCCESSFULLY", result });
    });
};
const DeleteBook = (req, res) => {
    const { book_id } = req.params;
    const sql = "DELETE FROM bookstore WHERE book_id = ?";
    db.query(sql, [book_id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO DELETE BOOK" });
        }
        res.status(200).send({ message: "BOOK DELETED SUCCESSFULLY", result });
    });
};

//const Insert=(req,res)

module.exports ={RegisterBook, GetAllBooks, UpdateBook, DeleteBook};