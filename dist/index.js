"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./controller/auth");
const functions_1 = require("./functions");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// fixing "413 Request Entity Too Large" errors
app.use(express_1.default.json({ limit: "10mb" }));
app.use(express_1.default.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }));
// ---------------------------------------------------------------||
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
app.post("/auth", functions_1.tokenGenerate);
app.post("/register/newUser", auth_1.authorize, functions_1.registeration);
app.get("/getallUser", auth_1.authorize, functions_1.getAllUsers);
app.post("/updateUser", auth_1.authorize, functions_1.editedUser);
app.post("/update/rentStatus", auth_1.authorize, functions_1.updateRentStatus);
app.post("/update/balance_amount", auth_1.authorize, functions_1.updateBalance_amt);
app.post("/vaccateUser", auth_1.authorize, functions_1.vaccateUser);
app.get("/getRoom_info", auth_1.authorize, functions_1.roomInfo);
app.post("/addRoom", auth_1.authorize, functions_1.addRoom);
app.get("/getUserRoom_no", auth_1.authorize, functions_1.getUserRoomNo);
app.post("/rent-reminder/messages", auth_1.authorize, (req, res) => {
    let messageBody = req.body.value.content;
    let phone_no = req.body.value.phoneNumber;
    client.messages.create({
        body: messageBody,
        from: "9080716503",
        to: phone_no
    }).then((resp) => {
        return res.json(resp);
    });
});
// ----------------------------------------------------------------||
app.listen(5000, () => {
    console.log("universe listening on port 5000");
});
