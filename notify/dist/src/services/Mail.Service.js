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
const api_1 = require("../config/api");
class MailService {
    static send(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fetch(api_1.MAIL_URL, {
                method: "POST",
                headers: { 'Content-Type': 'application/json', TOKEN: api_1.MAIL_KEY },
                body: JSON.stringify(data)
            })
                .then((res) => res.json());
        });
    }
}
exports.default = MailService;
