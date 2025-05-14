const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")

const RegisterMember = async (req, res) => {
    const { fullname, email, password, role } = req.body;
    const hashpass = await bcrypt.hash(password, 15); // Await is still required here

    const sql = "INSERT INTO member (fullname, email, password, role) VALUE (?, ?, ?, ?)";
    db.query(sql, [fullname, email, hashpass, role], (err, result) => {
        if (err) {
            console.error(`REGISTRATION FAIL: ${err}`);
            return res.status(500).send({ message: "REGISTRATION FAIL" });
        }
        res.status(201).send({
            message: "REGISTRATION SUCCEEDED",
            result: result
        });
    });
};

const Login =(req, res)=>{
    const{email, password}=req.body;
    const sql = "SELECT * FROM member WHERE email = ?";
    db.query(sql,[email],async(err, result)=>{
        if (err) {
            return res.status(401).send({message:"Try another email"})
        }
        if (result.length==0) {
            return res.status(404).send({message:"User not found , plz register !"})
        }
        const member = result[0];
        const isMatch = await bcrypt.compare(password, member.password)
        if (!isMatch) {
            return res.status(401).send({message:"invalide password"})
        }
        const token = jwt.sign({id:member.member_id},process.env.JWT_KEY,{expiresIn:"1h"})
        res.status(201).send({
             message:"login succussefll",
             name:member.Fullname,
             token:token
            });
    });
}

const GetAllMember = (req, res) => {
    const sql = "SELECT * FROM member";
    db.query(sql, (err, result) => {
      if (err) {
        return res.status(500).send({ message: "Database error while fetching members." });
      }
      res.status(200).send({
        message: "All members retrieved successfully.",
        data: result 
    });
    });
};


const UpdateMember = (req, res) => {
    const { member_id } = req.params;
    const { fullname, email, password, role } = req.body;

    const sql = "UPDATE member SET fullname = ?, email = ?, password = ?, role = ? WHERE member_id = ?";

    db.query(sql, [fullname, email, password, role, member_id], (err, result) => {
        if (err) {
            console.error("SQL ERROR:", err);
            return res.status(400).send({ message: "FAIL TO UPDATE PLEASE TRY AGAIN" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "MEMBER NOT FOUND" }); // ✅ This would cause 404
        }

        res.status(200).send({
            message: "NOW YOU HAVE NEW INFORMATION",
            result: result
        });
    });
};

const DeleteMember =(req, res)=>{
    const {member_id} = req.params;
    
}



module.exports={RegisterMember, Login, GetAllMember, UpdateMember}