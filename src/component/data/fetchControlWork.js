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
};
export default FetchControlWork;
