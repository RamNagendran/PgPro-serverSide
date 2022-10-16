import Express from "express";
// import {authorize} from "./controller/auth";
import {newRegisteration} from "./db";
import cors from 'cors';
import dotenv, {parse} from 'dotenv';
import {authorize, generateToken} from "./controller/auth";



// to load env file
dotenv.config();

const app = Express();
app.use(cors())
app.use(Express.json());


app.post("/auth", async (req: any, res: any) => {
    let token = generateToken({userId: req.userId})
    res.json(token)
});

app.post("/register/newUser", authorize, async (req: any, res: any) => {
    let registered = await newRegisteration(req.body.value)
    res.json(registered);
})


app.listen(5000, () => {
    console.log("universe listening on port 5000");
})