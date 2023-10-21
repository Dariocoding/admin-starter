import { Request, Response, NextFunction } from "express";
import { join } from "path";
import * as serveStatic from "serve-static";

const serve = serveStatic(join(__dirname, "../..", "admin", "dist"), {
  index: ["index.html"],
});

export function FrontendMiddleware(req: Request, res: Response, next: NextFunction) {
  const { url } = req;
  if (url.indexOf("/api") === 0) {
    next();
  } else {
    serve(req, res, next);
  }
}
