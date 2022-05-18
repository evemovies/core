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

  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkMovieReleases() {
    const unreleasedMovies = await this.movieService.getMoviesFromDb({ released: false });

    for (const movie of unreleasedMovies) {
      await this.sleep(0.5);

      const movieReleased = await this.movieService.checkMovieRelease(movie);

      if (movieReleased) {
        const reason = `Movie ${movie.title} has been released`;
        await this.movieService.markMovieAsReleased(movie.id);
        await this.userService.removeMovieForUsers(movie, reason);
      }
    }
  }

  // @Cron(CronExpression.EVERY_DAY_AT_11PM)
  async checkOutdatedMovies() {
    // Found all the movies that were added long ago and delete them
    // This way release checker queue becomes cleaner
    const unixDifference = 31536000; // 1 year
    const now = new Date().getTime();

    const outdatedMovies = await this.movieService.getMoviesFromDb({
      created: {
        $lt: now - unixDifference,
      },
    });

    for (const movie of outdatedMovies) {
      const reason = `Movie ${movie.title} has been added more than a year ago and will be removed from your collection.\nIf you believe it's a mistake and it'll be released, please add it again`;
      await this.movieService.deleteMovie(movie.id);
      await this.userService.removeMovieForUsers(movie, reason);
    }
  }
}
