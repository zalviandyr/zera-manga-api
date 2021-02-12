import express, { Request, Response } from "express";
import HomeController from "@controllers/HomeController";
import GenreController from "@controllers/GenreController";
import ListController from "@controllers/ListController";
import DetailController from "@controllers/DetailController";
import asyncHandler from "express-async-handler";
import { rawListeners } from "process";

const router = express.Router();
class Route {
  init() {
    return [
      // Home
      this.get("/popular", (req, res) => new HomeController(req, res).popular()),
      this.get("/hot", (req, res) => new HomeController(req, res).hot()),
      this.get("/latest", (req, res) => new HomeController(req, res).latest()),
      this.get("/colored", (req, res) => new HomeController(req, res).colored()),
      this.get("/search/:query", (req, res) => new HomeController(req, res).search()),

      // List
      this.get("/manga/page/:pageNumber", (req, res) => new ListController(req, res).manga()),
      this.get("/manhua/page/:pageNumber", (req, res) => new ListController(req, res).manhua()),
      this.get("/manhwa/page/:pageNumber", (req, res) => new ListController(req, res).manhwa()),

      // Detail
      this.get("/detail/:detailSlug", (req, res) => new DetailController(req, res).manga()),
      this.get("/chapter/:detailSlug", (req, res) => new DetailController(req, res).chapter()),

      // Genre
      this.get("/genre", (req, res) => new GenreController(req, res).genres()),
      this.get("/genre/:genreSlug/page/:pageNumber", (req, res) =>
        new GenreController(req, res).genreDetail()
      ),

      // Error handler
      this.errorHandler((err, req, res, next) => {
        res.status(500).json({
          success: false,
          message: err.message,
          data: null,
        });
      }),
    ];
  }

  private get(path: string, handler: (req: Request, res: Response) => void) {
    return router.get(path, asyncHandler(handler));
  }

  private errorHandler(
    handler: (err: Error, req: Request, res: Response, next: () => void) => void
  ) {
    return router.use(handler);
  }
}

export default Route;
