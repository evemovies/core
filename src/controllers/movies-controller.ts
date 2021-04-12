import { Request, Response } from 'express';
import Movie from '../models/Movie';

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  res.json({
    movies: req.user.observableMovies,
  });
};

export const getMovie = async (req: Request, res: Response): Promise<void> => {
  const movie = await Movie.findById(req.params.movieId);

  res.json({
    movie,
  });
};
