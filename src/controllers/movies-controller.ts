import { Request, Response } from 'express';
import Movie from '../models/Movie';

export const getMovies = async (req: Request, res: Response): Promise<void> => {
  const movies = await Movie.find();

  res.json({
    hello: movies,
  });
};
