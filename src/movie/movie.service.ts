import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { IMovie } from './movie.interface';
import { movieSearch, ISearchParameters, ISearchResult } from './search/movie-search';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async getMovieById(id: string): Promise<IMovie> {
    return this.movieModel.findOne({ _id: id });
  }

  async searchMovies({ language, title, year }: ISearchParameters): Promise<ISearchResult[]> {
    return movieSearch[language]({ title, year, language });
  }
}
