export interface IMovie {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
  language: 'en' | 'ru';
  released: boolean;
}
