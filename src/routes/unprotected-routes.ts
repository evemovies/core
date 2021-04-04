import express from 'express';
import { asyncWrapper } from '../util/async-wrapper';
import { login } from '../controllers/authentication-controller';

const routes = express.Router();

routes.post('/login', asyncWrapper(login));

export default routes;
