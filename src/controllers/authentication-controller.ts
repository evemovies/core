import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/secrets';
import User from '../models/User';

export const login = (req: Request, res: Response, next: NextFunction): void => {
  passport.authenticate('login', async (err, user, info) => {
    if (err || !user) {
      console.log('Error', err, user, info);
      return next(err);
    }

    req.login(user, { session: false }, async (error) => {
      if (error) {
        console.log('auth error', error);
        return next(error);
      }

      const body = { _id: user._id };
      const token = jwt.sign({ user: body }, JWT_SECRET, { expiresIn: '100d' });

      return res.json({ token });
    });
  })(req, res, next);
};

export const requestOTPCode = async (req: Request, res: Response): Promise<void> => {
  // TODO: change this to something serious
  // const code = Math.floor(Math.random() * 1000)
  // When user inputs his ID, update it in DB and send it to telegram
  // telegram.sendMessage(...)
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += String(Math.floor(Math.random() * 10));
  }

  await User.findOneAndUpdate(
    {
      _id: String(req.body.user_id),
    },
    {
      OTPCode: code,
    }
  );

  res.json({});
};
