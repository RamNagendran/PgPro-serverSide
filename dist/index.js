"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    console.log("You are perfect healthy.....universe blessed you a perfect health");
});
app.listen(5000, () => {
    console.log("universe listening on port 5000");
});
