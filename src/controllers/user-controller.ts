import { Request, Response } from 'express';
import User from '../models/User';
import { responseFormatter } from '../util/response-formatter';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user._id, '-OTPCode');
  res.json(responseFormatter(true, user));
};

// export const addMovie = async (req: Request, res: Response): Promise<void> => {};
// export const removeMovie = async (req: Request, res: Response): Promise<void> => {};
