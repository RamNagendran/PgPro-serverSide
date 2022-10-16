"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import {authorize} from "./controller/auth";
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./controller/auth");
// to load env file
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/auth", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let token = (0, auth_1.generateToken)({ userId: req.userId });
    res.json(token);
}));
app.post("/register/newUser", auth_1.authorize, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let registered = yield (0, db_1.newRegisteration)(req.body.value);
    res.json(registered);
}));
app.listen(5000, () => {
    console.log("universe listening on port 5000");
});
