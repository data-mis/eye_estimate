import { requestOption } from "./fetchConfig";
import { HttpConfig } from "./httpConfig";

const http = HttpConfig();

const FetchControlSetting = {
  //**ดึงจากตัวเดิมของ controlwork */
  fetchSettingworklistdata: async function (token) {
    let request = requestOption("POST", "", token);
    let httpfetch = `${http}/sheet/get_sheet`;

    try {
      let result = await fetch(httpfetch, request).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
  fetchSettingHeadsheet: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/get_sheet_head`;

    try {
      let resHeadsheet = await fetch(httpfetch, request).then((res) => {
        return res.json();
      });
      return resHeadsheet;
    } catch (error) {
      throw error;
    }
  },
  fetchgetsheetdetail: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/get_sheet_detail`;

    try {
      let resHeadsheet = await fetch(httpfetch, request).then((res) => {
        return res.json();
      });
      return resHeadsheet;
    } catch (error) {
      throw error;
    }
  },
  fetchaddsheetdetail: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/add_sheet_detail`;

    try {
      let resHeadsheet = await fetch(httpfetch, request).then((res) => {
        return res.json();
      });
      return resHeadsheet;
    } catch (error) {
      throw error;
    }
  },
  fetchdelsheetdetail: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/delete_sheet_detail`;

    try {
      let resHeadsheet = await fetch(httpfetch, request).then((res) => {
        return res.json();
      });
      return resHeadsheet;
    } catch (error) {
      throw error;
    }
  },
  fetchEditsheetdetail: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/update_sheet_detail`;

    try {
      let resultEditdetail = await fetch(httpfetch, request).then((res) => {
        // return res.json();
        return "finish";
      });
      return resultEditdetail;
    } catch (error) {
      throw error;
    }
  },
  fetchgetsheetchoice: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/get_sheet_detail_choice`;

    try {
      let resHeadsheet = await fetch(httpfetch, request).then((res) => {
        return res.json();
      });
      return resHeadsheet;
    } catch (error) {
      throw error;
    }
  },
  fetchAddnewSheet: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/add_sheet`;

    try {
      let res = await fetch(httpfetch, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchEditSheet: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/edit_sheet`;

    try {
      let res = await fetch(httpfetch, request).then((res) => {
        return res.json();
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchAddsheethead: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/add_sheet_head`;

    try {
      let res = await fetch(httpfetch, request).then((res) => {
        return "finish";
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchDelsheethead: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/delete_sheet_head`;

    try {
      let res = await fetch(httpfetch, request).then((res) => {
        return "finish";
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
  fetchUpsheethead: async function (info, token) {
    let request = requestOption("POST", info, token);
    let httpfetch = `${http}/sheet/update_sheet_head`;

    try {
      let res = await fetch(httpfetch, request).then((res) => {
        return "finish";
      });
      return res;
    } catch (error) {
      throw error;
    }
  },
};
export default FetchControlSetting;
