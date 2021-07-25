import express from 'express';
import { asyncWrapper } from '../util/async-wrapper';
import { ping } from '../controllers/general-controller';
import { getMovie, searchMovies } from '../controllers/movies-controller';
import { getUser, addMovie, removeMovie } from '../controllers/user-controller';
import { logout } from '../controllers/authentication-controller';

const routes = express.Router();

routes.post('/logout', asyncWrapper(logout));

routes.get('/general/ping', asyncWrapper(ping));

routes.get('/movies/search', asyncWrapper(searchMovies));
routes.get('/movies/:movieId', asyncWrapper(getMovie));

routes.get('/user', asyncWrapper(getUser));
routes.put('/user/add-movie', asyncWrapper(addMovie));
routes.post('/user/remove-movie', asyncWrapper(removeMovie));

export default routes;
