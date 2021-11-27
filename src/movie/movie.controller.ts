import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { IMovie } from './movie.interface';
import { MovieService } from './movie.service';
import { ISearchResult } from './search/movie-search';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async searchMovies(@Query() query): Promise<ISearchResult[]> {
    if (!query.language) {
      throw new HttpException('Missing language parameter', HttpStatus.BAD_REQUEST);
    }

    if (!query.title) {
      throw new HttpException('Missing title parameter', HttpStatus.BAD_REQUEST);
    }

    const { language, title, year } = query;

    return this.movieService.searchMovies({ language, title, year });
  }

  @Get(':id')
  getMovieById(@Param() params): Promise<IMovie> {
    if (!params.id) {
      throw new HttpException('Missing movie id', HttpStatus.BAD_REQUEST);
    }

    return this.movieService.getMovieById(params.id);
  }
}
