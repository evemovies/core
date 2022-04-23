import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from 'src/movie/movie.schema';
import { MovieService } from 'src/movie/movie.service';
import { User, UserDocument } from 'src/user/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReleaseCheckerJob {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private movieService: MovieService,
    private userService: UserService,
  ) {}

  sleep(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec));
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkMovieReleases() {
    const unreleasedMovies = await this.movieService.getMoviesFromDb({ released: false });

    for (const movie of unreleasedMovies) {
      await this.sleep(0.5);

      const movieReleased = await this.movieService.checkMovieRelease(movie);

      if (movieReleased) {
        await this.movieService.markMovieAsReleased(movie.id);
        await this.userService.handleReleasedMovie(movie);
      }
    }
  }
}
