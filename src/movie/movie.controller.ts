import { Controller, Get, Param, Query } from '@nestjs/common';
import { IMovie } from './movie.interface';
import { MovieService } from './movie.service';
import { GetMovieByIdDto, SearchMoviesDto } from './movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get('search-movie')
  async searchMovies(@Query() query: SearchMoviesDto) {
    const { language, title, year } = query;
    const foundMovies = await this.movieService.searchMovies({ language, title, year });

    return {
      foundMovies,
    };
  }

  @Get(':_id')
  getMovieById(@Param() params: GetMovieByIdDto): Promise<IMovie> {
    return this.movieService.getMovieById(params._id);
  }
}
