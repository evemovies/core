import { IsOptional } from 'class-validator';

export class MovieDto {
  id: string;
  posterUrl: string;
  released: boolean;
  title: string;
  year: number;
  // TODO: temporarily optional
  @IsOptional()
  language: 'en' | 'ru';
  @IsOptional()
  created: number;
}
