import { Request, Response } from 'express';
import { responseFormatter } from '../util/response-formatter';
import Movie from '../models/Movie';

export const getMovie = async (req: Request, res: Response): Promise<void> => {
  const movie = await Movie.findById(req.params.movieId);

  res.json(responseFormatter(true, movie));
};
