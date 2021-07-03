import { filmopotok, imdb } from './index';

export interface ISearchParameters {
  title: string;
  year?: number;
  language: 'ru' | 'en';
}

export interface ISearchResult {
  id: string;
  title: string;
  year: number;
  posterUrl: string;
}

type Provider = (params: ISearchParameters) => Promise<ISearchResult[]>;

// Filter search result so that only fresh movie will be visible. Used as currentYear - number
const MOVIE_TTL = 3;

const movieSearchWrapper = (provider: Provider) => async (params: ISearchParameters) => {
  const currentYear = new Date().getFullYear();
  const { title, year, language } = params;

  const rawResult = await provider({
    title,
    year,
    language,
  });

  return rawResult.filter((movie) => movie.year >= currentYear - MOVIE_TTL);
};

export const movieSearch = {
  en: movieSearchWrapper(imdb),
  ru: movieSearchWrapper(filmopotok),
};
