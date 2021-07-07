import { Request, Response } from 'express';
import User from '../models/User';
import Movie from '../models/Movie';
import { responseFormatter } from '../util/response-formatter';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user._id, '-OTPCode');
  res.json(responseFormatter(true, user));
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
  const movie = req.body;
  const user = req.user;

  await Movie.findOneAndUpdate(
    { _id: movie.id },
    {
      _id: movie.id,
      title: movie.title.replace(/ё/, 'e'),
      year: movie.year,
      posterUrl: movie.posterUrl,
      language: movie.language,
      released: false,
    },
    {
      new: true,
      upsert: true,
    }
  );

  const updatedUser = await User.findOneAndUpdate(
    {
      _id: user._id,
    },
    {
      $addToSet: { observableMovies: movie.id },
    },
    {
      new: true,
    }
  );

  res.json(responseFormatter(true, updatedUser));
};

export const removeMovie = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { observableMovies: req.body.id },
    },
    {
      new: true,
    }
  );

  res.json(responseFormatter(true, user));
};
