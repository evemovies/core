export interface IMovie {
  _id: string;
  title: string;
  year: number;
  posterUrl: string;
  language: 'en' | 'ru';
  released: boolean;
}
