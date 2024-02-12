import Cookies, { Cookie } from "universal-cookie";
import { decodeToken, isExpired } from "react-jwt";

const cookie = new Cookies();

export function setCookieLogin(token) {
  cookie.set("tokenEye", token, { path: "/", maxAge: 86400 });
}

export function checkCookieOut() {
  if (!cookie.get("tokenEye")) {
    console.log("lost Token");
    return false;
  } else {
    let cookies = cookie.get("tokenEye");
    let outExpired = isExpired(cookies);
    if (outExpired) {
      return false;
    } else {
      return true;
    }
  }
}
