import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../util/secrets';

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
      const token = jwt.sign({ user: body }, JWT_SECRET);

      return res.json({ token });
    });
  })(req, res, next);
};
