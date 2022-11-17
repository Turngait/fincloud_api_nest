"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MAIL_KEY = exports.MAIL_URL = exports.PORT = void 0;
exports.PORT = 8000;
exports.MAIL_URL = process.env.MAIL_URL || '';
exports.MAIL_KEY = process.env.EMAIL_KEY || '';
