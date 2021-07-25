"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.MONGODB_URI = void 0;
const logger_1 = __importDefault(require("./logger"));
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
if (fs_1.default.existsSync('.env')) {
    logger_1.default.debug('Using .env file to supply config environment variables');
    dotenv_1.default.config({ path: '.env' });
}
else {
    logger_1.default.debug('Using .env.example file to supply config environment variables');
    dotenv_1.default.config({ path: '.env.example' }); // you can delete this after you create your own .env file!
}
exports.MONGODB_URI = process.env['MONGODB_URI'];
if (!exports.MONGODB_URI) {
    logger_1.default.error('No mongo connection string. Set MONGODB_URI environment variable.');
    process.exit(1);
}
exports.JWT_SECRET = process.env['JWT_SECRET'];
if (!exports.JWT_SECRET) {
    logger_1.default.error('No JWT secret found.');
    process.exit(1);
}
//# sourceMappingURL=secrets.js.map