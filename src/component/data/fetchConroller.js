import { HttpConfig } from "./httpConfig";
import Swal from "sweetalert2";
import { setCookieLogin } from "../config/cookieConfig";

const requestOption = (method, objectBody, token) => {
  let request = {
    method: method,
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(objectBody),
  };

  return request;
};

const FetchController = {
  fetchLogin: async function (user, pwd, navigat) {
    console.log("ทำงาน login");
    let request = requestOption("POST", { username: user, password: pwd });
    let http = `${HttpConfig()}/get_login`;
    try {
      let result = await fetch(http, request).then((res) =>
        res.json().then((data) => {
          return data;
        })
      );
      if (parseInt(result.status) === 0) {
        Swal.fire({
          icon: "error",
          title: "การเข้าสู่ระบบผิดพลาด",
          text: "กรุณาตรวจสอบ username และ password",
          color: "#bf360c",
          showConfirmButton: false,
          timer: 1700,
        });
      } else if (parseInt(result.status) === 1) {
        setCookieLogin(result.token);
        navigat("/main");
      }
    } catch (error) {
      console.error(error);
    }
  },
  fetchStudent: async function (ayear, token) {
    let year = { year: parseInt(ayear) - 543 };
    let request = requestOption("POST", year, token);
    let http = `${HttpConfig()}/get_student`;

    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchGetTeacher: async function (token) {
    let request = requestOption("POST", "", token);
    let http = `${HttpConfig()}/get_teacher`;
    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchGetGroup: async function (year, token) {
    let request = requestOption("POST", year, token);
    let http = `${HttpConfig()}/get_classgroup`;

    try {
      let result = fetch(http, request).then((res) => {
        return res.json();
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchAddStudent: async function (infoStudent, token) {},
};

export default FetchController;
