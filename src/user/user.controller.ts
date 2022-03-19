import { Controller, Get, Post, Request, Param, UseGuards, Body, HttpStatus, HttpException } from '@nestjs/common';
import { IMovie } from 'src/movie/movie.interface';
import { MovieService } from 'src/movie/movie.service';
import { MovieDto } from './user.dto';
import { IUser } from './user.interface';
import { UserService } from './user.service';
import { UserGuard } from './user.guard';

@Controller('users')
export class UserController {
  constructor(private userService: UserService, private movieService: MovieService) {}

  @Get(':_id')
  @UseGuards(UserGuard)
  getUser(@Request() req, @Param() params): Promise<IUser> {
    return this.userService.getUserById(params._id);
  }

  @Get(':_id/movies')
  @UseGuards(UserGuard)
  getUserMovies(@Request() req) {
    const userId = req.user.id;

    return this.userService.getUserMovies(userId);
  }

  @Post(':_id/add-movie')
  @UseGuards(UserGuard)
  async addMovie(@Request() req, @Body() rawMovie: MovieDto) {
    const userId = req.user.id;
    const movie: IMovie = {
      ...rawMovie,
      _id: rawMovie.id,
    };

    // const movieReleased = await this.movieService.checkMovieRelease(movie);
    //
    // if (movieReleased) {
    //   throw new HttpException(
    //     {
    //       error: 'This movie has been released already',
    //     },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    await this.userService.addMovie(userId, movie._id);
    await this.movieService.saveMovie(movie);

    return this.userService.getUserById(userId);
  }

  @Post(':_id/remove-movie')
  @UseGuards(UserGuard)
  async removeMovie(@Request() req) {
    const userId = req.user.id;
    const movieId = req.body.id;

    await this.userService.removeMovie(userId, movieId);

    return this.userService.getUserById(userId);
  }
}
