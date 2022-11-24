"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const api_1 = require("./src/config/api");
const mail_1 = __importDefault(require("./src/routes/mail"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json({
    inflate: true,
    strict: true,
    type: 'application/json'
}));
app.use('/mail', mail_1.default);
app.listen(api_1.PORT, () => {
    console.log(`[server]: Server is running at https://localhost:${api_1.PORT}`);
});
