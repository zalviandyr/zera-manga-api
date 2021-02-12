import alias from "module-alias";
import path from "path";
import express from "express";

class App {
  constructor() {
    // Alias the module for pretty import
    alias.addAliases({
      "@controllers": path.join(__dirname, "../dist/app/controllers"),
      "@cores": path.join(__dirname, "../dist/core"),
      "@helpers": path.join(__dirname, "../dist/app/helpers"),
      "@constants": path.join(__dirname, "../dist/app/constants"),
    });
  }

  init() {
    const app = express();
    return app;
  }
}

export default new App().init();
