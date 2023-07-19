import { requestOption } from "./fetchConfig";
import { HttpConfig } from "./httpConfig";

const FetchControlGroup = {
  fetchGetGroupStudentgroup: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/group/get_group`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchGetGroupStudentAdvisor: async function (token) {
    let request = requestOption("POST", "", token);
    let http = `${HttpConfig()}/group/get_group_advisor`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });

      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchGetGroupStudentemptygroup: async function (token) {
    let request = requestOption("POST", "", token);
    let http = `${HttpConfig()}/group/get_group_student`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchGetGroupStudentingroup: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/group/get_in_group_student`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchAddGroupStudent: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/group/add_group_student`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchDeleteGroupstudentingroup: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/group/delete_group_student`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchAddGroupadvisorgroup: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/group/save_group`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchAddGroupforGroup: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/group/add_group`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchDeleteGroupforgroup: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/group/delete_group`;

    try {
      let res = await fetch(http, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchEditgroup: async function (info, token) {
    let request = requestOption("POST", info, token);
    let http = `${HttpConfig()}/group/edit_group`;

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

export default FetchControlGroup;
