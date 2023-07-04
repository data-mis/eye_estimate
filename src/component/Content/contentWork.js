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
  const [selectgrp, setSelectgrp] = useState({ id: "", name: "" });
  const [selectradioComplete, setSelectradioComplete] = useState(1);
  const [selectDataworktype, setSelectDataworktype] = useState("");
  const [selectCodework, setSelectCodework] = useState("");
  const [getsheetwork, setGetsheetwork] = useState([]);
  const [getworklistwork, setGetworklistwork] = useState([]);
  const [getworkestimation, setGetworkestimation] = useState([]);

  const [dataeditwork, setDataeditwork] = useState([]);
  const [titlegetwork, setTitlegetwork] = useState("Case&Topic ผู้นำเสนอ");
  const [getworkgetwork, setGetworkgetwork] = useState([]);
  const [filtergetwork, setFiltergetwork] = useState([]);
  const [filteron, setFilteron] = useState(false);

  const [openfilter, setOpenfilter] = useState(false);
  const [openMonthdrop, setOpenMonthdrop] = useState(false);
  const [statusClosemodal, setStatusClosemodal] = useState(false);

  //เก็บwork
  const [inputtypeestimation, setInputtypeestimation] = useState({
    id: "",
    code: "",
    name: "",
  });
  const [advisorDocest, setAdvisorDocest] = useState({ id: "", name: "" });
  const [groupStudentest, setGroupStudentest] = useState({ id: "", name: "" });
  const [studentEst, setStudentEst] = useState({ id: "", name: "" });
  const [dateEst, setDateEst] = useState("");
  const [timebeginest, setTimebeginest] = useState("");
  const [timeendest, setTimeendest] = useState("");
  const [topicest, setTopicest] = useState("");

  const [reportWard, setReportWard] = useState("");
  const [reportDiagnosis, setReportDiagnosis] = useState("");
  const [reportDateadmit, setReportDateadmit] = useState("");
  const [reportPatient, setReportPatient] = useState("");
  const [reportDateCommit, setReportDateCommit] = useState("");
  const [reportHosnumber, setReportHosnumber] = useState("");
  const [reportDateSendpatient, setReportDateSendpatient] = useState("");

  //ตัวแปรแก้ไขwork
  const [editTypesheetwork, setEditTypesheetwork] = useState({
    id: "",
    name: "",
    code: "",
  });
  const [editadvisorDocest, setEditadvisorDocest] = useState({
    id: "",
    name: "",
  });
  const [editgroupStudentest, setEditgroupStudentest] = useState({
    id: "",
    name: "",
  });
  const [editstudentEst, setEditstudentEst] = useState({ id: "", name: "" });
  const [editdateEst, seteditdateEst] = useState("");
  const [edittimebeginest, setedittimebeginest] = useState("");
  const [edittimeendest, setedittimeendest] = useState("");

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
              value={inputtypeestimation ? inputtypeestimation.name : ""}
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
                          console.log(data);
                          setInputtypeestimation({
                            id: data.Id,
                            code: data.code,
                            name: data.name,
                          });
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
              value={advisorDocest.name}
              onClick={() => {
                handleOpenDropdown("dropInfoPersonport", "boxPersonport");
              }}
              readOnly
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
            >
              {getworklistwork[0] ? (
                getworklistwork.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="info-dropinfotype"
                      onClick={() => {
                        console.log("select a advisor:>", data);
                        setAdvisorDocest({
                          id: data.id,
                          name: data.advisor_name,
                        });
                        handleOpenDropdown(
                          "dropInfoPersonport",
                          "boxPersonport"
                        );
                      }}
                    >
                      <span>{`${data.advisor_name}`}</span>
                    </div>
                  );
                })
              ) : (
                <Spinnerpage></Spinnerpage>
              )}
            </div>
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
              id="boxinfoGroupselect"
              type="text"
              value={groupStudentest.name ? groupStudentest.name : ""}
              onClick={() => {
                handleOpenDropdown("dropInfogroup", "boxAgroup");
              }}
              readOnly
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              id="boxbtnGroupselect"
              onClick={() => {
                handleOpenDropdown("dropInfogroup", "boxAgroup");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div className="dropInfo-boxgrid-contentwork" id="dropInfogroup">
              {getselectGroup[0] ? (
                getselectGroup.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="info-dropinfotype"
                      onClick={() => {
                        setGroupStudentest({ id: data.id, name: data.name });
                        handleOpenDropdown("dropInfogroup", "boxAgroup");
                      }}
                    >
                      <span>{`${data.name}`}</span>
                    </div>
                  );
                })
              ) : (
                <Spinnerpage></Spinnerpage>
              )}
            </div>
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
              id="boxinfoStudentselect"
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              id="boxbtnStudentselect"
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
                  onChange={(e) => {
                    setDateEst(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="rowinput-modalbox-contentwork">
              <div className="timegrid-modal-contentwork">
                <span>{`เวลา`}</span>
              </div>
              <div className="timegrid-modal-contentwork">
                <div className="boxinputtimeContentwork">
                  <input
                    type="time"
                    value={timebeginest}
                    onChange={(e) => {
                      setTimebeginest(e.target.value);
                    }}
                    className="inputtime-timeSTS"
                  ></input>
                </div>
                <span style={{ margin: "0 5px" }}>{"ถึง"}</span>
                <div className="boxinputtimeContentwork">
                  <input
                    type="time"
                    value={timeendest}
                    onChange={(e) => {
                      setTimeendest(e.target.value);
                    }}
                    className="inputtime-timeSTS"
                  ></input>
                </div>
              </div>
            </div>
          </div>
          <div className="col-datetimesubmit-contentwork">
            <button
              className="btn-confirm-modalContentwork"
              type="button"
              onClick={() => {
                console.log("saveAddwork>>");
                handleSubmitAddnewWork(usertoken);
              }}
            >
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
              <div className="box-topic" id="boxtopicrelativebox">
                <input type="text" onChange={(e) => {}} readOnly></input>
                <button>
                  <i className="bi-caret-down"></i>
                </button>
                <div
                  className="dropInfo-boxgrid-contentwork"
                  id="dropInfotopic"
                >
                  <div
                    onClick={() => {
                      setTopicest("(thistopic)");
                    }}
                  >
                    <span></span>
                  </div>
                </div>
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
                    <input
                      type="radio"
                      value={"จักษุ1(ช)"}
                      onChange={(e) => {
                        setReportWard(e.target.value);
                      }}
                      checked={reportWard === "จักษุ1(ช)"}
                    ></input>
                    <span>{"test"}</span>
                    <input
                      type="radio"
                      value={"จักษุ2(ญ)"}
                      onChange={(e) => {
                        setReportWard(e.target.value);
                      }}
                      checked={reportWard === "จักษุ2(ญ)"}
                    ></input>
                    <span>{"test"}</span>
                    <input
                      type="radio"
                      value={"พิเศษ"}
                      onChange={(e) => {
                        setReportWard(e.target.value);
                      }}
                      checked={reportWard === "พิเศษ"}
                    ></input>
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
                      <input
                        type="text"
                        onChange={(e) => {
                          setReportDiagnosis(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  <div className="sub-col-boxreport">
                    <div className="grid-date-subcol">
                      <div>
                        <span>{"วันที่ผู้ป่วย Admit"}</span>
                      </div>
                      <div className="date-special-boxcontentwork">
                        <input
                          type="date"
                          onChange={(e) => {
                            setReportDateadmit(e.target.value);
                          }}
                        ></input>
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
                      <input
                        type="text"
                        onChange={(e) => {
                          setReportPatient(e.target.value);
                        }}
                      ></input>
                    </div>
                  </div>
                  <div className="sub-col-boxreport">
                    <div className="grid-date-subcol">
                      <div>
                        <span>{"วันที่จ่าย/รับผู้ป่วย"}</span>
                      </div>
                      <div className="date-special-boxcontentwork">
                        <input
                          type="date"
                          onChange={(e) => {
                            setReportDateCommit(e.target.value);
                          }}
                        ></input>
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
                      <input
                        type="text"
                        onChange={(e) => {
                          setReportHosnumber(e.target.value);
                        }}
                      ></input>
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
                        <input
                          type="date"
                          onChange={(e) => {
                            setReportDateSendpatient(e.target.value);
                          }}
                        ></input>
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

  const handleEditworkmodal = () => {
    return (
      <div className="body-modalbox-contentwork">
        {/* แบบประเมิน */}
        <div className="rowinput-modalbox-contentwork">
          <div className="boxgrid-modal-contentwork">
            <span>{`แบบประเมิน`}</span>
          </div>
          <div className="boxgrid-modal-contentwork" id="boxTypeReportEdit">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
              value={editTypesheetwork.name}
              onClick={() => {
                handleOpenDropdown(
                  "dropInfoTypeReportEdit",
                  "boxTypeReportEdit"
                );
              }}
              readOnly
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown(
                  "dropInfoTypeReportEdit",
                  "boxTypeReportEdit"
                );
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfoTypeReportEdit"
            >
              {getsheetwork ? (
                getsheetwork[0] ? (
                  getsheetwork.map((data, index) => {
                    return (
                      <div
                        className="info-dropinfotype"
                        key={index}
                        onClick={() => {
                          // console.log(">>>>", data);
                          handleCheckShowSpecialType(data.code);
                          handleOpenDropdown(
                            "dropInfoTypeReportEdit",
                            "boxTypeReportEdit"
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
              value={editadvisorDocest.name}
              readOnly
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
              id="boxeditinfoGroupselect"
              defaultValue={groupStudentest.name}
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              id="boxeditbtnGroupselect"
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
              id="boxeditinfoStudentselect"
              value={editstudentEst.name}
              readOnly
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              id="boxeditbtnStudentselect"
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
                  defaultValue={editdateEst !== undefined ? editdateEst : ""}
                ></input>
              </div>
            </div>
            <div className="rowinput-modalbox-contentwork">
              <div className="timegrid-modal-contentwork">
                <span>{`เวลา`}</span>
              </div>
              <div className="timegrid-modal-contentwork">
                <div className="boxinputtimeContentwork">
                  <input
                    type="time"
                    className="inputtime-timeSTS"
                    defaultValue={edittimebeginest}
                  ></input>
                </div>
                <span style={{ margin: "0 5px" }}>{"ถึง"}</span>
                <div className="boxinputtimeContentwork">
                  <input
                    type="time"
                    className="inputtime-timeSTS"
                    defaultValue={edittimeendest}
                  ></input>
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
            id="boxeditinfoheadSpecial"
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
            id="boxeditinforeportSpecial"
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
        docGetId("boxeditinfoheadSpecial").style.display = "block";
      } else if (!status) {
        docGetId("boxinfoheadSpecial").style.display = "none";
        docGetId("boxeditinfoheadSpecial").style.display = "none";
      }
    };
    let reportSpecial = (status) => {
      if (status) {
        docGetId("boxinforeportSpecial").style.display = "block";
        docGetId("boxeditinforeportSpecial").style.display = "block";
      } else if (!status) {
        docGetId("boxinforeportSpecial").style.display = "none";
        docGetId("boxeditinforeportSpecial").style.display = "none";
      }
    };
    let groupandstudent = (status) => {
      if (status) {
        docGetId("boxinfoGroupselect").style.display = "block";
        docGetId("boxbtnGroupselect").style.display = "block";
        docGetId("boxinfoStudentselect").style.display = "none";
        docGetId("boxbtnStudentselect").style.display = "none";
        docGetId("boxeditinfoGroupselect").style.display = "block";
        docGetId("boxeditbtnGroupselect").style.display = "block";
        docGetId("boxeditinfoStudentselect").style.display = "none";
        docGetId("boxeditbtnStudentselect").style.display = "none";
      } else {
        docGetId("boxinfoGroupselect").style.display = "none";
        docGetId("boxbtnGroupselect").style.display = "none";
        docGetId("boxinfoStudentselect").style.display = "block";
        docGetId("boxbtnStudentselect").style.display = "block";
        docGetId("boxeditinfoGroupselect").style.display = "none";
        docGetId("boxeditbtnGroupselect").style.display = "none";
        docGetId("boxeditinfoStudentselect").style.display = "block";
        docGetId("boxeditbtnStudentselect").style.display = "block";
      }
    };

    if (typesheet === "05" || typesheet === "06") {
      // console.log("โชว์หัวข้อให้เลือก");
      headSpecial(true);
      reportSpecial(false);
      groupandstudent(true);
    } else if (typesheet === "01") {
      console.log("โชว์แบบประเมินรายงานให้เลือก");
      headSpecial(false);
      reportSpecial(true);
      groupandstudent(false);
    } else if (typesheet === "02") {
      groupandstudent(false);
      headSpecial(false);
      reportSpecial(false);
    } else {
      // console.log("ปกติ");
      headSpecial(false);
      reportSpecial(false);
      groupandstudent(true);
    }
  };

  const handleGetdatagroup = (year, token) => {
    FetchControlWork.fetchworkgroup(year, token).then((data) => {
      setGetselectGroup(data);
    });
  };

  const handlesheetdatawork = (token) => {
    FetchControlWork.fetchworksheet(token).then((data) => {
      // console.log("this data have ???", data);
      setGetsheetwork(data);
      console.log("typesheet", data);
      setInputtypeestimation({
        id: data[0].Id,
        code: data[0].code,
        name: data[0].name,
      });
      handleCheckShowSpecialType(data[0].code);
      setSelectDataworktype(data[0].Id);
      handleCheckDayformonth(
        selectYear - 543,
        selectMonth,
        data[0].Id,
        selectradioComplete,
        usertoken
      );
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
      setGetworkgetwork(data);
      console.log("อะไรเนี้ย>>>", data);
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

    handleworkgetworkdata(object, token);
  };

  const handleSearchGroupinfowork = (data) => {
    console.log("งงอะ", getworkgetwork);
    let resultsearch = searchGroupcontent(data.name.trim(), getworkgetwork);
    setFiltergetwork(resultsearch);
    setFilteron(true);
  };

  const handleAllgroupinfowork = () => {
    setFilteron(false);
    handleCheckDayformonth(
      selectYear - 543,
      selectMonth,
      selectDataworktype,
      selectradioComplete,
      usertoken
    );
  };

  const handleSubmitAddnewWork = (token) => {
    let typecase = inputtypeestimation.code;

    switch (typecase) {
      case "01": //**report*/
        let objectreport = {
          sheet_code: inputtypeestimation.code,
          sheet_id: inputtypeestimation.id,
          advisor_id: advisorDocest.id,
          student_id: studentEst.id,
          date: dateEst,
          time_begin: timebeginest,
          time_end: timeendest,
        };
        console.log("object for add report>>>", objectreport);
        break;
      case "02": //**progressnote */
        let objectprogressnote = {
          sheet_code: inputtypeestimation.code,
          sheet_id: inputtypeestimation.id,
          advisor_id: advisorDocest.id,
          student_id: studentEst.id,
          date: dateEst,
          time_begin: timeendest,
          time_end: timeendest,
        };
        console.log("object for add progressnote >>>", objectprogressnote);
        break;
      case "03": //**opd teaching */
        let objectteaching = {
          sheet_code: inputtypeestimation.code,
          sheet_id: inputtypeestimation.id,
          advisor_id: advisorDocest.id,
          grp_id: groupStudentest.id,
          date: dateEst,
          time_begin: timeendest,
          time_end: timeendest,
        };
        console.log("object for add teaching >>>", objectteaching);

        break;
      case "04": //**wardround*/
        let objectwardround = {
          sheet_code: inputtypeestimation.code,
          sheet_id: inputtypeestimation.id,
          advisor_id: advisorDocest.id,
          grp_id: groupStudentest.id,
          date: dateEst,
          time_begin: timeendest,
          time_end: timeendest,
        };
        console.log("object for add wardrond >>>", objectwardround);

        break;
      case "05": //**case & topic นำเสนอ */
        let ojbectcasetopicShow = {
          sheet_code: inputtypeestimation.code,
          sheet_id: inputtypeestimation.id,
          advisor_id: advisorDocest.id,
          grp_id: groupStudentest.id,
          date: dateEst,
          time_begin: timebeginest,
          time_end: timeendest,
          txt_val: topicest,
        };
        console.log("object for add objectcaseshow >>>", ojbectcasetopicShow);
        break;
      case "06": //**case & topic ผู้ร่วม */
        let objectcasecoop = {
          sheet_code: inputtypeestimation.code,
          sheet_id: inputtypeestimation.id,
          advisor_id: advisorDocest.id,
          grp_id: groupStudentest.id,
          date: dateEst,
          time_begin: timebeginest,
          time_end: timeendest,
          txt_val: topicest,
        };
        console.log("object for add objectcaseshow >>>", objectcasecoop);
        break;
      case "07": //**flipped classroom */
        let objectflipped = {
          sheet_code: inputtypeestimation.code,
          sheet_id: inputtypeestimation.id,
          advisor_id: advisorDocest.id,
          grp_id: groupStudentest.id,
          date: dateEst,
          time_begin: timeendest,
          time_end: timeendest,
        };
        console.log("object for add flipped >>>", objectflipped);
        break;
    }
  };

  const handlecaseEditwork = (code, aData) => {
    setEditTypesheetwork({
      id: aData.sheet_id,
      name: aData.sheet_name,
      code: code,
    });
    setEditadvisorDocest({
      id: aData.advisor_id !== "" ? aData.advisor_id : "",
      name: aData.advisor_name !== "" ? aData.advisor_name : "",
    });
    console.log(aData.student_name !== "" ? aData.student_name : "");
    setGroupStudentest({
      id: aData.grp_id !== "" ? aData.grp_id : "",
      name: aData.name !== "" ? aData.name : "",
    });
    setEditstudentEst({
      id: aData.student_id !== "" ? aData.student_id : "",
      name: aData.student_name !== "" ? aData.student_name : "",
    });
    seteditdateEst(aData.date !== "" ? aData.date : "0000-00-00");
    setedittimebeginest(aData.time_begin !== "" ? aData.time_begin : "");
    setedittimeendest(aData.time_end !== "" ? aData.time_end : "");
    handleCheckShowSpecialType(code);
    console.log("code is =>", code);
    console.log("data is =>", aData);
    switch (code) {
      case "01":
        setReportWard();
        setReportDiagnosis();
        setReportPatient();
        setReportHosnumber();
        setReportDateadmit();
        setReportDateSendpatient();
        setReportDateSendpatient();
        break;
      case "05":
        setTopicest();
        break;
      case "06":
        setTopicest();
        break;
    }
  };

  useEffect(() => {
    handleGetdatagroup(selectYear, usertoken);
    handlesheetdatawork(usertoken);
    handleworklistworkadvisor(usertoken);
  }, []);

  useEffect(() => {
    if (selectgrp.name) {
      handleSearchGroupinfowork(selectgrp);
    }
  }, [getworkgetwork]);

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
                      // selectgrp.name
                      //   ? handleSearchGroupinfowork(selectgrp)
                      //   : console.log("มันไม่มีค่า grp เตื้อเน้อ");
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
              value={selectgrp.name}
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
                          handleSearchGroupinfowork(data);
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
              setSelectgrp({ id: "", name: "" });
              handleAllgroupinfowork();
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
              {getsheetwork[0] ? (
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
                            setSelectCodework(data.code);
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
              ) : (
                <Spinnerpage></Spinnerpage>
              )}
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
                      {filteron ? (
                        filtergetwork[0] ? (
                          filtergetwork.map((data, index) => {
                            console.log("datafiltercontent", data);
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
                                  <button
                                    onClick={() => {
                                      console.log("love");
                                    }}
                                  >
                                    <i className="bi-three-dots"></i>
                                  </button>
                                </td>
                                <td width={30}>
                                  <input type="checkbox"></input>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td>{"(วันที่)"}</td>
                            <td>{"(เวลา)"}</td>
                            <td>{"(กลุ่ม)"}</td>
                            <td>{"(อาจารย์)"}</td>
                            <td>{"(นักศึกษา)"}</td>
                            <td>{"(UP)"}</td>
                            <td>{"(C)"}</td>
                          </tr>
                        )
                      ) : (
                        getworkgetwork.map((data, index) => {
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
                                <button
                                  onClick={() => {
                                    console.log("this a data=>", data);
                                    setDataeditwork(data);
                                    handlecaseEditwork(selectCodework, data);
                                    handleOpenModalbox("boxEditworkDoctor");
                                  }}
                                >
                                  <i className="bi-three-dots"></i>
                                </button>
                              </td>
                              <td width={30}>
                                <input type="checkbox"></input>
                              </td>
                            </tr>
                          );
                        })
                      )}
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
      <ModalBox
        idbox={"boxEditworkDoctor"}
        thisTitle={"แก้ไขข้อมูลงาน"}
        statusClose={setStatusClosemodal}
        content={handleEditworkmodal()}
      ></ModalBox>
    </div>
  );
};
export default ContentWork;
