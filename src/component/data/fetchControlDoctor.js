import { requestOption } from "./fetchConfig";
import { HttpConfig } from "./httpConfig";

const FetchControlDoctor = {
  fetchGetDoctorteacherFull: async function (token) {
    let request = requestOption("POST", "", token);
    let http = `${HttpConfig()}/teacher/get_teacher`;

    try {
      let result = await fetch(http, request).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchAddDoctorteacher: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/teacher/add_teacher`;

    try {
      console.log("http>>>", http);
      console.log(info);
      console.log(request);
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchEditDoctorteacher: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/teacher/edit_teacher`;

    try {
      console.log("httpeit>>>", http);
      console.log("edit->", info);
      console.log("requestedit", request);

      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchDeleteDoctorteacher: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/teacher/delete_teacher`;

    try {
      console.log("httpDel", http);
      console.log("del->", info);
      console.log("reqestDel", request);
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
};

export default FetchControlDoctor;
