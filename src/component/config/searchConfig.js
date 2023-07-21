import _ from "lodash";
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

export function searchGroupcontent(textsearch, datagroup) {
  let search = escapeRegExp(textsearch);
  let totalarr = [];
  datagroup.map((ele) => {
    if (ele.name.trim().match(search)) {
      totalarr.push(ele);
    }
  });
  return totalarr;
}

export function searchStudent(textsearch, datastudent) {
  let search = escapeRegExp(textsearch);
  let resultarr = [];

  console.log("datasearchstudent>>", datastudent);
  console.log("this textsearch >>", search);
  datastudent.map((data) => {
    if (data.id.trim().match(search)) {
      resultarr.push(data);
    } else if (data.name.trim().match(search)) {
      resultarr.push(data);
    }
  });
  // console.log("ผลการค้นหารายชื่อ นศพ >>", resultarr);
  return resultarr;
}
