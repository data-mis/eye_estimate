import { HttpConfig } from "./httpConfig";
import Swal from "sweetalert2";
import { setCookieLogin } from "../config/cookieConfig";
import { method } from "lodash";

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
  // จัดการข้อมูลเกี่ยวกับการเข้าสู่ระบบ
  fetchLogin: async function (user, pwd, navigat) {
    let request = requestOption("POST", { username: user, password: pwd });
    let http = `${HttpConfig()}/get_login`;
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
        navigat("/main");
      }
    } catch (error) {
      console.error(error);
    }
  },
  //  จบการจัดการข้อมูลเกี่ยวกับการเข้าสู่ระบบ


  // ดึงข้อมูลตารางนักเรียน ใน StudentContent
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
      // let result = fetch(http, request).then((res) => {
      //   return res.json();
      // });

      // return result;
    } catch (error) {
      throw error;
    }
  },
  fetchAddStudent: async function (infoStudent, token) {
    let request = requestOption("POST", infoStudent, token);
    let http = `${HttpConfig()}/add_student`;

    console.log("request=>", request);
    console.log("HTTP", http);

    try {
      fetch(`${HttpConfig()}/add_student`, request).then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      );
    } catch (error) {
      throw error;
    }

    console.log("test", request);
  },
  fetchScoreStudent: async function (infoScoreStudent, token) {
    let request = requestOption("POST", infoScoreStudent, token);
    let http = `${HttpConfig()}/add_student_score`;

    try {
      fetch(`${http}`, request).then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      );
    } catch (error) {
      throw error;
    }
  },
  fetchEditstudent: async function (infoEditStudent, token) {
    let request = requestOption("POST", infoEditStudent, token);
    let http = `${HttpConfig()}/edit_student`;

    console.log(request);
    console.log(http);

    try {
      fetch(http, request).then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      );
    } catch (error) {
      throw error;
    }
  },
  fetchDelete: async function (infoDelete, token) {
    let request = requestOption("POST", infoDelete, token);
    let http = `${HttpConfig()}/delete_student`;

    console.log("มาไหม=>", request);
    try {
      fetch(`${http}`, request).then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      );
    } catch (error) {
      throw error;
    }
  },
  fetchImgae: async function (file, token) {
    let request = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: file,
    };

    let http = `${HttpConfig()}/upload_image_student`;

    try {
      fetch(http, request).then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      );
    } catch (error) {
      console.error(error);
    }
  },
  fetchGetImage: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/get_image_student`;

    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      console.log("fail");
    }
  },
  // จบ การดึงข้อมูลตารางนักเรียน ใน StudentContent

  

};

export default FetchController;
