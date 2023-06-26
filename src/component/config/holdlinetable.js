const docuid = (id) => {
  return document.getElementById(id);
};

const docuClassid = (id) => {
  return document.getElementsByClassName(id);
};

export const HolderlineonTable = (classid, idtable, index) => {
  let leghtTR = docuClassid(classid).length;
  for (let t = 0; t < leghtTR; t++) {
    docuClassid(classid)[t].style.border = "2px solid black";
  }
  docuid(`${idtable}${index}`).style.border = "5px solid #01579b";
};

export const clearHolderlineTable = (classid) => {
  let leghtTR = docuClassid(classid).length;
  for (let t = 0; t < leghtTR; t++) {
    docuClassid(classid)[t].style.border = "2px solid black";
  }
};
