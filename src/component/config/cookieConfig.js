import Cookies, { Cookie } from "universal-cookie";
import { decodeToken, isExpired } from "react-jwt";

const cookie = new Cookies();

export function setCookieLogin(token) {
  cookie.set("studentEyeToken", token, { path: "/", maxAge: 86400 });
}

export function checkCookieOut() {
  if (!cookie.get("studentEyeToken")) {
    console.log("lost Token");
    return false;
  } else {
    let cookies = cookie.get("studentEyeToken");
    let outExpired = isExpired(cookies);
    if (outExpired) {
      return false;
    } else {
      return true;
    }
  }
}

export function removeitCookie() {
  if (cookie.get("studentEyeToken")) {
    cookie.remove("studentEyeToken");
  }
}
