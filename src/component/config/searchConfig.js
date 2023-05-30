import _ from "lodash";
function escapeRegExp(text) {
  if (!_.isString(text)) {
    return "";
  }
  return text.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}

export function searching(text, data) {
  const search = escapeRegExp(text);
  //   console.log("check parametor is =>", search, data);
  const result = [];
  data.map((data) => {
    if (data.std_id.match(parseInt(search))) {
      result.push(data);
      //   console.log(data);
    }
    if (
      data.name.match(search.toString()) ||
      data.lname.match(search.toString())
    ) {
      result.push(data);
      //   console.log(data);
    }
  });
  return result;
}
