import _ from "lodash";
import FetchController from "../data/fetchConroller";
function escapeRegExp(text) {
  if (!_.isString(text)) {
    return "";
  }
  return text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function searching(text, data) {
  const search = escapeRegExp(text);
  // console.log("check parametor is =>", search, data);
  const result = [];
  data.map((data) => {
    if (data.std_id.trim().match(parseInt(search))) {
      result.push(data);
      //   console.log(data);
    }
    if (
      data.name.trim().match(search.toString()) ||
      data.lname.trim().match(search.toString())
    ) {
      result.push(data);
      //   console.log(data);
    }
  });
  return result;
}

export function searchDoctorcontent(text, data) {
  const search = escapeRegExp(text);

  const resultSearch = [];
  if (search) {
    data.map((data) => {
      if (data.adv_id.trim().match(parseInt(search))) {
        resultSearch.push(data);
      }
      if (data.name.trim().match(search)) {
        resultSearch.push(data);
      }
      if (data.lname.trim().match(search)) {
        resultSearch.push(data);
      }
    });
  }

  return resultSearch;
}
