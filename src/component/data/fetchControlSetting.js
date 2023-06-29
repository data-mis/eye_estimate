import { requestOption } from "./fetchConfig";
import { HttpConfig } from "./httpConfig";

const FetchControlSetting = {
  //**ดึงจากตัวเดิมของ controlwork */
  fetchSettingworklistdata: async function (token) {
    let reqest = requestOption("POST", "", token);
    let http = `${HttpConfig()}/work/get_sheet`;

    try {
      let result = await fetch(http, reqest).then((res) => {
        return res.json();
      });
      return result;
    } catch (error) {
      throw error;
    }
  },
};
export default FetchControlSetting;
