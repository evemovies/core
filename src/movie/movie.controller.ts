import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { IMovie } from './movie.interface';
import { MovieService } from './movie.service';
import { ISearchResult } from './search/movie-search';
import { GetMovieByIdDto, SearchMoviesDto } from './movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('search')
  async searchMovies(@Query() query: SearchMoviesDto): Promise<ISearchResult[]> {
    const { language, title, year } = query;

    return this.movieService.searchMovies({ language, title, year });
  }

  @Get('get/:id')
  getMovieById(@Param() params: GetMovieByIdDto): Promise<IMovie> {
    return this.movieService.getMovieById(params.id);
  }

  @Get('my-movies')
  getUserMovies(@Request() req): Promise<IMovie[]> {
    return this.movieService.getUserMovies(req.user.id);
  }
}
