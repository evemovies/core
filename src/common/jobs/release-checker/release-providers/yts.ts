import got from 'got';
import { ICheckerConfig } from '../release-checker.interface';
import { isNumberInRage, checkStringSimilarity } from './helpers';

/**
 * Returns true if movie has been released, false otherwise
 * @param config - config to check the movie
 */
export async function ytsReleaseChecker(config: ICheckerConfig): Promise<boolean> {
  return true;
  const url = encodeURI(`https://yts.mx/api/v2/list_movies.json?query_term=${config.id}`);

  let response;

  try {
    response = await got(url);
  } catch (e) {
    return false;
  }

  const movies: any = JSON.parse(response.body).data;

  if (!movies.movies) return false;

  return movies.movies.some((movie: any) => {
    const GOOD_QUALITY = ['720p', '1080p'];
    const isGoodQuality = movie.torrents.some((torrent: any) => GOOD_QUALITY.includes(torrent.quality));

    return (
      isGoodQuality &&
      movie.imdb_code === config.id &&
      checkStringSimilarity(movie.title_english, config.title) &&
      isNumberInRage(movie.year, config.year)
    );
  });
}
