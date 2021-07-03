import express from 'express';
import { asyncWrapper } from '../util/async-wrapper';
import { ping } from '../controllers/general-controller';
import { getMovie, searchMovies } from '../controllers/movies-controller';
import { getUser } from '../controllers/user-controller';

const routes = express.Router();

routes.get('/general/ping', asyncWrapper(ping));

routes.get('/movies/search', asyncWrapper(searchMovies));
routes.get('/movies/:movieId', asyncWrapper(getMovie));

routes.get('/user', asyncWrapper(getUser));

export default routes;
