import { Controller, Get, Param, Query, Request } from '@nestjs/common';
import { Logger, getUserForLog } from 'src/common/utils/logger';
import { IMovie } from './movie.interface';
import { MovieService } from './movie.service';
import { GetMovieByIdDto, SearchMoviesDto } from './movie.dto';

@Controller('movies')
export class MovieController {
  private readonly logger = new Logger(MovieController.name);

  constructor(private movieService: MovieService) {}

  @Get('search-movie')
  async searchMovies(@Request() req, @Query() query: SearchMoviesDto) {
    const { language, title, year } = query;

    this.logger.log(`${getUserForLog(req)} is searching for a movie with params: ${title}, ${year}, ${language}`);

    const foundMovies = await this.movieService.searchMovies({ language, title, year });

    return {
      foundMovies,
    };
  }

  @Get(':id')
  getMovieById(@Request() req, @Param() params: GetMovieByIdDto): Promise<IMovie> {
    this.logger.log(`${getUserForLog(req)} is getting movie with id ${params.id}`);

    return this.movieService.getMovieById(params.id);
  }
}
