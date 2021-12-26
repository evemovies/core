import { Controller, Get, Post, Request, Param, UseGuards, BadRequestException } from '@nestjs/common';
import { IMovie } from 'src/movie/movie.interface';
import { MovieService } from 'src/movie/movie.service';
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

  @Post(':_id/add-movie')
  @UseGuards(UserGuard)
  async addMovie(@Request() req) {
    const userId = req.user.id;
    const movie: IMovie = req.body;

    const movieReleased = await this.movieService.checkMovieRelease(movie);

    if (movieReleased) {
      throw new BadRequestException('This movie has been released already');
    }

    await this.userService.addMovie(userId, movie._id);
    await this.movieService.saveMovie(movie);
  }
}
