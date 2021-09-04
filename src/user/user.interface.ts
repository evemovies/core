import { IMovie } from '../movie/movie.interface';

export interface IUser {
  _id: string;
  created: number;
  username: string;
  name: string;
  observableMovies: IMovie[];
  lastActivity: number;
  language: 'en' | 'ru';
  totalMovies: number;
  OTPCode: string;
}
