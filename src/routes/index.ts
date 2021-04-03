import express from 'express';
import { asyncWrapper } from '../util/async-wrapper';
import { getMovies } from '../controllers/movies-controller';

const routes = express.Router();

routes.get('/movies', asyncWrapper(getMovies));

export default routes;
