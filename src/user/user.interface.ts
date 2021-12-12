export interface IUser {
  _id: string;
  created: number;
  username: string;
  name: string;
  observableMovies: string[];
  lastActivity: number;
  language: 'en' | 'ru';
  totalMovies: number;
  OTPCode: string;
}
