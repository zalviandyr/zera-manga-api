import Controller from "@cores/Controller";
import { mangaList, manhuaList, manhwaList } from "@constants/url";
import { cleanUrl, mangaTrim } from "@helpers/stringHelper";
import axios from "axios";
import cheerioModule from "cheerio";

class ListController extends Controller {
  async manga() {
    const { pageNumber } = this.request.params;
    const { data } = await axios.get(mangaList(pageNumber));

    this.resultResponse(data);
  }

  async manhua() {
    const { pageNumber } = this.request.params;
    const { data } = await axios.get(manhuaList(pageNumber));

    this.resultResponse(data);
  }

  async manhwa() {
    const { pageNumber } = this.request.params;
    const { data } = await axios.get(manhwaList(pageNumber));

    this.resultResponse(data);
  }

  private resultResponse(data: string) {
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

export default ListController;
