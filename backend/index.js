const express = require("express");
const cors = require("cors")
require("dotenv").config();
const db = require("./db");
const{RegisterMember, Login, GetAllMember, UpdateMember} = require("./Controllers/memberController.js");
const{RegisterSupplier, GetAllSuppliers, UpdateSupplier, DeleteSupplier} = require("./Controllers/supplierController.js");
const{RegisterPublisher, GetAllPublisher, UpdatePublisher, DeletePublisher} = require("./Controllers/publisherController.js");
const{ RegisterBook, GetAllBooks, UpdateBook, DeleteBook } = require("./Controllers/bookstorController.js")
const{RegisterBorrow, GetAllBorrows ,UpdateBorrow, DeleteBorrow}=require("./Controllers/borrowController")
const port = process.env.PORT || 6000;


const app = express();
app.use(cors());
app.use(express.json());


//===========member============
app.post("/RegisterMember",RegisterMember)
app.post("/login", Login)
app.get("/GetAllMember",GetAllMember)
app.put("/UpdateMember/:member_id", UpdateMember)


//===========Bookstore============
app.post("/RegisterBook",RegisterBook)
app.get("/GetAllBooks",GetAllBooks)
app.put("/UpdateBook/:book_id",UpdateBook)
app.delete("/DeleteBook",DeleteBook)


//===========Supplier============
app.post("/RegisterSupplier",RegisterSupplier);
app.get("/GetAllSuppliers",GetAllSuppliers);
app.put("/UpdateSupplier/:supplier_id",UpdateSupplier);
app.delete("/DeleteSupplier/:supplier_id",DeleteSupplier);


//===========Publisher============
app.post("/RegisterPublisher",RegisterPublisher)
app.get("/GetAllPublisher",GetAllPublisher)
app.put("/UpdatePublisher",UpdatePublisher)
app.delete("/ DeletePublisher", DeletePublisher)


//===========Borrow============
app.post("/RegisterBorrow",RegisterBorrow)
app.get("GetAllBorrows",GetAllBorrows)
app.put("/UpdateBorrow/:borrow_id",UpdateBorrow)
app.delete("/ DeleteBorrow/:borrow_id", DeleteBorrow)






app.listen(port,()=>{
    console.log(`Server is running on port of:${port} `);
})
