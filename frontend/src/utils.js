import {BASE_NAME} from "./constants";

/*
given the url trim the basename from it and return
the remaining url
 */
export function trimBasename(url) {
  return url.split(BASE_NAME).join("");
}
