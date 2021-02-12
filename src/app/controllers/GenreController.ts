import Controller from "@cores/Controller";
import { cleanUrl, mangaTrim, genreTrim } from "@helpers/stringHelper";
import { genre, genreDetail } from "@constants/url";
import axios from "axios";
import cheerioModule from "cheerio";

class GenreController extends Controller {
  async genres() {
    const { data } = await axios.get(genre);
    const selector = cheerioModule.load(data);
    const root = selector(".taxindex > li");

    const responses: any[] = [];
    root.each((index, element) => {
      const genre = selector(element).text().trim();
      const genreSlug = genreTrim(selector(element).find("a").attr("href"));

      responses.push({
        genre,
        genre_slug: genreSlug,
      });
    });

    this.sendJson(responses);
  }

  async genreDetail() {
    const { genreSlug, pageNumber } = this.request.params;
    const { data } = await axios.get(genreDetail(genreSlug, pageNumber));
    const selector = cheerioModule.load(data);
    const root = selector("section.bixbox");
    const results = root.find(".bs");

    const responses: any[] = [];
    results.each((index, element) => {
      const title = selector(element).find(".bsx > a").attr("title");
      const thumb = cleanUrl(selector(element).find(".limit > img").attr("src"));
      const type = selector(element).find(".limit > .type").text();
      const rating = selector(element).find(".rating > i").text();
      const detailSlug = mangaTrim(selector(element).find(".bsx > a").attr("href"));

      responses.push({
        title,
        type,
        thumb,
        rating,
        detail_slug: detailSlug,
      });
    });

    this.sendJson(responses);
  }
}

export default GenreController;
