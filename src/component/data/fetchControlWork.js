import Swal from "sweetalert2";
import { requestOption } from "./fetchConfig";
import { HttpConfig } from "./httpConfig";

const FetchControlWork = {
  //**workgroup get from path /student/get_student */
  fetchworkgroup: async function (year, token) {
    let request = requestOption("POST", year, token);
    let http = `${HttpConfig()}/student/get_student_grp`;

    try {
      let result = fetch(http, request).then((res) => {
        return res.json();
      });

      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchworksheet: async function (token) {
    let request = requestOption("POST", "", token);
    let http = `${HttpConfig()}/work/get_sheet`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchworkestimationlistwork: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/get_work_sheet`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchworklistworkadvisor: async function (token) {
    let request = requestOption("POST", "", token);
    let http = `${HttpConfig()}/work/get_work_adv`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchworkgetwork: async function (info, token) {
    console.log("อินโฟ คือมีไร บอกสิ", info);
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/get_work`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchAdddetailwork: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/add_work`;

    try {
      return await fetch(http, request).then((res) =>
        res.json().then((data) => {
          console.log("datafetch adddetailwork", data);
          return data;
        })
      );
      return "add success";
    } catch (error) {
      throw error;
    }
  },
  fetchEditdetailwork: async function (info, token) {
    console.log("check info to update!!!!", info);
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/edit_work`;

    try {
      await fetch(http, request);
      return "edit success";
    } catch (error) {
      throw error;
    }
  },
  fetchgetDataworkhead: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/get_work_head`;

    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchgetworkstudent: async function (token) {
    let request = requestOption("POST", "", token);
    let http = `${HttpConfig()}/work/get_work_student`;

    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchgetTblluwork: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/get_work_tbllu`;
    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchgetStudentfile: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/get_student_file`;

    try {
      let resJson = await fetch(http, request).then((res) => {
        return res.json();
      });
      return resJson;
    } catch (error) {
      throw error;
    }
  },
  fetchUpstudentfilework: async function (form, token) {
    console.log("formdata is >>", form);
    console.log("filesend formdata >>", form.get("work_id"));
    let request = {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    };
    let http = `${HttpConfig()}/work/upload_image_student_file`;

    try {
      await fetch(http, request).then((res) =>
        res.json().then((data) => {
          console.log(data);
        })
      );
    } catch (error) {
      throw error;
    }
  },
  fetchDelStudentfilework: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/delete_student_file`;

    try {
      let delmessage = await fetch(http, request).then((res) => {
        return res.json();
      });
      return delmessage;
    } catch (error) {
      throw error;
    }
  },
  fetchgetimagestudentfile: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/get_image_student_file`;

    try {
      console.log("imagestudentfile check >>", info);
      let resImage = await fetch(http, request).then((res) => {
        return res.json();
      });
      return resImage;
    } catch (error) {
      throw error;
    }
  },
  fetchcheckgetworkdetail: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/ck_get_work`;

    try {
      let resImage = await fetch(http, request).then((res) => {
        return res.json();
      });
      return resImage;
    } catch (error) {
      throw error;
    }
  },
  fetchdeleteworkdetail: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/work/delete_work`;

    try {
      let resImage = await fetch(http, request).then((res) => {
        console.log("delete finish");
      });
      return resImage;
    } catch (error) {
      throw error;
    }
  },
  fetchgetImagecomment: async function (info) {
    try {
      let result = await fetch(
        `${HttpConfig()}/student/getupload_image_comment`,
        requestOption("POST", info, "")
      ).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchgetPdfcomment: async function (info) {
    try {
      let result = await fetch(
        `${HttpConfig()}/student/getupload_PDF_comment`,
        requestOption("POST", info, "")
      ).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  //linenotify
  fetchLinenotify: async function (message, usertokenline) {
    let url_host = "https://datasoft.co.th:4100";
    let url_test = "http://127.0.0.1:3200";
    try {
      //เดี๋ยวจะต้องรับค่า tokenline มาเองนะจ๊ะ
      let objectforsend = {
        // grptoken: "H7XB8a4YTbHjuLob0a7y5WYdh8o9ck2e1XrnFGNC66U",
        userIdline: usertokenline,
        messageline: message,
        tokenline:
          "a1WgRpp1JcYxXzRvvIgFb1GRBwfsx1aWRO2jBjnAF+8ZkR5+bChmQ1+1sy4algb7EHqklOJyaReHBbHGyzC92sZ4WQJNz/Bg2Nzyu9QpFFu1JQ+QoNQMoBISvZykmw5XJ/bKoxnG/u43XzHIpKnUiQdB04t89/1O/w1cDnyilFU=",
      };
      if (usertokenline) {
        await fetch(
          `${url_host}/sendmessageLINEoa_addworklist`,
          requestOption("POST", objectforsend)
        ).then((res) => {
          if (res.ok) {
            console.log("message LINE is send !!!");
            Swal.fire({
              icon: "success",
              title: "สำเร็จ !!!",
              text: "ส่งรายการแจ้งเตือนไปยัง LINE OA",
              showConfirmButton: false,
              showCancelButton: false,
              timer: 2500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "ไม่สำเร็จ !!!",
              text: "ไม่สามารถส่งรายการแจ้งเตือนไปยัง LINE OA",
              showConfirmButton: false,
              showCancelButton: false,
              timer: 2500,
            });
          }
        });
      }
    } catch (error) {
      console.error("error fail LineNotify", error);
      Swal.fire({
        icon: "error",
        title: "LineNotify Fail !!!",
        text: `userIdLine : ${usertokenline}\n FetchURL : ${url_host} \n error : ${error}`,
        showConfirmButton: true,
        confirmButtonText: "ปิด",
        showCancelButton: false,
      });
    }
  },

  //linenotify rest API PHP
  fetchLinenotifyPHP: async function (message, usertokenline) {
    let objectforsendPHP = {
      tokenline:
        "a1WgRpp1JcYxXzRvvIgFb1GRBwfsx1aWRO2jBjnAF+8ZkR5+bChmQ1+1sy4algb7EHqklOJyaReHBbHGyzC92sZ4WQJNz/Bg2Nzyu9QpFFu1JQ+QoNQMoBISvZykmw5XJ/bKoxnG/u43XzHIpKnUiQdB04t89/1O/w1cDnyilFU=",
      messageline: message,
      userIdline: usertokenline,
    };
    try {
      if (usertokenline) {
        await fetch(
          `${HttpConfig()}/messageOA/addworkNotify`,
          requestOption("POST", objectforsendPHP)
        ).then((res) => {
          if (res.ok) {
            console.log("message LINE is send !!!");
            Swal.fire({
              icon: "success",
              title: "สำเร็จ !!!",
              text: "ส่งรายการแจ้งเตือนไปยัง LINE OA",
              showConfirmButton: false,
              showCancelButton: false,
              timer: 2500,
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "ไม่สำเร็จ !!!",
              text: "ไม่สามารถส่งรายการแจ้งเตือนไปยัง LINE OA",
              showConfirmButton: false,
              showCancelButton: false,
              timer: 2500,
            });
          }
        });
      }
    } catch (error) {
      console.error("error fail LineNotify", error);
      Swal.fire({
        icon: "error",
        title: "LineNotify Fail !!!",
        text: `userIdLine : ${usertokenline}\n FetchURL : ${HttpConfig()} \n error : ${error}`,
        showConfirmButton: true,
        confirmButtonText: "ปิด",
        showCancelButton: false,
      });
    }
  },
};
export default FetchControlWork;
