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
app.use(express_1.default.json());
// ---------------------------------------------------------------||
app.post("/auth", functions_1.tokenGenerate);
app.post("/register/newUser", auth_1.authorize, functions_1.registeration);
app.get("/getallUser", auth_1.authorize, functions_1.getAllUsers);
app.post("/updateUser", auth_1.authorize, functions_1.editedUser);
app.post("/update/rentStatus", auth_1.authorize, functions_1.updateRentStatus);
// ----------------------------------------------------------------||
app.listen(5000, () => {
    console.log("universe listening on port 5000");
});
