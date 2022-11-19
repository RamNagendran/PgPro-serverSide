import cors from 'cors';
import express from "express";
import dotenv, {parse} from 'dotenv';
import {authorize} from "./controller/auth";
import {getRegisteredUser, newRegisteration, updateUser} from "./db";
import {addRoom, editedUser, getAllUsers, getUserRoomNo, registeration, roomInfo, tokenGenerate, updateBalance_amt, updateRentStatus, vaccateUser} from "./functions";

dotenv.config();

const app = express();
app.use(cors())

// fixing "413 Request Entity Too Large" errors
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

// ---------------------------------------------------------------||

app.post("/auth", tokenGenerate);
app.post("/register/newUser", authorize, registeration)
app.get("/getallUser", authorize, getAllUsers)
app.post("/updateUser", authorize, editedUser)
app.post("/update/rentStatus", authorize, updateRentStatus)
app.post("/update/balance_amount", authorize, updateBalance_amt)
app.post("/vaccateUser", authorize, vaccateUser)
app.get("/getRoom_info", authorize, roomInfo)
app.post("/addRoom", authorize, addRoom)
app.get("/getUserRoom_no", authorize, getUserRoomNo)

// ----------------------------------------------------------------||
app.listen(5000, () => {
    console.log("universe listening on port 5000");
})