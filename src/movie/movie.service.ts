import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
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

  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {
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

  async checkMovieRelease({ id, language, title, year }: IReleaseCheckParameters) {
    // TODO: currently default to English language
    const checkResult = await Promise.all(
      this.releaseCheckers[language || 'en'].map((checker) =>
        checker({
          id,
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
        _id: movie.id,
      },
      {
        _id: movie.id,
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
