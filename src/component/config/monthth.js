export function showMonthwithTH(thisMonth) {
  let result;
  switch (parseInt(thisMonth)) {
    case 1:
      result = "มกราคม";
      break;
    case 2:
      result = "กุมภาพันธ์";
      break;
    case 3:
      result = "มีนาคม";
      break;
    case 4:
      result = "เมษายน";
      break;
    case 5:
      result = "พฤษาภาคม";
      break;
    case 6:
      result = "มิถุนายน";
      break;
    case 7:
      result = "กรกฏาคม";
      break;
    case 8:
      result = "สิงหาคม";
      break;
    case 9:
      result = "กันยายน";
      break;
    case 10:
      result = "ตุลาคม";
      break;
    case 11:
      result = "พฤศจิกายน";
      break;
    case 12:
      result = "ธันวาคม";
      break;
  }

  return result;
}

export function objectMonth() {
  let object = [];
  for (let m = 1; m <= 12; m++) {
    object.push({ mth: showMonthwithTH(m), mnum: m });
  }
  return object;
}

function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function dayofmonth(month, year) {
  console.log("!>", parseInt(month), parseInt(year));
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year
  if (parseInt(month) - 1 === 1 && isLeapYear(parseInt(year))) {
    return 29;
  }

  return daysInMonth[parseInt(month) - 1];
}
