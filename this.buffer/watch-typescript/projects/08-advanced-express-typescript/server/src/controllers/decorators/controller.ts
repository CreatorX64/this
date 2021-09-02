import "reflect-metadata";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppRouter } from "../../AppRouter";
import { HttpMethod } from "../types/HttpMethod";
import { MetadataKey } from "../types/MetadataKey";

function createBodyValidator(keys: string[]): RequestHandler {
  return function (req: Request, res: Response, next: NextFunction): void {
    if (!req.body) {
      res.status(422).send("Invalid request");
      return;
    }

    for (let key of keys) {
      if (!req.body[key]) {
        res.status(422).send(`Missing property ${key}`);
        return;
      }
    }

    next();
  };
}

export function controller(routePrefix: string) {
  return function (target: Function) {
    const router = AppRouter.getInstance();

    for (let key in target.prototype) {
      const routeHandler = target.prototype[key];
      const path = Reflect.getMetadata(MetadataKey.Path, target.prototype, key);
      const method: HttpMethod = Reflect.getMetadata(
        MetadataKey.Method,
        target.prototype,
        key
      );
      const middlewares =
        Reflect.getMetadata(MetadataKey.Middleware, target.prototype, key) ||
        [];
      const requiredBodyProps =
        Reflect.getMetadata(MetadataKey.Validator, target.prototype, key) || [];
      const validator = createBodyValidator(requiredBodyProps);

      if (path) {
        router[method](
          `${routePrefix}${path}`,
          ...middlewares,
          validator,
          routeHandler
        );
      }
    }
  };
}
