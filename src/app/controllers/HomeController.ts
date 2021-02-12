import Controller from "@cores/Controller";
import { base, search } from "@constants/url";
import { cleanUrl, mangaTrim, chapterTrim } from "@helpers/stringHelper";
import axios from "axios";
import cheerioModule from "cheerio";

class HomeController extends Controller {
  async popular() {
    const { data } = await axios.get(base);
    const selector = cheerioModule.load(data);
    const root = selector("#sidebar > .section");
    const popular = root.find(".serieslist > ul > li");

    const responses: any[] = [];
    popular.each((index, element) => {
      const thumb = cleanUrl(selector(element).find(".imgseries > a > img").attr("src"));
      const title = selector(element).find(".leftseries > h4 > .series").text();
      const author = selector(element).find(".leftseries > .author").text();
      const rating = selector(element).find(".leftseries > .loveviews").text().trim();
      const detailSlug = mangaTrim(selector(element).find(".imgseries > a").attr("href"));

      responses.push({
        title,
        thumb,
        author,
        rating,
        detail_slug: detailSlug,
      });
    });

    this.sendJson(responses);
  }

  async hot() {
    const { data } = await axios.get(base);
    const selector = cheerioModule.load(data);
    const root = selector("section.bixbox > .hotmanga");
    const hots = root.find(".bs");

    const responses: any[] = [];
    hots.each((index, element) => {
      const title = selector(element).find(".bsx > a").attr("title");
      const thumb = cleanUrl(selector(element).find(".limit > img").attr("src"));
      const type = selector(element).find(".limit > .type").text();
      const rating = selector(element).find(".rating > i").text();
      const detailSlug = mangaTrim(selector(element).find(".bsx > a").attr("href"));

      responses.push({
        title,
        thumb,
        type,
        rating,
        detail_slug: detailSlug,
      });
    });

    this.sendJson(responses);
  }

  async latest() {
    const { data } = await axios.get(base);
    const selector = cheerioModule.load(data);
    const root = selector(selector("section.bixbox").get(2));
    const latest = root.find(".bs");

    const responses: any[] = [];
    latest.each((index, element) => {
      const title = selector(element).find(".bsx > a").attr("title");
      const thumb = cleanUrl(selector(element).find(".limit > img").attr("src"));
      const type = selector(element).find(".limit > .type").text();
      const lastChapter = selector(element).find(".epxs > a").text().trim();
      const time = selector(element).find(".datech").text().trim();
      const rating = selector(element).find(".rating > i").text();
      const detailSlug = mangaTrim(selector(element).find(".bsx > a").attr("href"));
      const chapterSlug = chapterTrim(selector(element).find(".epxs > a").attr("href"));

      responses.push({
        title,
        thumb,
        type,
        last_chapter: lastChapter,
        time,
        detail_slug: detailSlug,
        chapter_slug: chapterSlug,
      });
    });

    this.sendJson(responses);
  }

  async colored() {
    const { data } = await axios.get(base);
    const selector = cheerioModule.load(data);
    const root = selector("section.bixbox > .komikbewarna");
    const hots = root.find(".bs");

    const responses: any[] = [];
    hots.each((index, element) => {
      const title = selector(element).find(".bsx > a").attr("title");
      const thumb = cleanUrl(selector(element).find(".limit > img").attr("src"));
      const type = selector(element).find(".limit > .type").text();
      const rating = selector(element).find(".rating > i").text();
      const detailSlug = mangaTrim(selector(element).find(".bsx > a").attr("href"));

      responses.push({
        title,
        thumb,
        type,
        rating,
        detail_slug: detailSlug,
      });
    });

    this.sendJson(responses);
  }

  async search() {
    const { query } = this.request.params;
    const { data } = await axios.get(search(query));
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

export default HomeController;
