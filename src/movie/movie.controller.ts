import { Controller, Get, Param, Query } from '@nestjs/common';
import { IMovie } from './movie.interface';
import { MovieService } from './movie.service';
import { ISearchResult } from './search/movie-search';
import { GetMovieByIdDto, SearchMoviesDto } from './movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async searchMovies(@Query() query: SearchMoviesDto): Promise<ISearchResult[]> {
    const { language, title, year } = query;

    return this.movieService.searchMovies({ language, title, year });
  }

  @Get(':id')
  getMovieById(@Param() params: GetMovieByIdDto): Promise<IMovie> {
    return this.movieService.getMovieById(params.id);
  }
}
