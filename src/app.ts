import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { MONGODB_URI } from './util/secrets';
import routes from './routes';

// Create Express server
const app = express();

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
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

app.use('/api/v1', routes);

export default app;
