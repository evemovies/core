import { IsString, IsNumberString } from 'class-validator';

export class GetMovieByIdDto {
  @IsString()
  id: string;
}

export class SearchMoviesDto {
  @IsString()
  language: 'en' | 'ru';

  @IsString()
  title: string;

  @IsNumberString()
  year: number;
}
