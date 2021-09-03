import "reflect-metadata";
import { HttpMethod } from "../types/HttpMethod";
import { MetadataKey } from "../types/MetadataKey";
import { RouteHandlerDescriptor } from "../types/RouteHandlerDescriptor";

function routeBinder(method: string) {
  return function (path: string) {
    return function (target: any, key: string, desc: RouteHandlerDescriptor) {
      Reflect.defineMetadata(MetadataKey.Path, path, target, key);
      Reflect.defineMetadata(MetadataKey.Method, method, target, key);
    };
  };
}

export const get = routeBinder(HttpMethod.Get);
export const put = routeBinder(HttpMethod.Put);
export const post = routeBinder(HttpMethod.Post);
export const del = routeBinder(HttpMethod.Delete);
export const patch = routeBinder(HttpMethod.Patch);
