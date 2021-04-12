import express from 'express';
import { asyncWrapper } from '../util/async-wrapper';
import { login, requestOTPCode } from '../controllers/authentication-controller';

const routes = express.Router();

routes.post('/request-otp-code', asyncWrapper(requestOTPCode));
routes.post('/login', asyncWrapper(login));

export default routes;
