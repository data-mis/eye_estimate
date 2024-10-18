import Swal from "sweetalert2";
import { requestOption } from "./fetchConfig";
import { HttpConfig } from "./httpConfig";
import { setCookieLogin } from "../config/cookieConfig";

export const FetchLogin = async (user, pwd, navigat) => {
    let request = requestOption("POST", { username: user, password: pwd });
    let http = `${HttpConfig()}/login/get_login`;
    try {
      let result = await fetch(http, request).then((res) =>
        res.json().then((data) => {
          return data;
        }) 
      );
      if (!result.status) {
        //true
        Swal.fire({
          icon: "error",
          title: "การเข้าสู่ระบบผิดพลาด",
          text: "กรุณาตรวจสอบ username และ password",
          color: "#bf360c",
          showConfirmButton: false,
          timer: 1700,
        });
      } else if (result.status) {
        //fasle
        setCookieLogin(result.token);
        navigat(`/main?timestamp=${new Date().getTime()}`);
      }
    } catch (error) {
      console.error(error);
    }
};
