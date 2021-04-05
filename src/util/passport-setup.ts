import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JWTStrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';
import { JWT_SECRET } from './secrets';
import User from '../models/User';

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: '_id',
      passwordField: 'OTPCode',
    },
    async (userId, code, done) => {
      const user = await User.findById(userId);

      if (!user) return done(null, false, { message: 'User not found' });

      if (code !== user.OTPCode) return done(null, false, { message: 'Wrong code' });

      return done(null, user, { message: 'Success!' });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        console.log(error);
        done(error);
      }
    }
  )
);
