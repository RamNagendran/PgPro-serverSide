import express from "express";
import {getRegisteredUser, newRegisteration} from "./db";
import cors from 'cors';
import dotenv, {parse} from 'dotenv';
import {authorize} from "./controller/auth";
import {getAllUsers, registeration, tokenGenerate, updateRentStatus} from "./functions";

dotenv.config();

const app = express();
app.use(cors())
app.use(express.json());

// ---------------------------------------------------------------||

app.post("/auth", tokenGenerate);
app.post("/register/newUser", authorize, registeration)
app.get("/getallUser", authorize, getAllUsers)
app.post("/update/rentStatus", authorize, updateRentStatus)

// ----------------------------------------------------------------||
app.listen(5000, () => {
    console.log("universe listening on port 5000");
})