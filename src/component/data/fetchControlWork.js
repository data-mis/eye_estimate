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
      await fetch(http, request);
      return "add success";
    } catch (error) {
      throw error;
    }
  },
  fetchEditdetailwork: async function (info, token) {
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
  fetchUpstudentfilework: async function (info, token) {
    let request = requestOption("post", info, token);
    let http = `${HttpConfig()}/work/upload_image_student_file`;

    try {
      let upmessage = await fetch(http, request).then((res) => {
        return res.json();
      });
      return upmessage;
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
};
export default FetchControlWork;
