import { Request, Response } from 'express';
import User from '../models/User';
import Movie from '../models/Movie';
import { responseFormatter } from '../util/response-formatter';
import { releaseChecker } from '../services/movie-releases/release-checker';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user._id, '-OTPCode');
  res.json(responseFormatter(true, user));
};

export const addMovie = async (req: Request, res: Response): Promise<void> => {
  const movie = req.body;
  const user = req.user;

  const movieRelease = await releaseChecker.en({
    id: movie.id,
    title: movie.title,
    year: movie.year,
  });

  if (movieRelease) {
    res.json(responseFormatter(false, 'This move has ben released already'));
    return;
  }

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
