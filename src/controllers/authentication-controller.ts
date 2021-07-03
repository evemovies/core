import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/secrets';
import { responseFormatter } from '../util/response-formatter';
import { writeMessage } from '../util/telegram';
import User from '../models/User';

export const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('login', async (err, user, info) => {
    if (err || !user) {
      console.log('Error', err, user, info);
      return res.status(401).json(responseFormatter(false, 'Wrong or outdated OTP code'));
    }

    req.login(user, { session: false }, async (error) => {
      if (error) {
        return res.status(401).json(responseFormatter(false, 'Wrong or outdated OTP code'));
      }

      const body = { _id: user._id };
      const token = jwt.sign({ user: body }, JWT_SECRET, { expiresIn: '100d' });

      await writeMessage(user._id, 'You have successfully logged in to the mobile app!');

      return res.json(responseFormatter(true, { token }));
    });
  })(req, res, next);
};

export const requestOTPCode = async (req: Request, res: Response): Promise<void> => {
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += String(Math.floor(Math.random() * 10));
  }

  const user = await User.findById(req.body.user_id);

  if (!user) {
    res.status(404).json(responseFormatter(false, 'User not found'));
    return;
  }

  // TODO: add date and make it available for 2-5 mins
  await user.updateOne({ OTPCode: code });
  await writeMessage(user._id, code);

  res.json(responseFormatter(true, {}));
};
