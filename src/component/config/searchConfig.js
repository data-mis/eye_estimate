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
  try {
    let search = escapeRegExp(textsearch);
    let totalarr = [];
    console.log(search, datagroup);
    datagroup.map((ele) => {
      if (ele.name.trim().match(search)) {
        totalarr.push(ele);
      }
    });
    return totalarr;
  } catch (error) {
    return [];
  }
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

export function searchAdvisor(textsearch, datasearch) {
  let search = escapeRegExp(textsearch);
  let resultsearch = [];

  console.log("datasearch is =>", datasearch);

  datasearch.map((data) => {
    if (data.advisor_name) {
      if (data.advisor_name.trim().match(search)) {
        resultsearch.push(data);
      }
    }
  });
  return resultsearch;
}
