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
Object.defineProperty(exports, "__esModule", { value: true });
exports.editedUser = exports.updateRentStatus = exports.getAllUsers = exports.registeration = exports.tokenGenerate = void 0;
const auth_1 = require("../controller/auth");
const db_1 = require("../db");
const tokenGenerate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = (0, auth_1.generateToken)({ userId: req.userId });
        res.json(token);
    }
    catch (err) {
        console.log("==========", err);
    }
});
exports.tokenGenerate = tokenGenerate;
const registeration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let registered = yield (0, db_1.newRegisteration)(req.body.value);
        res.json(registered);
    }
    catch (err) {
        console.log("-----------", err);
    }
});
exports.registeration = registeration;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let users = yield (0, db_1.getRegisteredUser)();
        res.json(users);
    }
    catch (err) {
        console.log("==========", err);
    }
});
exports.getAllUsers = getAllUsers;
const updateRentStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let rentstatus = yield (0, db_1.insertRentStatus)(req.body.value);
        res.json(rentstatus);
    }
    catch (err) {
        console.log("========", err);
    }
});
exports.updateRentStatus = updateRentStatus;
const editedUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let updateusr = yield (0, db_1.updateUser)(req.body.value);
        res.json(updateusr);
    }
    catch (err) {
        console.log("==========", err);
    }
});
exports.editedUser = editedUser;
