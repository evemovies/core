import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TelegramService } from 'src/common/modules/telegram/telegram.service';
import { Movie, MovieDocument } from 'src/movie/movie.schema';
import { IMovie } from 'src/movie/movie.interface';
import { User, UserDocument } from 'src/user/user.schema';
import { Checker } from './release-checker.interface';
import { ytsReleaseChecker, scarfilmReleaseChecker } from './release-providers';

// TODO: instead of TelegramService there should be NotifierService that uses different ways to notify
@Injectable()
export class ReleaseCheckerJob {
  releaseCheckers = {
    en: [] as Checker[],
    ru: [] as Checker[],
  };

  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private telegram: TelegramService,
  ) {
    this.releaseCheckers.en.push(ytsReleaseChecker);
    this.releaseCheckers.ru.push(scarfilmReleaseChecker);
  }

  sleep(sec: number) {
    return new Promise((resolve) => setTimeout(resolve, sec));
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async checkMovieReleases() {
    const unreleasedMovies: IMovie[] = await this.movieModel.find({ released: false });

    for (const movie of unreleasedMovies) {
      await this.sleep(0.5);
      const checkResult = await Promise.all(
        this.releaseCheckers[movie.language].map((checker) =>
          checker({
            id: movie._id,
            title: movie.title,
            year: movie.year,
          }),
        ),
      );

      if (checkResult.includes(true)) {
        await this.notifyUsers(movie);
        await this.movieModel.findOneAndUpdate(
          {
            _id: movie._id,
          },
          {
            released: true,
          },
          {
            new: true,
          },
        );
      }
    }
  }

  async notifyUsers(movie: IMovie) {
    const usersToNotify = await this.userModel.find({ observableMovies: movie._id });

    for (const user of usersToNotify) {
      await this.sleep(0.5);
      await this.telegram.sendMessage(user._id, 'Movie has been released');
    }
  }
}
