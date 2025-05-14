const db = require("../db");

// const RegisterBorrow = (req, res) => {
//     const { book_id, member_id, borrowed_date, return_date } = req.body;
//     const sql = "INSERT INTO borrow (book_id, member_id, borrowed_date, return_date) VALUES (?, ?, ?, ?)";
//     db.query(sql, [book_id, member_id, borrowed_date, return_date], (err, result) => {
//         if (err) {
//             return res.status(500).send({ message: "FAILED TO REGISTER BORROW" });
//         }
//         res.status(201).send({ message: "BORROW REGISTERED SUCCESSFULLY", result });
//     });
// };


const GetAllBorrows = (req, res) => {
    const sql = "SELECT borrow.borrow_id, bookstore.title AS book_title, members.fullname AS member_name, borrow.borrowed_date, borrow.return_date FROM borrow JOIN bookstore ON borrow.book_id = books.id JOIN  members ON borrow.member_id = members.id ";
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO FETCH BORROWS" });
        }
        res.status(200).send({ message: "BORROWS RETRIEVED", data: results });
    });
};


const RegisterBorrow = (req, res) => {
  const { book_id, member_id, borrowed_date, return_date } = req.body;

  // =====Check book availability====
  const checkBook = "SELECT status FROM bookstore WHERE book_id = ?";
  db.query(checkBook, [book_id], (err, data) => {
    if (err) return res.status(500).send({ message: "Error checking book" });

    if (data.length === 0) {
      return res.status(404).send({ message: "Book not found" });
    }

    if (data[0].status === 'borrowed') {
      return res.status(400).send({ message: "Book is already borrowed" });
    }

    // Register the borrow
    const insertBorrow = `
      INSERT INTO borrow (book_id, member_id, borrowed_date, return_date)
      VALUES (?, ?, ?, ?)
    `;
    db.query(insertBorrow, [book_id, member_id, borrowed_date, return_date], (err2, result) => {
      if (err2) return res.status(500).send({ message: "Error saving borrow" });

      // Mark the book as borrowed
      const updateStatus = "UPDATE bookstore SET status = 'borrowed' WHERE book_id = ?";
      db.query(updateStatus, [book_id], (err3) => {
        if (err3) return res.status(500).send({ message: "Borrowed, but failed to update book status" });

        res.status(201).send({ message: "Borrow registered successfully" });
      });
    });
  });
};


const UpdateBorrow = (req, res) => {
    const { borrow_id } = req.params;
    const { book_id, member_id, borrowed_date, return_date } = req.body;
    const sql = "UPDATE borrow SET book_id = ?, member_id = ?, borrowed_date = ?, return_date = ? WHERE borrow_id = ?";
    db.query(sql, [book_id, member_id, borrowed_date, return_date, borrow_id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO UPDATE BORROW" });
        }
        res.status(200).send({ message: "BORROW UPDATED SUCCESSFULLY", result });
    });
};
const DeleteBorrow = (req, res) => {
    const { borrow_id } = req.params;
    const sql = "DELETE FROM bookstore WHERE borrow_id = ?";
    db.query(sql, [borrow_id], (err, result) => {
        if (err) {
            return res.status(500).send({ message: "FAILED TO DELETE BORROW" });
        }
        res.status(200).send({ message: "BORROW DELETED SUCCESSFULLY", result });
    });
};


module.exports ={RegisterBorrow, GetAllBorrows ,UpdateBorrow, DeleteBorrow};