import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './movie.schema';
import { IMovie } from './movie.interface';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<MovieDocument>) {}

  async getAllMovies(): Promise<Movie[]> {
    return this.movieModel.find();
  }

  async getMovieById(id: string): Promise<IMovie> {
    return this.movieModel.findOne({ _id: id });
  }
}
