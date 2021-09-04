import { Controller, Get, Param } from '@nestjs/common';
import { IMovie } from './movie.interface';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  getMovies(): Promise<IMovie[]> {
    return this.movieService.getAllMovies();
  }

  @Get(':id')
  getMovieById(@Param() params): Promise<IMovie> {
    return this.movieService.getMovieById(params.id);
  }
}
