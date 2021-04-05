import { Request, Response } from 'express';
import User from '../models/User';
import Movie from '../models/Movie';

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const user = await User.findById(req.user.userId);
  res.json({
    movies: user.observableMovies,
  });
};

export const getMovie = async (req: Request, res: Response): Promise<void> => {
  const movie = await Movie.findById(req.params.movieId);

  res.json({
    movie,
  });
};
