import Controller from "@cores/Controller";
import { mangaDetail, chapterDetail } from "@constants/url";
import { cleanUrl, getInfo, chapterTrim, chapterTrim2 } from "@helpers/stringHelper";
import axios from "axios";
import cheerioModule from "cheerio";
import puppeteer from "puppeteer";

class DetailController extends Controller {
  async manga() {
    const { detailSlug } = this.request.params;
    const { data } = await axios.get(mangaDetail(detailSlug));
    const selector = cheerioModule.load(data);
    const rootInfo = selector("section.bixbox");
    const rootChapter = selector("section.bixbox.epcheck");

    const response: any = {};
    response.title = rootInfo.find(".entry-title").text().trim();
    response.thumb = cleanUrl(rootInfo.find(".thumb > img").attr("src"));
    response.rating = rootInfo.find(".rt > .rating > strong").text().trim()?.split(" ")[1];

    // info anime
    rootInfo.find(".infox > .spe > span").each((index, element) => {
      if (index === 0) response.status = getInfo(selector(element).text());
      if (index === 1) response.type = getInfo(selector(element).text());
      if (index === 2) response.author = getInfo(selector(element).text());
      if (index === 4) response.format = getInfo(selector(element).text());
      if (index === 7) response.year = getInfo(selector(element).text());
    });

    // genre anime
    const genre: Array<string> = [];
    rootInfo.find(".infox > .genxed > a").each((index, element) => {
      genre.push(selector(element).text().trim());
    });
    response.genre = genre.join(", ");

    // synopsis
    response.synopsis = rootInfo.find(".infox > .shortseo").text();

    // chapter section - first chapter
    const firstChapter: any = {};
    firstChapter.title = rootChapter.find(".epsbaru > .epsbr").first().find("a > .barunew").text();
    firstChapter.endpoint = chapterTrim(
      rootChapter.find(".epsbaru > .epsbr").first().children("a").attr("href")
    );
    response.first_chapter = firstChapter;

    // chapter section - last chapter
    const lastChapter: any = {};
    lastChapter.title = rootChapter.find(".epsbaru > .epsbr").last().find("a > .barunew").text();
    lastChapter.endpoint = chapterTrim(
      rootChapter.find(".epsbaru > .epsbr").last().children("a").attr("href")
    );
    response.last_chapter = lastChapter;

    // chapter section - first chapter
    const chapters: Array<any> = [];
    rootChapter.find(".eplister > #chapter_list > li").each((index, element) => {
      chapters.push({
        title: selector(element).find(".epl-title").text(),
        endpoint: chapterTrim(selector(element).find("a").attr("href")),
      });
    });
    response.chapters = chapters;

    this.sendJson(response);
  }

  async chapter() {
    const { detailSlug } = this.request.params;
    const url = chapterDetail(detailSlug);
    const response: any = {};

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle0" });

    // listen response on page
    const notFound = await page.$(".notf");
    if (notFound) {
      return this.sendJson({}, "Laman tidak ditemukan");
    }

    await page.waitForSelector(".chnav");
    const prev = await page.$('a[rel="prev"]');
    const prevChapterEndpoint = await prev?.evaluate((element) => element.getAttribute("href"));
    response.prev_chapter_endpoint = chapterTrim2(prevChapterEndpoint);
    const next = await page.$('a[rel="next"]');
    const nextChapterEndpoint = await next?.evaluate((element) => element.getAttribute("href"));
    response.next_chapter_endpoint = chapterTrim2(nextChapterEndpoint);

    const elementChapter = await page.$("#readerarea");
    const result = await page.evaluate((element) => {
      const chapters = element.querySelectorAll("img");
      const chapterResult = [];
      for (let i = 0; i < chapters.length; i++) {
        chapterResult.push({
          number: chapters[i].getAttribute("data-image"),
          image: chapters[i].getAttribute("src"),
        });
      }

      return chapterResult;
    }, elementChapter);
    response.chapters = result;

    await browser.close();

    this.sendJson(response);
  }
}

export default DetailController;
