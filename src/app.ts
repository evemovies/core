import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import './models';
import './util/passport-setup';
import { MONGODB_URI } from './util/secrets';
import { initTelegram } from './util/telegram';
import logger from './util/logger';
import protectedRoutes from './routes/protected-routes';
import unprotectedRoutes from './routes/unprotected-routes';

// Create Express server
const app = express();

// TODO: add Winston logger
initTelegram();

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, {
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(req.originalUrl);
  next();
});

app.use('/api/v1', unprotectedRoutes);
app.use(
  '/api/v1/',
  (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
      if (!user) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }

      req.user = user;
      return next();
    })(req, res, next);
  },
  protectedRoutes
);

app.get('*', function (req, res) {
  res.status(404).json({ success: false, error: 'Not found' });
});

export default app;
