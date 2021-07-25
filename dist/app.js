"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const passport_1 = __importDefault(require("passport"));
require("./models");
require("./util/passport-setup");
const secrets_1 = require("./util/secrets");
const telegram_1 = require("./util/telegram");
const logger_1 = __importDefault(require("./util/logger"));
const protected_routes_1 = __importDefault(require("./routes/protected-routes"));
const unprotected_routes_1 = __importDefault(require("./routes/unprotected-routes"));
// Create Express server
const app = express_1.default();
// TODO: add Winston logger
telegram_1.initTelegram();
// Connect to MongoDB
mongoose_1.default
    .connect(secrets_1.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
})
    .catch((err) => {
    console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    process.exit();
});
// Express configuration
app.set('port', process.env.PORT || 3000);
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    logger_1.default.info(req.originalUrl);
    next();
});
app.use('/api/v1', unprotected_routes_1.default);
app.use('/api/v1/', (req, res, next) => {
    passport_1.default.authenticate('jwt', { session: false }, (err, user) => {
        if (!user) {
            return res.status(401).json({ success: false, error: 'Unauthorized' });
        }
        req.user = user;
        return next();
    })(req, res, next);
}, protected_routes_1.default);
app.get('*', function (req, res) {
    res.status(404).json({ success: false, error: 'Not found' });
});
exports.default = app;
//# sourceMappingURL=app.js.map