import { base, manga } from "@constants/url";

/**
 * Cleaning url from query
 * @param {String} url
 */
export const cleanUrl = (url?: string) => (url ? url.replace(/(\?.*)|(#.*)/g, "") : "");

/**
 * Chapter trim for get chapter slug and remove unnecessary path
 * @param {String} chapterEndpoint
 */
export const chapterTrim = (chapterEndpoint?: string) =>
  chapterEndpoint ? chapterEndpoint.split(base)[1].replace(/\//g, "") : "";

export const chapterTrim2 = (chapterEndpoint?: any) =>
  chapterEndpoint !== undefined ? chapterEndpoint.split(base)[1].replace(/\//g, "") : "";

/**
 * Manga trim for get manga slug and remove unnecessary path
 * @param {String} mangaEndpoint
 */
export const mangaTrim = (mangaEndpoint?: string) =>
  mangaEndpoint ? mangaEndpoint.split(manga)[1].replace(/\//g, "") : "";

export const genreTrim = (genreEndpoint?: string) =>
  genreEndpoint ? genreEndpoint.split(base + "genre/")[1].replace(/\//g, "") : "";

export const getInfo = (rawInfo?: string) => {
  if (rawInfo) {
    const array = rawInfo.split(" ");
    const data = array.slice(1, array.length);
    return data.join(" ");
  } else {
    return "";
  }
};
