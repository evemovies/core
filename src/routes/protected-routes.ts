import express from 'express';
import { asyncWrapper } from '../util/async-wrapper';
import { getMovies, getMovie } from '../controllers/movies-controller';

const routes = express.Router();

routes.get('/movies', asyncWrapper(getMovies));
routes.get('/movies/:movieId', asyncWrapper(getMovie));

export default routes;
