import { Request, Response } from "express";

type ResponseBody = {
  success: boolean;
  message: string;
  data: {};
};

class Controller {
  protected response: Response;
  protected request: Request;

  constructor(req: Request, res: Response) {
    this.response = res;
    this.request = req;
  }

  protected sendJson(data: {}, message: string = "success", statusCode: number = 200) {
    const obj: ResponseBody = { success: true, message, data };
    this.response.status(statusCode).json(obj);
  }
}

export default Controller;
