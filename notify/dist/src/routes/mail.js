"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const MailController_1 = __importDefault(require("../controllers/MailController"));
const router = (0, express_1.Router)();
router.post('/send', MailController_1.default.sendMail);
exports.default = router;
