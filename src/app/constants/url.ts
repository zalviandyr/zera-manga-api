export const base = "https://bacakomik.info/";
export const search = (query: string) => base + `?s=${query.replace(/ /g, "+")}`;

// Manga URL
export const manga = base + "manga/";
export const mangaList = (pageNumber: string) =>
  pageNumber === "1"
    ? base + "daftar-komik/?status=&type=Manga&format=&order=&title="
    : base + `daftar-komik/page/${pageNumber}/?status=&type=Manga&format=&order=&title=`;
export const manhuaList = (pageNumber: string) =>
  pageNumber === "1"
    ? base + "daftar-komik/?status=&type=Manhua&format=&order=&title="
    : base + `daftar-komik/page/${pageNumber}/?status=&type=Manhua&format=&order=&title=`;
export const manhwaList = (pageNumber: string) =>
  pageNumber === "1"
    ? base + "daftar-komik/?status=&type=Manhwa&format=&order=&title="
    : base + `daftar-komik/page/${pageNumber}/?status=&type=Manhwa&format=&order=&title=`;
export const mangaDetail = (detailSlug: string) => base + "manga/" + detailSlug;
export const chapterDetail = (detailSlug: string) => base + detailSlug;

// Genre URL
export const genre = base + "genre-komik/";
export const genreDetail = (detailSlug: string, pageNumber: string) =>
  base + "genre/" + detailSlug + "/page/" + pageNumber;
