import express from 'express';
import { asyncWrapper } from '../util/async-wrapper';
import { getMovies, getMovie } from '../controllers/movies-controller';
import { ping } from '../controllers/general-controller';

const routes = express.Router();

routes.get('/general/ping', asyncWrapper(ping));

routes.get('/movies', asyncWrapper(getMovies));
routes.get('/movies/:movieId', asyncWrapper(getMovie));

export default routes;
