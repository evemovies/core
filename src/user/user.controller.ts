import { Controller, Get, Post, Request, Param, UseGuards, Body, HttpStatus, HttpException } from '@nestjs/common';
import { MovieService } from 'src/movie/movie.service';
import { Logger, getUserForLog } from 'src/common/utils/logger';
import { Public } from 'src/common/decorators/public.decorator';
import { MovieDto } from './user.dto';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';

@Controller('users')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(private userService: UserService, private movieService: MovieService) {}

  @Get(':id')
  @UseGuards(UserGuard)
  getUser(@Request() req, @Param() params) {
    const userId = params.id;
    this.logger.log(`${getUserForLog(req)} is getting user with id ${userId}`);

    return this.userService.getUserById(userId);
  }

  @Get(':id/token')
  @Public()
  getUserToken(@Param() params) {
    return this.userService.getUserToken(params.id);
  }

  @Get(':id/movies')
  @UseGuards(UserGuard)
  getUserMovies(@Request() req) {
    const userId = req.user.id;

    this.logger.log(`${getUserForLog(req)} is getting user movies for user ${userId}`);

    return this.userService.getUserMovies(userId);
  }

  @Post(':id/add-movie')
  @UseGuards(UserGuard)
  async addMovie(@Request() req, @Body() movie: MovieDto) {
    const userId = req.user.id;

    this.logger.log(`${getUserForLog(req)} is trying to add movie ${JSON.stringify(movie)}`);

    const movieReleased = await this.movieService.checkMovieRelease(movie);

    if (movieReleased) {
      throw new HttpException(
        {
          error: 'This movie has been released already',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.getUserById(userId);
    const userAlreadyHasThisMovie = user.observableMovies.some((userMovie) => userMovie.id === movie.id);

    if (userAlreadyHasThisMovie) {
      throw new HttpException(
        {
          error: 'This movie is in your library already',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.addMovie(userId, movie.id);
    await this.movieService.saveMovie(movie);

    return this.userService.getUserById(userId);
  }

  @Post(':id/remove-movie')
  @UseGuards(UserGuard)
  async removeMovie(@Request() req) {
    const userId = req.user.id;
    const movieId = req.body.id;

    this.logger.log(`${getUserForLog(req)} is trying to remove movie ${movieId}`);

    await this.userService.removeMovie(userId, movieId);

    return this.userService.getUserById(userId);
  }
}
