import { Request, Response } from 'express';
import { responseFormatter } from '../util/response-formatter';
import { movieSearch } from '../services/movies-search/movie-search';
import Movie from '../models/Movie';

export const getMovie = async (req: Request, res: Response): Promise<void> => {
  const movie = await Movie.findById(req.params.movieId);

  res.json(responseFormatter(true, movie));
};

export const searchMovies = async (req: Request, res: Response): Promise<void> => {
  const language = req.query.lang as 'ru' | 'en';
  const title: string = req.query.title as string;
  const year = Number(req.query.year) || undefined;

  const foundMovies = await movieSearch[language]({ title, year, language });
  res.json(responseFormatter(true, { foundMovies }));
};
