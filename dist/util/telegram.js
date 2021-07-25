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
exports.writeMessage = exports.initTelegram = void 0;
const telegraf_1 = require("telegraf");
let telegram;
function initTelegram() {
    telegram = new telegraf_1.Telegram(process.env.TELEGRAM_TOKEN);
}
exports.initTelegram = initTelegram;
function writeMessage(userId, message) {
    return __awaiter(this, void 0, void 0, function* () {
        yield telegram.sendMessage(userId, message);
    });
}
exports.writeMessage = writeMessage;
//# sourceMappingURL=telegram.js.map