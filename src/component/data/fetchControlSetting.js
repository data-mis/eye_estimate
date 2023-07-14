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
};
export default FetchControlSetting;
