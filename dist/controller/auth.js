"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.verifyToken = exports.generateToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
function generateToken(data) {
    return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '24h' });
}
exports.generateToken = generateToken;
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}
exports.verifyToken = verifyToken;
function authorize(req, res, next) {
    const authHeader = req.headers.authorization || req.body.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            error: 'No authorization header'
        });
    }
    var parts = authHeader.split(" ");
    if (parts.length != 2 || parts[0] != "Bearer") {
        return res.status(401).json({ error: 'Invalid token' });
    }
    const token = parts[1];
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
exports.authorize = authorize;
