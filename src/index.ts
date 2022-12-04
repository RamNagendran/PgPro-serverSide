import cors from 'cors';
import express from "express";
import dotenv, {parse} from 'dotenv';
import {authorize} from "./controller/auth";
import {getRegisteredUser, newRegisteration, updateUser} from "./db";
import {addRoom, allExpRecords, editedUser, getAllUsers, getUserRoomNo, insertExpRecord, registeration, roomInfo, tokenGenerate, updateBalance_amt, updateRentStatus, vaccateUser} from "./functions";

dotenv.config();

const app = express();
app.use(cors())

// fixing "413 Request Entity Too Large" errors
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))

// ---------------------------------------------------------------||

app.post("/auth", tokenGenerate);
app.post("/register_new_user", authorize, registeration)
app.get("/getall_user", authorize, getAllUsers)
app.post("/update_user", authorize, editedUser)
app.post("/update/rent_status", authorize, updateRentStatus)
app.post("/update/balance_amount", authorize, updateBalance_amt)
app.post("/vaccate_user", authorize, vaccateUser)
app.get("/getRoom_info", authorize, roomInfo)
app.post("/add_room", authorize, addRoom)
app.get("/get_user_room_no", authorize, getUserRoomNo)
app.post("/update_exp", authorize, insertExpRecord)
app.get("/expense_tracker", authorize, allExpRecords)

// ----------------------------------------------------------------||
app.listen(5000, () => {
    console.log("universe listening on port 5000");
})