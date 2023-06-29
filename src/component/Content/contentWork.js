import { useEffect, useState } from "react";
import { handleModalNavSlide, handleOpenModalbox } from "../config/modalConfig";
import ModalNavSlide from "../modal/modalNavSlide";
import ModalBox from "../modal/modalBox";
import moment from "moment/moment";
import { dayofmonth, objectMonth, showMonthwithTH } from "../config/monthth";
import Cookies from "universal-cookie";
import Spinnerpage from "../config/spinnerpage";
import FetchControlWork from "../data/fetchControlWork";
import { HolderlineonTable } from "../config/holdlinetable";
import { searchGroupcontent } from "../config/searchConfig";

const ContentWork = () => {
  const docGetId = (id) => {
    return document.getElementById(id);
  };
  const docGetClass = (id) => {
    return document.getElementsByClassName(id);
  };

  const cookie = new Cookies();
  const usertoken = cookie.get("token");

  const [selectYear, setSelectYear] = useState(
    parseInt(new Date().getFullYear()) + 543
  );
  const [selectMonth, setSelectMonth] = useState(
    moment(new Date()).format("MM")
  );

  const [getselectGroup, setGetselectGroup] = useState([]);
  const [selectgrp, setSelectgrp] = useState([]);
  const [selectradioComplete, setSelectradioComplete] = useState(1);
  const [selectDataworktype, setSelectDataworktype] = useState("");
  const [getsheetwork, setGetsheetwork] = useState([]);
  const [getworklistwork, setGetworklistwork] = useState([]);
  const [getworkestimation, setGetworkestimation] = useState([]);
  const [inputtypeestimation, setInputtypeestimation] = useState("");
  const [titlegetwork, setTitlegetwork] = useState("Case&Topic ผู้นำเสนอ");
  const [getworkgetwork, setGetworkgetwork] = useState([]);
  const [filterworkgetwork, setFilterworkgetwork] = useState([]);

  const [openfilter, setOpenfilter] = useState(false);
  const [openMonthdrop, setOpenMonthdrop] = useState(false);
  const [statusClosemodal, setStatusClosemodal] = useState(false);

  const changeyear = (mode) => {
    let thisyear = parseInt(selectYear);

    if (mode) {
      let result = thisyear + 1;
      setSelectYear(result);
    } else {
      let result = thisyear - 1;
      setSelectYear(result);
    }
  };

  const nonedropAtall = () => {
    let objectIDboxgrid = [
      {
        idbox: "boxTypeReport",
      },
      { idbox: "boxPersonport" },
      {
        idbox: "boxAgroup",
      },
      { idbox: "boxAstudent" },
    ];
    let objectIDdropid = [
      {
        iddrop: "dropInfoTypeReport",
      },
      { iddrop: "dropInfoPersonport" },
      { iddrop: "dropInfogroup" },
      { iddrop: "dropInfoStudent" },
    ];

    objectIDboxgrid.map((ele) => {
      docGetId(ele.idbox).classList.remove("positionRelativeBox");
    });
    objectIDdropid.map((ele) => {
      console.log(docGetId(ele.iddrop));
      if (docGetId(ele.iddrop)) {
        docGetId(ele.iddrop).style.display = "none";
      }
    });
  };

  const handleOpenDropdown = (id, box) => {
    let lengthtable = docGetClass("table-show-info").length;
    let table = docGetClass("table-show-info");
    let theadtable = docGetClass("thaeadShowinfo");

    console.log(id);
    if (!openMonthdrop) {
      if (docGetId(id).style.display === "block") {
        if (box) {
          docGetId(box).classList.remove("positionRelativeBox");
        }

        setOpenMonthdrop(false);
        for (let i = 0; i < lengthtable; i++) {
          table[i].style.position = "relative";
          theadtable[i].style.position = "sticky";
        }
        docGetId(id).style.display = "none";
      } else {
        if (box) {
          docGetId(box).classList.add("positionRelativeBox");
        }

        setOpenMonthdrop(true);

        for (let i = 0; i < lengthtable; i++) {
          table[i].style.position = "static";
          theadtable[i].style.position = "static";
        }
        docGetId(id).style.display = "block";
      }
    } else {
      if (docGetId(id).style.display === "block") {
        if (box) {
          docGetId(box).classList.remove("positionRelativeBox");
        }

        setOpenMonthdrop(false);
        docGetId(id).style.display = "none";
      } else {
        if (box) {
          nonedropAtall();
          docGetId(box).classList.add("positionRelativeBox");
        }

        for (let i = 0; i < lengthtable; i++) {
          table[i].style.position = "static";
        }
        docGetId(id).style.display = "block";
      }
    }
  };

  const handleContentmodal = () => {
    return (
      <div className="body-modalbox-contentwork">
        {/* แบบประเมิน */}
        <div className="rowinput-modalbox-contentwork">
          <div className="boxgrid-modal-contentwork">
            <span>{`แบบประเมิน`}</span>
          </div>
          <div className="boxgrid-modal-contentwork" id="boxTypeReport">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
              value={inputtypeestimation ? inputtypeestimation : ""}
              onClick={() => {
                handleOpenDropdown("dropInfoTypeReport", "boxTypeReport");
              }}
              readOnly
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown("dropInfoTypeReport", "boxTypeReport");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfoTypeReport"
            >
              {getsheetwork ? (
                getsheetwork[0] ? (
                  getsheetwork.map((data, index) => {
                    return (
                      <div
                        className="info-dropinfotype"
                        key={index}
                        onClick={() => {
                          setInputtypeestimation(data.name);
                          handleCheckShowSpecialType(data.code);
                          handleOpenDropdown(
                            "dropInfoTypeReport",
                            "boxTypeReport"
                          );
                        }}
                      >
                        {data.name}
                      </div>
                    );
                  })
                ) : (
                  <Spinnerpage></Spinnerpage>
                )
              ) : (
                <Spinnerpage></Spinnerpage>
              )}
            </div>
          </div>
        </div>
        {/* ผู้ประเมิน */}
        <div className="rowinput-modalbox-contentwork">
          <div className="boxgrid-modal-contentwork">
            <span>{`ผู้ประเมิน`}</span>
          </div>
          <div className="boxgrid-modal-contentwork" id="boxPersonport">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown("dropInfoPersonport", "boxPersonport");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfoPersonport"
            ></div>
          </div>
        </div>
        {/* กลุ่ม */}
        <div className="rowinput-modalbox-contentwork">
          <div className="boxgrid-modal-contentwork">
            <span>{`กลุ่ม`}</span>
          </div>
          <div className="boxgrid-modal-contentwork" id="boxAgroup">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown("dropInfogroup", "boxAgroup");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfogroup"
            ></div>
          </div>
        </div>
        {/* นักศึกษาแพทย์ */}
        <div className="rowinput-modalbox-contentwork">
          <div className="boxgrid-modal-contentwork">
            <span>{`นศพ`}</span>
          </div>
          <div className="boxgrid-modal-contentwork" id="boxAstudent">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown("dropInfoStudent", "boxAstudent");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfoStudent"
            ></div>
          </div>
        </div>
        <div className="box-datetime-contentwork">
          <div className="col-datetime-contentwork">
            <div className="rowinput-modalbox-contentwork">
              <div className="timegrid-modal-contentwork">
                <span>{`วันที่`}</span>
              </div>
              <div className="timegrid-modal-contentwork">
                <input
                  className="input-rowinput-modalboxContentwork"
                  type="date"
                ></input>
              </div>
            </div>
            <div className="rowinput-modalbox-contentwork">
              <div className="timegrid-modal-contentwork">
                <span>{`เวลา`}</span>
              </div>
              <div className="timegrid-modal-contentwork">
                <div className="boxinputtimeContentwork">
                  <input type="number" className="input-timeSTS"></input>
                  <span style={{ fontSize: "15px" }}>{":"}</span>
                  <input type="number" className="input-timeSTS"></input>
                </div>
                <span style={{ margin: "0 5px" }}>{"ถึง"}</span>
                <div className="boxinputtimeContentwork">
                  <input type="number" className="input-timeSTS"></input>
                  <span style={{ fontSize: "15px" }}>{":"}</span>
                  <input type="number" className="input-timeSTS"></input>
                </div>
              </div>
            </div>
          </div>
          <div className="col-datetimesubmit-contentwork">
            <button className="btn-confirm-modalContentwork" type="button">
              {"บันทึก"}
            </button>
          </div>
        </div>
        <div className="box-special-modalboxcontentwork">
          <div
            className="infoHeade-special-boxcontentwork"
            id="boxinfoheadSpecial"
          >
            <div className="special-input-boxcontentwork">
              <div>
                <span>{"หัวข้อเรื่อง"}</span>
              </div>
              <div>
                <input type="input"></input>
                <button>
                  <i className="bi-caret-down"></i>
                </button>
              </div>
            </div>
          </div>

          <div
            className="inforeport-special-boxcontentwork"
            id="boxinforeportSpecial"
          >
            <div className="special-report-boxcontentwork">
              <div className="box-report-input">
                <div>
                  <span>{"หอผู้ป่วย"}</span>
                </div>
                <div className="inputradio-special-boxcontentwork">
                  <div>
                    <input type="radio"></input>
                    <span>{"test"}</span>
                    <input type="radio"></input>
                    <span>{"test"}</span>
                    <input type="radio"></input>
                    <span>{"test"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="special-report-boxcontentwork">
              <div className="box-report-input">
                <div>
                  <span>{"การวินิจฉัย"}</span>
                </div>
                <div className="col-boxreport-input">
                  <div className="sub-col-boxreport">
                    <div className="input-special-boxcontentwork">
                      <input type="text"></input>
                    </div>
                  </div>
                  <div className="sub-col-boxreport">
                    <div className="grid-date-subcol">
                      <div>
                        <span>{"วันที่ผู้ป่วย Admit"}</span>
                      </div>
                      <div className="date-special-boxcontentwork">
                        <input type="date"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-report-input">
                <div>
                  <span>{"ชื่อผู้ป่วย"}</span>
                </div>
                <div className="col-boxreport-input">
                  <div className="sub-col-boxreport">
                    <div className="input-special-boxcontentwork">
                      <input type="text"></input>
                    </div>
                  </div>
                  <div className="sub-col-boxreport">
                    <div className="grid-date-subcol">
                      <div>
                        <span>{"วันที่จ่าย/รับผู้ป่วย"}</span>
                      </div>
                      <div className="date-special-boxcontentwork">
                        <input type="date"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-report-input">
                <div>
                  <span>{"เลขที่โรงพยาบาล"}</span>
                </div>
                <div className="col-boxreport-input">
                  <div className="sub-col-boxreport">
                    <div className="input-special-boxcontentwork">
                      <input type="text"></input>
                    </div>
                  </div>
                  <div className="sub-col-boxreport">
                    <div className="grid-date-subcol">
                      <div>
                        <span style={{ fontSize: "11px" }}>
                          {"วันที่ส่งรายงานผู้ป่วย"}
                        </span>
                      </div>
                      <div className="date-special-boxcontentwork">
                        <input type="date"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleCheckShowSpecialType = (typesheet) => {
    let headSpecial = (status) => {
      if (status) {
        docGetId("boxinfoheadSpecial").style.display = "block";
      } else if (!status) {
        docGetId("boxinfoheadSpecial").style.display = "none";
      }
    };
    let reportSpecial = (status) => {
      if (status) {
        docGetId("boxinforeportSpecial").style.display = "block";
      } else if (!status) {
        docGetId("boxinforeportSpecial").style.display = "none";
      }
    };

    if (typesheet === "05" || typesheet === "06") {
      console.log("โชว์หัวข้อให้เลือก");
      headSpecial(true);
      reportSpecial(false);
    } else if (typesheet === "01") {
      console.log("โชว์แบบประเมินรายงานให้เลือก");
      headSpecial(false);
      reportSpecial(true);
    } else {
      console.log("ปกติ");
      headSpecial(false);
      reportSpecial(false);
    }
  };

  const handleGetdatagroup = (year, token) => {
    FetchControlWork.fetchworkgroup(year, token).then((data) => {
      setGetselectGroup(data);
    });
  };

  const handlesheetdatawork = (token) => {
    FetchControlWork.fetchworksheet(token).then((data) => {
      setGetsheetwork(data);
      console.log("typesheet", data);
      setInputtypeestimation(data[0].name);
      handleCheckShowSpecialType(data[0].code);
      setSelectDataworktype(data[0].Id);
    });
  };

  const handleworklistworkadvisor = (token) => {
    FetchControlWork.fetchworklistworkadvisor(token).then((data) => {
      setGetworklistwork(data);
      handleworkestimationlistwork(data[0].id, token);
    });
  };

  const handleworkestimationlistwork = (advisroid, token) => {
    let object = { advisor_id: advisroid };
    FetchControlWork.fetchworkestimationlistwork(object, token).then((data) => {
      setGetworkestimation(data);
    });
  };

  const handleworkgetworkdata = (infoOpp, token) => {
    FetchControlWork.fetchworkgetwork(infoOpp, token).then((data) => {
      console.log("this work/get_work-->", data);
      setGetworkgetwork(data);
    });
  };

  const handleCheckDayformonth = (
    year,
    month,
    idsheet,
    radioComplete,
    token
  ) => {
    let start = `${year}-${month}-01`;
    let end = `${year}-${month}-${dayofmonth(month, year)}`;
    let object = {
      beg: start,
      end: end,
      sheet_id: idsheet,
      complete: radioComplete,
    };

    console.log("this a req", object);
    handleworkgetworkdata(object, token);
  };

  useEffect(() => {
    handleGetdatagroup(selectYear, usertoken);
    handlesheetdatawork(usertoken);
    handleworklistworkadvisor(usertoken);
  }, []);

  return (
    <div
      className="body-contentwork"
      onClick={(e) => {
        if (e.target === docGetId("NavSlideMOdal")) {
          setOpenfilter(false);
          handleModalNavSlide(
            false,
            "NavSlideMOdal",
            "bodyNavslideModal",
            "contentNavslideModle"
          );
        }
      }}
    >
      <div className="header-contentwork">
        <div className="box-textheader-contentwork">
          <h3>{`จัดกลุ่มงานประเมิน`}</h3>
          <button
            className="btn-menu-filter"
            type="button"
            id="btnfilterWork"
            style={!openfilter ? {} : { display: "none" }}
            onClick={() => {
              setOpenfilter(true);
              handleModalNavSlide(
                true,
                "NavSlideMOdal",
                "bodyNavslideModal",
                "contentNavslideModle"
              );
            }}
          >
            <i className="bi-funnel i-btn-filter"></i>
          </button>
          <button
            className="close-btn-menu-filter"
            id="btnclosefilterwork"
            style={openfilter ? { display: "block" } : { display: "none" }}
            type="button"
            onClick={() => {
              setOpenfilter(false);
              handleModalNavSlide(
                false,
                "NavSlideMOdal",
                "bodyNavslideModal",
                "contentNavslideModle"
              );
            }}
          >
            <i className="bi-x-lg i-btn-filter"></i>
          </button>
        </div>
        <div className="box-btnclosebody-contentwork">
          <button className="btn-closebody-contentwork">{"ปิด"}</button>
        </div>
      </div>
      <div className="menu-nav-contentwork">
        {/* menu year */}
        <div className="contentwork-year">
          <span>{"ปี"}</span>
          <input
            type="number"
            className="input-year-contentwork"
            value={selectYear}
            onChange={(e) => {
              setSelectYear(e.target.value);
            }}
            onFocus={(e) => e.target.select()}
          ></input>
          <div className="box-buttonUPDOWN">
            <button
              className="this-up-year"
              onClick={() => {
                changeyear(true);
              }}
            >
              <i className="bi-caret-up"></i>
            </button>
            <button
              className="this-down-year"
              onClick={() => {
                changeyear(false);
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
          </div>
        </div>
        {/* menu month */}
        <div className="contentwork-month">
          <div>
            <span>{"เดือน"}</span>
          </div>
          <div className="dropDownBox-monthContentwork">
            <input
              type="text"
              className="input-month-contentwork"
              value={showMonthwithTH(selectMonth)}
              onClick={() => {
                handleOpenDropdown("dropMonthContentwork");
              }}
              readOnly
            ></input>
            <button
              className="this-month-drop"
              onClick={() => {
                handleOpenDropdown("dropMonthContentwork");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div className="dropinfo-Contentwork" id="dropMonthContentwork">
              {objectMonth().map((res, index) => {
                return (
                  <div
                    className="lineMonthDropinfo-contentwork"
                    key={index}
                    onClick={() => {
                      handleOpenDropdown("dropMonthContentwork");
                      setSelectMonth(res.mnum);
                      handleCheckDayformonth(
                        selectYear - 543,
                        res.mnum,
                        selectDataworktype,
                        selectradioComplete,
                        usertoken
                      );
                    }}
                  >
                    <span>{res.mth}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* menu group */}
        <div className="contentwork-group">
          <div>
            <span>{"กลุ่ม"}</span>
          </div>
          <div className="dropDownBox-groupContentwork">
            <input
              type="text"
              className="input-group-contentwork"
              value={selectgrp ? selectgrp.name : ""}
              onClick={() => {
                handleOpenDropdown("dropGroupContentwork");
              }}
              readOnly
            ></input>
            <button
              className="this-group-drop"
              onClick={() => {
                handleOpenDropdown("dropGroupContentwork");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div className="dropinfo-Contentwork" id="dropGroupContentwork">
              {getselectGroup ? (
                getselectGroup[0] ? (
                  getselectGroup.map((data, index) => {
                    return (
                      <div
                        key={index}
                        className="infogrp-box-dropinfoContentwork"
                        onClick={() => {
                          setSelectgrp({ id: data.id, name: data.name });
                          handleOpenDropdown("dropGroupContentwork");
                          let resultsearch = searchGroupcontent(
                            data.name.trim(),
                            getworkgetwork
                          );
                          console.log("res==>", resultsearch);
                          setGetworkgetwork(resultsearch);
                        }}
                      >
                        <span>{data.name}</span>
                      </div>
                    );
                  })
                ) : (
                  <Spinnerpage></Spinnerpage>
                )
              ) : (
                <Spinnerpage></Spinnerpage>
              )}
            </div>
          </div>
        </div>
        {/* menu buttonAll */}
        <div className="contentwork-buttonAll">
          <button
            type="button"
            onClick={() => {
              console.log("แก้กลุ่ม เอางานทั้งหมด");
              setSelectgrp("");
            }}
          >
            {"งานทั้งหมด"}
          </button>
        </div>
        {/* menu radiobtn */}
        <div className="this-radiobtn-contentwork">
          <div className="row-radiobtn">
            <input
              type="radio"
              value={1}
              onChange={(e) => {
                setSelectradioComplete(parseInt(e.target.value));
                handleCheckDayformonth(
                  selectYear - 543,
                  selectMonth,
                  selectDataworktype,
                  e.target.value,
                  usertoken
                );
              }}
              checked={parseInt(selectradioComplete) === 1}
            ></input>
            <span>{"ทั้งหมด"}</span>
          </div>
          <div className="row-radiobtn">
            <input
              type="radio"
              value={2}
              onChange={(e) => {
                setSelectradioComplete(parseInt(e.target.value));
                handleCheckDayformonth(
                  selectYear - 543,
                  selectMonth,
                  selectDataworktype,
                  e.target.value,
                  usertoken
                );
              }}
              checked={parseInt(selectradioComplete) === 2}
            ></input>
            <span>{"ค้างประเมิน"}</span>
          </div>
          <div className="row-radiobtn">
            <input
              type="radio"
              value={3}
              onChange={(e) => {
                setSelectradioComplete(parseInt(e.target.value));
                handleCheckDayformonth(
                  selectYear - 543,
                  selectMonth,
                  selectDataworktype,
                  e.target.value,
                  usertoken
                );
              }}
              checked={parseInt(selectradioComplete) === 3}
            ></input>
            <span>{"ประเมินแล้ว"}</span>
          </div>
        </div>
      </div>
      <div className="boxcontent-contentwork">
        <div className="colbox-contentwork">
          <div className="row-info-contentwork">
            <div className="col-info-contentwork">
              <table className="table-show-info" style={{ width: "100%" }}>
                <thead className="thaeadShowinfo">
                  <tr>
                    <th>{"งานประเมิน"}</th>
                    <th>{"ประเภท"}</th>
                  </tr>
                </thead>
                <tbody>
                  {getsheetwork.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="tableTR-worksheet"
                        id={`tr-worksheet-${index}`}
                        onClick={() => {
                          HolderlineonTable(
                            "tableTR-worksheet",
                            "tr-worksheet-",
                            index
                          );
                          setTitlegetwork(data.name);
                          handleCheckDayformonth(
                            selectYear - 543,
                            selectMonth,
                            data.Id,
                            selectradioComplete,
                            usertoken
                          );
                          setSelectDataworktype(data.Id);
                        }}
                        style={
                          index === 0 ? { border: "5px solid #01579b" } : {}
                        }
                      >
                        <td width={"90%"}>{data.name}</td>
                        <td width={"10%"}>
                          {data.type === "1" ? "กลุ่ม" : "เดี่ยว"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-info-contentwork">
              <div className="title-info-contentwork">
                <span>{titlegetwork ? `${titlegetwork}` : "-"}</span>
              </div>
              <div className="infoBoxcol-relative-contentwork">
                {getworkgetwork[0] ? (
                  <table
                    className="table-show-info"
                    style={{ width: "1020px" }}
                  >
                    <thead className="thaeadShowinfo">
                      <tr>
                        <th>{"วันที่"}</th>
                        <th>{"เวลา"}</th>
                        <th>{"กลุ่ม"}</th>
                        <th>{"อาจารย์"}</th>
                        <th>{"นักศึกษา"}</th>
                        <th>{"UP"}</th>
                        <th>{"แก้ไข"}</th>
                        <th>{"C"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getworkgetwork.map((data, index) => {
                        return (
                          <tr key={index}>
                            <td width={120}>{data.date}</td>
                            <td
                              width={120}
                            >{`${data.time_begin}-${data.time_end}`}</td>
                            <td width={50}>{data.name}</td>
                            <td width={300}>{data.advisor_name}</td>
                            <td width={300}>{data.studentname}</td>
                            <td width={50}>
                              <button>
                                <i className="bi-chevron-up"></i>
                              </button>
                            </td>
                            <td width={50}>
                              <button>
                                <i className="bi-three-dots"></i>
                              </button>
                            </td>
                            <td width={30}>
                              <input type="checkbox"></input>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <table className="table-show-info">
                    <thead className="thaeadShowinfo">
                      <tr>
                        <th>{"วันที่"}</th>
                        <th>{"เวลา"}</th>
                        <th>{"กลุ่ม"}</th>
                        <th>{"อาจารย์"}</th>
                        <th>{"นักศึกษา"}</th>
                        <th>{"UP"}</th>
                        <th>{"C"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{"(วันที่)"}</td>
                        <td>{"(เวลา)"}</td>
                        <td>{"(กลุ่ม)"}</td>
                        <td>{"(อาจารย์)"}</td>
                        <td>{"(นักศึกษา)"}</td>
                        <td>{"(UP)"}</td>
                        <td>{"(C)"}</td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {/* <table className="table-show-info">
                  <thead className="thaeadShowinfo">
                    <tr>
                      <th>{"วันที่"}</th>
                      <th>{"เวลา"}</th>
                      <th>{"กลุ่ม"}</th>
                      <th>{"อาจารย์"}</th>
                      <th>{"นักศึกษา"}</th>
                      <th>{"UP"}</th>
                      <th>{"C"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"(วันที่)"}</td>
                      <td>{"(เวลา)"}</td>
                      <td>{"(กลุ่ม)"}</td>
                      <td>{"(อาจารย์)"}</td>
                      <td>{"(นักศึกษา)"}</td>
                      <td>{"(UP)"}</td>
                      <td>{"(C)"}</td>
                    </tr>
                  </tbody>
                </table> */}
              </div>
            </div>
          </div>
          <div className="title-header-contentwork">
            <h4>{"รายละเอียดงานของอาจารย์"}</h4>
          </div>
          <div className="row-info-contentwork">
            <div className="col-info-contentwork">
              <div className="infoBoxcol-relative-contentwork">
                {getworklistwork[0] ? (
                  <table className="table-show-info" style={{ width: "100%" }}>
                    <thead className="thaeadShowinfo">
                      <tr>
                        <th>{`อาจารย์`}</th>
                        <th>{`จำนวน`}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getworklistwork.map((data, index) => {
                        return (
                          <tr
                            key={index}
                            className="tableTR-worklistwork"
                            id={`tr-worklistwork-${index}`}
                            onClick={() => {
                              handleworkestimationlistwork(data.id, usertoken);
                              HolderlineonTable(
                                "tableTR-worklistwork",
                                "tr-worklistwork-",
                                index
                              );
                            }}
                            style={
                              index === 0 ? { border: "5px solid #01579b" } : {}
                            }
                          >
                            <td width={"90%"}>{data.advisor_name}</td>
                            <td width={"10%"}>{data.num}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <Spinnerpage></Spinnerpage>
                )}
              </div>
            </div>
            <div className="col-info-contentwork">
              <div className="infoBoxcol-relative-contentwork">
                {getworkestimation[0] ? (
                  <table className="table-show-info" style={{ width: "100%" }}>
                    <thead className="thaeadShowinfo">
                      <tr>
                        <th>{`งานประเมินสะสม`}</th>
                        <th>{`จำนวน`}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getworkestimation.map((data, index) => {
                        return (
                          <tr
                            key={index}
                            className="tableTR-workestimation"
                            id={`tr-workestimation-${index}`}
                            onClick={() => {
                              HolderlineonTable(
                                "tableTR-workestimation",
                                "tr-workestimation-",
                                index
                              );
                            }}
                          >
                            <td width={"90%"}>{data.sheet_name}</td>
                            <td width={"10%"}>{data.num}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <Spinnerpage></Spinnerpage>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="colbox-contentwork">
          <div className="boxcontent-btnmenu-contentwork">
            <button
              className="btn-menu-contentwork"
              type="button"
              onClick={() => {
                handleOpenModalbox("boxAddworkDoctor");
              }}
            >
              {"เพิ่ม"}
            </button>
          </div>
          <div className="boxcontent-btnmenu-contentwork">
            <button className="btn-menu-contentwork" type="button">
              {"ลบ"}
            </button>
          </div>
        </div>
      </div>
      <ModalNavSlide
        idbox={"NavSlideMOdal"}
        selectyear={selectYear}
        yearselect={setSelectYear}
        openDrop={openMonthdrop}
        setopenDrop={setOpenMonthdrop}
      ></ModalNavSlide>
      <ModalBox
        idbox={"boxAddworkDoctor"}
        thisTitle={"เพิ่มข้อมูลงาน"}
        statusClose={setStatusClosemodal}
        content={handleContentmodal()}
      ></ModalBox>
    </div>
  );
};
export default ContentWork;
