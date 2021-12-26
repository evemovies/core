import { IsString } from 'class-validator';

export class MovieDto {
  @IsString()
  language: 'en' | 'ru';

  @IsString()
  title: string;

  year: number;
}

export class GetMovieByIdDto {
  @IsString()
  _id: string;
}

export class SearchMoviesDto extends MovieDto {}
