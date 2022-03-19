import { filmopotok, imdb } from './index';

type Language = 'ru' | 'en';

interface IBaseParameters {
  title: string;
  year?: number;
}

export interface ISearchParameters extends IBaseParameters {
  language: Language;
}

export interface IReleaseCheckParameters extends IBaseParameters {
  _id: string;
  language: Language;
}

export interface ISearchResult extends IBaseParameters {
  posterUrl: string;
}

type Provider = (params: ISearchParameters) => Promise<ISearchResult[]>;

// Filter search result so that only fresh movie will be visible. Used as currentYear - number
const MOVIE_TTL = 3;

const movieSearchWrapper = (provider: Provider) => async (params: ISearchParameters) => {
  const currentYear = new Date().getFullYear();
  const { title, year, language } = params;

  // const rawResult = await provider({
  //   title,
  //   year,
  //   language,
  // });
  //
  // return rawResult.filter((movie) => movie.year >= currentYear - MOVIE_TTL);

  return [
    {
      id: 'tt0084787',
      title: 'The Thing',
      year: 1982,
      posterUrl: undefined,
    },
    {
      id: 'tt0905372',
      title: 'The Thing',
      year: 2011,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMTMxMjI0MzUyNl5BMl5BanBnXkFtZTcwNjc1NzE5NQ@@._V1_SX300.jpg',
    },
    {
      id: 'tt0097216',
      title: 'Do the Right Thing',
      year: 1989,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BODA2MjU1NTI1MV5BMl5BanBnXkFtZTgwOTU4ODIwMjE@._V1_SX300.jpg',
    },
    {
      id: 'tt0117887',
      title: 'That Thing You Do!',
      year: 1996,
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BOWVmN2ZhZjgtZGEzMy00NDkxLWI5YWQtYTE2ZTk0YzIyMzc0XkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    },
    {
      id: 'tt0253867',
      title: 'The Sweetest Thing',
      year: 2002,
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BNDIyZTkwOGEtYTFlNC00MTU4LWIyNGItYjBlYmFhNDRmYzcwXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    },
    {
      id: 'tt0482527',
      title: "It's a Boy Girl Thing",
      year: 2006,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BMjM0NzYwMDI4MF5BMl5BanBnXkFtZTgwOTU1OTkwMzE@._V1_SX300.jpg',
    },
    {
      id: 'tt0044121',
      title: 'The Thing from Another World',
      year: 1951,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BODA5MjE1MTY2Ml5BMl5BanBnXkFtZTgwNzU5MjQxMDE@._V1_SX300.jpg',
    },
    {
      id: 'tt0115640',
      title: 'Beautiful Thing',
      year: 1996,
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BYTM4OTllMzYtZmQ0YS00MDU3LTliZDktNjMzYmQ4ZjRjMmFjXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    },
    {
      id: 'tt8362852',
      title: 'Swamp Thing',
      year: 2019,
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BMGFhZDE1NWMtZDY0Yi00MWNmLTkxZGEtNzYzYzU4ZTE5NDgwXkEyXkFqcGdeQXVyNTE1NjY5Mg@@._V1_SX300.jpg',
    },
    {
      id: 'tt0090103',
      title: 'The Sure Thing',
      year: 1985,
      posterUrl:
        'https://m.media-amazon.com/images/M/MV5BNGYxYTI4MTktN2Q0OS00NjRlLTlkZDUtOTRjY2VjYjRlYjZlXkEyXkFqcGdeQXVyMjA0MzYwMDY@._V1_SX300.jpg',
    },
  ];
};

export const movieSearch = {
  en: movieSearchWrapper(imdb),
  ru: movieSearchWrapper(filmopotok),
};
