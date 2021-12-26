import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/user.schema';
import { Movie, MovieDocument } from './movie.schema';
import { IMovie } from './movie.interface';
import {
  movieSearch,
  ISearchParameters,
  ISearchResult,
  IReleaseCheckParameters,
} from './search-providers/movie-search';
import { Checker, ytsReleaseChecker, scarfilmReleaseChecker } from './release-checker';

@Injectable()
export class MovieService {
  releaseCheckers = {
    en: [] as Checker[],
    ru: [] as Checker[],
  };

  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {
    this.releaseCheckers.en.push(ytsReleaseChecker);
    this.releaseCheckers.ru.push(scarfilmReleaseChecker);
  }

  async getMovieById(id: string): Promise<IMovie> {
    return this.movieModel.findOne({ _id: id });
  }

  async getMoviesFromDb(filter: FilterQuery<MovieDocument>): Promise<IMovie[]> {
    return this.movieModel.find(filter);
  }

  async searchMovies({ language, title, year }: ISearchParameters): Promise<ISearchResult[]> {
    return movieSearch[language]({ title, year, language });
  }

  async checkMovieRelease({ _id, language, title, year }: IReleaseCheckParameters) {
    const checkResult = await Promise.all(
      this.releaseCheckers[language].map((checker) =>
        checker({
          _id,
          title,
          year,
        }),
      ),
    );

    return checkResult.includes(true);
  }

  async markMovieAsReleased(movieId: string): Promise<MovieDocument> {
    return this.movieModel.findOneAndUpdate(
      {
        _id: movieId,
      },
      {
        released: true,
      },
      {
        new: true,
      },
    );
  }

  async saveMovie(movie: IMovie) {
    return this.movieModel.findOneAndUpdate(
      {
        _id: movie._id,
      },
      {
        _id: movie._id,
        title: movie.title.replace(/ё/, 'e'),
        year: movie.year,
        posterUrl: movie.posterUrl,
        language: movie.language,
        released: false,
      },
      {
        new: true,
        upsert: true,
      },
    );
  }
}
