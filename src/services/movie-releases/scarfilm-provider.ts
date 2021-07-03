import got from 'got';
import cheerio from 'cheerio';
import { ICheckerConfig } from './release-checker';
import { isNumberInRage, checkStringSimilarity } from '../../util/common';

/**
 * Returns true if movie has been released, false otherwise
 * @param config - config to check the movie
 */
export async function scarfilmReleaseChecker(config: ICheckerConfig): Promise<boolean> {
  const url = encodeURI(`https://scarfilm.org/?s=${config.title}`);
  let response;

  try {
    response = await got(url);
  } catch (e) {
    return false;
  }

  let released = false;
  const $ = cheerio.load(response.body, {
    decodeEntities: false,
  });

  $('.widget-content-magone-archive-blog-rolls .shad.item').each((index, elem) => {
    if (!$(elem).html().length) return;

    if (!$(elem).find('.item-main').text().includes('Уже в сети')) return;

    let releaseNotReady = false;
    const noReleaseKeywords = ['Субтитры', 'Авторский'];
    const movieSnippet = $(elem).find('.item-snippet').text();

    noReleaseKeywords.forEach((keyword) => {
      if (movieSnippet.includes(keyword)) releaseNotReady = true;
    });

    if (releaseNotReady) return;

    const configTitle = config.title.replace(/ё/, 'е');

    const movieData = $(elem)
      .find('.item-title')
      .text()
      .replace(/ё/, 'е')
      .trim()
      .toLowerCase()
      .split(/\((\d{4})\)/);

    const movieTitle = movieData[0];
    const movieYear = movieData[1];

    if (checkStringSimilarity(movieTitle, configTitle) && isNumberInRage(+config.year, +movieYear)) {
      released = true;
    }

    return false;
  });

  return released;
}
