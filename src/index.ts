import cors from 'cors';
import express from "express";
import dotenv, {parse} from 'dotenv';
import {authorize} from "./controller/auth";
import {getRegisteredUser, newRegisteration, updateUser} from "./db";
import {editedUser, getAllUsers, registeration, tokenGenerate, updateRentStatus} from "./functions";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

// ---------------------------------------------------------------||

app.post("/auth", tokenGenerate);
app.post("/register/newUser", authorize, registeration)
app.get("/getallUser", authorize, getAllUsers)
app.post("/updateUser", authorize, editedUser)
app.post("/update/rentStatus", authorize, updateRentStatus)

// ----------------------------------------------------------------||
app.listen(5000, () => {
    console.log("universe listening on port 5000");
})