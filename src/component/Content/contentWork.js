import { useEffect, useState } from "react";
import { handleModalNavSlide, handleOpenModalbox } from "../config/modalConfig";
import ModalNavSlide from "../modal/modalNavSlide";
import ModalBox from "../modal/modalBox";
import moment from "moment/moment";
import { dayofmonth, objectMonth, showMonthwithTH } from "../config/monthth";
import Cookies from "universal-cookie";
import Spinnerpage from "../config/spinnerpage";
import FetchControlWork from "../data/fetchControlWork";
import {
  HolderlineonTable,
  clearHolderlineTable,
} from "../config/holdlinetable";
import {
  searchAdvisor,
  searchGroupcontent,
  searchStudent,
} from "../config/searchConfig";
import Swal from "sweetalert2";

const ContentWork = (props) => {
  const docGetId = (id) => {
    return document.getElementById(id);
  };
  const docGetClass = (id) => {
    return document.getElementsByClassName(id);
  };

  const cookie = new Cookies();
  const usertoken = cookie.get("tokenEye");

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
  const [statusEditwork, setStatusEditwork] = useState(false);
  const [titlegetwork, setTitlegetwork] = useState("Case&Topic ผู้นำเสนอ");
  const [getworkgetwork, setGetworkgetwork] = useState([]);
  const [filtergetwork, setFiltergetwork] = useState([]);
  const [filteron, setFilteron] = useState(false);

  const [openfilter, setOpenfilter] = useState(false);
  const [openMonthdrop, setOpenMonthdrop] = useState(false);
  const [statusClosemodal, setStatusClosemodal] = useState(false);
  const [getstudentwork, setGetstudentwork] = useState([]);
  const [gettopicwork, setGettopicwork] = useState([]);
  const [datasearchstudent, setDatasearchstudent] = useState([]);
  const [datasearchAdvisor, setDatasearchAdvisor] = useState([]);
  const [dataselectworkinfo, setDataselectworkinfo] = useState("");

  const [topicnameShowedit, setTopicnameShowedit] = useState("");

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
  const [topicest, setTopicest] = useState({ id: "", code: "", name: "" });

  const [reportWard, setReportWard] = useState("1");
  const [reportDiagnosis, setReportDiagnosis] = useState("");
  const [reportDateadmit, setReportDateadmit] = useState("");
  const [reportPatient, setReportPatient] = useState("");
  const [reportDateCommit, setReportDateCommit] = useState("");
  const [reportHosnumber, setReportHosnumber] = useState("");
  const [reportDateSendpatient, setReportDateSendpatient] = useState("");

  const addDetailinputclear = () => {
    getsheetwork[0]
      ? setInputtypeestimation({
          id: getsheetwork[0].Id,
          code: getsheetwork[0].code,
          name: getsheetwork[0].name,
        })
      : setInputtypeestimation({ id: "", code: "", name: "" });
    setAdvisorDocest({ id: "", name: "" });
    setGroupStudentest({ id: "", name: "" });
    setStudentEst({ id: "", name: "" });
    setDateEst("");
    setTimebeginest("");
    setTimeendest("");
    setTopicest({ id: "", code: "", name: "" });
    setReportWard("จักษุ1(ช)");
    setReportDiagnosis("");
    setReportDateadmit("");
    setReportPatient("");
    setReportDateCommit("");
    setReportHosnumber("");
    setReportDateSendpatient("");
  };

  //ตัวแปรแก้ไขwork
  const [workIdeditwork, setWorkIdeditwork] = useState("");
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
  const [editdateEst, setEditdateEst] = useState("");
  const [edittimebeginest, setEdittimebeginest] = useState("");
  const [edittimeendest, setEdittimeendest] = useState("");

  const [edittopicest, setEdittopicest] = useState({
    title: "",
    name: "",
  });
  const [editreportWard, setEditreportWard] = useState("จักษุ1(ช)");
  const [editreportDiagnosis, setEditreportDiagnosis] = useState("");
  const [editreportDateadmit, setEditreportDateadmit] = useState("");
  const [editreportPatient, setEditreportPatient] = useState("");
  const [editreportDateCommit, setEditreportDateCommit] = useState("");
  const [editreportHosnumber, setEditreportHosnumber] = useState("");
  const [editreportDateSendpatient, setEditreportDateSendpatient] =
    useState("");

  const editDetailinputclear = () => {
    setEditadvisorDocest({ id: "", name: "" });
    setEditgroupStudentest({ id: "", name: "" });
    setEditstudentEst({ id: "", name: "" });
    setEditdateEst("");
    setEdittimebeginest("");
    setEdittimeendest("");
    setEdittopicest({ title: "", name: "" });
    setEditreportWard("จักษุ1(ช)");
    setEditreportDiagnosis("");
    setEditreportDateadmit("");
    setEditreportPatient("");
    setEditreportDateCommit("");
    setEditreportHosnumber("");
    setEditreportDateSendpatient("");
  };

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
      { idbox: "boxtopicrelativebox" },
    ];
    let objectIDdropid = [
      {
        iddrop: "dropInfoTypeReport",
      },
      { iddrop: "dropInfoPersonport" },
      { iddrop: "dropInfogroup" },
      { iddrop: "dropInfoStudent" },
      { iddrop: "dropInfotopic" },
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
        console.log("อันนี้คือปิดหมด !!");
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
        console.log("อันนี้คือจะได");
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
        console.log("อันนี้ปิดละกะ");
        for (let i = 0; i < lengthtable; i++) {
          table[i].style.position = "relative";
          theadtable[i].style.position = "sticky";
        }
        setOpenMonthdrop(false);
        docGetId(id).style.display = "none";
      } else {
        console.log("อันนี้เปิดก่อหา");
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

  //**modal addwork */
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
                // handleOpenDropdown("dropInfoPersonport", "boxPersonport");
                handleOpenModalbox("boxSearchAdvisor");
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
              id="boxinfoselectstudent"
              value={studentEst.name}
              readOnly
              onClick={(e) => {
                handleOpenModalbox("boxSearchStudent");
              }}
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              id="boxbtnStudentselect"
              onClick={() => {
                handleOpenModalbox("boxSearchStudent");
              }}
            >
              <i className="bi-search"></i>
            </button>
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
                  required
                  value={dateEst}
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
                    id="testTimeClick"
                    value={timebeginest}
                    onChange={(e) => {
                      console.log("พิมพ์เวลาเริ่ม", e.target.value);
                      setTimebeginest(e.target.value);
                    }}
                    onSelect={(e) => {
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
                      console.log("พิมพ์เวลาจบ", e.target.value);
                      setTimeendest(e.target.value);
                    }}
                    onSelect={(e) => {
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
                handleCheckDayformonth(
                  selectYear - 543,
                  selectMonth,
                  selectDataworktype,
                  selectradioComplete,
                  usertoken
                );
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
                <input
                  className="input-rowinput-modalboxContentwork"
                  type="text"
                  onClick={() => {
                    handleOpenDropdown("dropInfotopic", "boxtopicrelativebox");
                  }}
                  value={topicest.name}
                  readOnly
                ></input>
                <button
                  onClick={() => {
                    handleOpenDropdown("dropInfotopic", "boxtopicrelativebox");
                  }}
                >
                  <i className="bi-caret-down"></i>
                </button>
                <div
                  className="dropInfo-boxgrid-contentwork"
                  id="dropInfotopic"
                >
                  {gettopicwork[0] ? (
                    gettopicwork.map((data, index) => {
                      return (
                        <div
                          className="info-dropinfotype"
                          key={index}
                          onClick={() => {
                            setTopicest({
                              id: data.Id,
                              code: data.code,
                              name: data.name,
                            });
                            handleOpenDropdown(
                              "dropInfotopic",
                              "boxtopicrelativebox"
                            );
                          }}
                        >
                          <span>{data.name}</span>
                        </div>
                      );
                    })
                  ) : (
                    <Spinnerpage></Spinnerpage>
                  )}
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
                      value={"1"}
                      onChange={(e) => {
                        setReportWard(e.target.value);
                      }}
                      checked={reportWard === "1"}
                    ></input>
                    <span>{"จักษุ1(ช)"}</span>
                    <input
                      type="radio"
                      value={"2"}
                      onChange={(e) => {
                        setReportWard(e.target.value);
                      }}
                      checked={reportWard === "2"}
                    ></input>
                    <span>{"จักษุ2(ญ)"}</span>
                    <input
                      type="radio"
                      value={"3"}
                      onChange={(e) => {
                        setReportWard(e.target.value);
                      }}
                      checked={reportWard === "3"}
                    ></input>
                    <span>{"พิเศษ"}</span>
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
                          className="inputDate-add-modalContentwork"
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

  //**modal editwork */
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
          <div className="boxgrid-modal-contentwork" id="boxPersonportEdit">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
              value={editadvisorDocest.name}
              onClick={() => {
                handleOpenDropdown(
                  "dropInfoPersonportEdit",
                  "boxPersonportEdit"
                );
              }}
              readOnly
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown(
                  "dropInfoPersonportEdit",
                  "boxPersonportEdit"
                );
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfoPersonportEdit"
            >
              {getworklistwork[0] ? (
                getworklistwork.map((data, index) => {
                  return (
                    <div
                      key={index}
                      className="info-dropinfotype"
                      onClick={() => {
                        console.log("select a advisor:>", data);
                        setEditadvisorDocest({
                          id: data.id,
                          name: data.advisor_name,
                        });
                        handleOpenDropdown(
                          "dropInfoPersonportEdit",
                          "boxPersonportEdit"
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
          <div className="boxgrid-modal-contentwork" id="boxAgroupEdit">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
              id="boxeditinfoGroupselect"
              defaultValue={editgroupStudentest.name}
              onClick={() => {
                handleOpenDropdown("dropInfogroupEdit", "boxAgroupEdit");
              }}
              readOnly
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              id="boxeditbtnGroupselect"
              onClick={() => {
                handleOpenDropdown("dropInfogroupEdit", "boxAgroupEdit");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfogroupEdit"
            >
              {getselectGroup.map((data, index) => {
                return (
                  <div
                    className="info-dropinfotype"
                    key={index}
                    onClick={() => {
                      setEditgroupStudentest({ id: data.id, name: data.name });
                      handleOpenDropdown("dropInfogroupEdit", "boxAgroupEdit");
                    }}
                  >
                    <span>{data.name}</span>
                  </div>
                );
              })}
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
              id="boxeditinfoStudentselect"
              value={editstudentEst.name}
              onClick={() => {
                handleOpenModalbox("boxSearchStudent");
              }}
              readOnly
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              id="boxeditbtnStudentselect"
              onClick={() => {
                handleOpenModalbox("boxSearchStudent");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
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
                  onChange={(e) => {
                    setEditdateEst(e.target.value);
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
                    className="inputtime-timeSTS"
                    defaultValue={edittimebeginest}
                    onChange={(e) => {
                      setEdittimebeginest(e.target.value);
                    }}
                  ></input>
                </div>
                <span style={{ margin: "0 5px" }}>{"ถึง"}</span>
                <div className="boxinputtimeContentwork">
                  <input
                    type="time"
                    className="inputtime-timeSTS"
                    defaultValue={edittimeendest}
                    onChange={(e) => {
                      setEdittimeendest(e.target.value);
                    }}
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
                handleSubmitEditwork(usertoken);
                handleCheckDayformonth(
                  selectYear - 543,
                  selectMonth,
                  selectDataworktype,
                  selectradioComplete,
                  usertoken
                );
              }}
            >
              {"บันทึกแก้ไข"}
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
              <div className="box-topic" id="boxtopicrelativeboxEdit">
                <input
                  className="input-rowinput-modalboxContentwork"
                  type="text"
                  onClick={() => {
                    console.log("topic this a >", edittopicest);
                    handleOpenDropdown(
                      "dropInfotopicEdit",
                      "boxtopicrelativeboxEdit"
                    );
                  }}
                  value={
                    topicnameShowedit ? topicnameShowedit : edittopicest.name
                  }
                  readOnly
                ></input>
                <button
                  onClick={() => {
                    handleOpenDropdown(
                      "dropInfotopicEdit",
                      "boxtopicrelativeboxEdit"
                    );
                  }}
                >
                  <i className="bi-caret-down"></i>
                </button>
                <div
                  className="dropInfo-boxgrid-contentwork"
                  id="dropInfotopicEdit"
                >
                  {gettopicwork[0] ? (
                    gettopicwork.map((data, index) => {
                      return (
                        <div
                          className="info-dropinfotype"
                          key={index}
                          onClick={() => {
                            setTopicnameShowedit("");
                            setEdittopicest({
                              title: data.title,
                              name: data.name,
                            });
                            handleOpenDropdown(
                              "dropInfotopicEdit",
                              "boxtopicrelativeboxEdit"
                            );
                          }}
                        >
                          <span>{data.name}</span>
                        </div>
                      );
                    })
                  ) : (
                    <Spinnerpage></Spinnerpage>
                  )}
                </div>
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
                    <input
                      type="radio"
                      value={"1"}
                      onChange={(e) => {
                        setEditreportWard(e.target.value);
                      }}
                      checked={editreportWard === "1"}
                    ></input>
                    <span>{"จักษุ(ช)"}</span>
                    <input
                      type="radio"
                      value={"2"}
                      onChange={(e) => {
                        setEditreportWard(e.target.value);
                      }}
                      checked={editreportWard === "2"}
                    ></input>
                    <span>{"จักษุ(ญ)"}</span>
                    <input
                      type="radio"
                      value={"3"}
                      onChange={(e) => {
                        setEditreportWard(e.target.value);
                      }}
                      checked={editreportWard === "3"}
                    ></input>
                    <span>{"พิเศษ"}</span>
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
                        defaultValue={editreportDiagnosis}
                        onChange={(e) => {
                          setEditreportDiagnosis(e.target.value);
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
                          defaultValue={editreportDateadmit}
                          onChange={(e) => {
                            setEditreportDateadmit(e.target.value);
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
                        defaultValue={editreportPatient}
                        onChange={(e) => {
                          setEditreportPatient(e.target.value);
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
                          defaultValue={editreportDateSendpatient}
                          onChange={(e) => {
                            setEditreportDateSendpatient(e.target.value);
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
                        defaultValue={editreportHosnumber}
                        onChange={(e) => {
                          setEditreportHosnumber(e.target.value);
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
                          defaultValue={editreportDateCommit}
                          onChange={(e) => {
                            setEditreportDateCommit(e.target.value);
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

  //**modal searchstudent */
  //แสดงของอาจารย์ด้วยนะ-----*
  const handleSearchstudentmodal = (mode) => {
    return (
      <div className="content-modalsrcstudent">
        <div className="title-bar-modalsrcstudent">
          <input
            className="inputsearchstudent-modalsrcstudent"
            type="text"
            onChange={(e) => {
              setDatasearchstudent(
                searchStudent(e.target.value, getstudentwork)
              );
            }}
          ></input>
          <button
            className="btntitle-searchstudent-modalsrcstudent"
            type="button"
            onClick={() => {
              docGetId("boxSearchStudent").style.display = "none";
            }}
          >{`ยกเลิก`}</button>
        </div>
        <div className="showinfo-search-modalsrcstudent">
          {datasearchstudent[0]
            ? datasearchstudent.map((data, index) => {
                return (
                  <div
                    className="box-infosearch-modalsrcstudent"
                    key={index}
                    onClick={() => {
                      console.log("ดาต้า นศพ >>", data);
                      if (mode) {
                        setEditstudentEst({
                          id: data.id.trim(),
                          name: `${data.ttl.trim()} ${data.name.trim()} ${data.lname.trim()}`,
                        });
                      } else {
                        setStudentEst({
                          id: data.id.trim(),
                          name: `${data.ttl.trim()} ${data.name.trim()} ${data.lname.trim()}`,
                        });
                      }

                      docGetId("boxSearchStudent").style.display = "none";
                    }}
                  >
                    <span className="idstudent-span-modalsrcstudent">
                      {data.std_id}
                    </span>
                    <span className="idstudent-span-modalsrcstudent">
                      {data.ttl + " " + data.name + data.lname}
                    </span>
                  </div>
                );
              })
            : getstudentwork.map((data, index) => {
                return (
                  <div
                    className="box-infosearch-modalsrcstudent"
                    key={index}
                    onClick={() => {
                      if (mode) {
                        console.log("ดาต้า นศพ >>", data);
                        // let objstudent = {
                        //   id: data.id.trim(),
                        //   name: `${data.ttl.trim()} ${data.name.trim()} ${data.lname.trim()}`,
                        // };
                        // console.log("objstudent >>", objstudent);
                        setEditstudentEst({
                          id: data.id.trim(),
                          name: `${data.ttl.trim()} ${data.name.trim()} ${data.lname.trim()}`,
                        });
                      } else {
                        console.log("omg");
                        setStudentEst({
                          id: data.id.trim(),
                          name: `${data.ttl.trim()} ${data.name.trim()} ${data.lname.trim()}`,
                        });
                      }

                      docGetId("boxSearchStudent").style.display = "none";
                    }}
                  >
                    <span className="idstudent-span-modalsrcstudent">
                      {data.std_id}
                    </span>
                    <span className="idstudent-span-modalsrcstudent">
                      {data.ttl + " " + data.name + data.lname}
                    </span>
                  </div>
                );
              })}
          {/* <div className="box-infosearch-modalsrcstudent">
            <span className="idstudent-span-modalsrcstudent">{`(รหัส)`}</span>
            <span className="idstudent-span-modalsrcstudent">{`(ชื่อนศพ)`}</span>
          </div> */}
        </div>
      </div>
    );
  };

  const handleSearchAdvisormodal = (mode) => {
    return (
      <div className="content-modalsrcAdvisor">
        <div className="title-bar-modalsrcAdvisor">
          <input
            className="inputsearchstudent-modalsrcAdvisor"
            type="text"
            onChange={(e) => {
              setDatasearchAdvisor(
                searchAdvisor(e.target.value, getworklistwork)
              );
            }}
          ></input>
          <button
            className="btntitle-searchstudent-modalsrcAdvisor"
            type="button"
            onClick={() => {
              docGetId("boxSearchAdvisor").style.display = "none";
            }}
          >{`ยกเลิก`}</button>
        </div>
        <div className="showinfo-search-modalsrcAdvisor">
          {datasearchAdvisor[0]
            ? datasearchAdvisor.map((data, index) => {
                return (
                  <div
                    className="box-infosearch-modalsrcAdvisor"
                    key={index}
                    onClick={() => {
                      if (mode) {
                        setEditadvisorDocest({
                          id: data.id,
                          name: data.advisor_name,
                        });
                      } else {
                        setAdvisorDocest({
                          id: data.id,
                          name: data.advisor_name,
                        });
                      }

                      docGetId("boxSearchAdvisor").style.display = "none";
                    }}
                  >
                    <span className="idstudent-span-modalsrcstudent">
                      {data.advisor_name}
                    </span>
                  </div>
                );
              })
            : getworklistwork.map((data, index) => {
                return (
                  <div
                    className="box-infosearch-modalsrcAdvisor"
                    key={index}
                    onClick={() => {
                      if (mode) {
                        setEditadvisorDocest({
                          id: data.id,
                          name: data.advisor_name,
                        });
                      } else {
                        setAdvisorDocest({
                          id: data.id,
                          name: data.advisor_name,
                        });
                      }

                      docGetId("boxSearchAdvisor").style.display = "none";
                    }}
                  >
                    <span className="idstudent-span-modalsrcstudent">
                      {data.advisor_name}
                    </span>
                  </div>
                );
              })}
        </div>
      </div>
    );
  };

  const handleCheckShowSpecialType = (typesheet) => {
    let headSpecial = (status) => {
      if (
        !docGetId("boxinfoheadSpecial") ||
        !docGetId("boxeditinfoheadSpecial")
      )
        return;
      if (status) {
        docGetId("boxinfoheadSpecial").style.display = "block";
        docGetId("boxeditinfoheadSpecial").style.display = "block";
      } else if (!status) {
        docGetId("boxinfoheadSpecial").style.display = "none";
        docGetId("boxeditinfoheadSpecial").style.display = "none";
      }
    };
    let reportSpecial = (status) => {
      if (
        !docGetId("boxinforeportSpecial") ||
        !docGetId("boxeditinforeportSpecial")
      )
        return;
      if (status) {
        docGetId("boxinforeportSpecial").style.display = "block";
        docGetId("boxeditinforeportSpecial").style.display = "block";
      } else if (!status) {
        docGetId("boxinforeportSpecial").style.display = "none";
        docGetId("boxeditinforeportSpecial").style.display = "none";
      }
    };
    let groupandstudent = (status) => {
      if (
        !docGetId("boxinfoGroupselect") ||
        !docGetId("boxbtnGroupselect") ||
        !docGetId("boxinfoselectstudent") ||
        !docGetId("boxbtnStudentselect") ||
        !docGetId("boxeditinfoGroupselect") ||
        !docGetId("boxeditbtnGroupselect") ||
        !docGetId("boxeditinfoStudentselect") ||
        !docGetId("boxeditbtnStudentselect")
      )
        return;
      if (status) {
        docGetId("boxinfoGroupselect").style.display = "block";
        docGetId("boxbtnGroupselect").style.display = "block";
        docGetId("boxinfoselectstudent").style.display = "none";
        docGetId("boxbtnStudentselect").style.display = "none";
        docGetId("boxeditinfoGroupselect").style.display = "block";
        docGetId("boxeditbtnGroupselect").style.display = "block";
        docGetId("boxeditinfoStudentselect").style.display = "none";
        docGetId("boxeditbtnStudentselect").style.display = "none";
      } else {
        docGetId("boxinfoGroupselect").style.display = "none";
        docGetId("boxbtnGroupselect").style.display = "none";
        docGetId("boxinfoselectstudent").style.display = "block";
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
      setSelectCodework(data[0].code);
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
      // console.log(":-)...>",data)
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
      console.log("รายละเอียดข้อมูลงาน>>>", data);
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

    // console.log("object >>>", object);
    handleworkgetworkdata(object, token);
  };

  const handleSearchGroupinfowork = (data) => {
    // console.log("งงอะ", getworkgetwork);
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

  const handlegetworkhead = (workid, token) => {
    let object = {
      work_id: workid,
    };
    FetchControlWork.fetchgetDataworkhead(object, token).then((data) => {
      console.log("data workhead report =>", data);
      if (data[0]) {
        data.map((ele) => {
          switch (ele.txt.trim()) {
            case "หอผู้ป่วย":
              if(ele.txt_val === "จักษุ(ช)"){
                setEditreportWard("1");
              }else if(ele.txt_val === "จักษุ(ญ)"){
                setEditreportWard("2");
              }else if(ele.txt_val === "พิเศษ"){
                setEditreportWard("3");
              }
              break;
            case "การวินิจฉัย":
              setEditreportDiagnosis(ele.txt_val);
              break;
            case "ชื่อผู้ป่วย":
              setEditreportPatient(ele.txt_val);
              break;
            case "เลขที่โรงพยาบาล":
              setEditreportHosnumber(ele.txt_val);
              break;
            case "วันที่ผู้ป่วย Admit":
              //**พี่ปูจะส่งมาเป็น คศ */
              let date_admit = ele.txt_val.split("-");
              let dateplus_admit = `${parseInt(date_admit[2]) - 543}-${date_admit[1]}-${date_admit[0]}`;
              
              setEditreportDateadmit(dateplus_admit);
              // let dateAdmit = moment(ele.txt_val)
              //   .add(-543, "year")
              //   .format("YYYY-MM-DD");
              // setEditreportDateadmit(dateAdmit);
              break;
            case "วันที่จ่าย/รับผู้ป่วย":
              //**พี่ปูจะส่งมาเป็น คศ */
              let date_jand = ele.txt_val.split("-");
              let dateplus_jand = `${parseInt(date_jand[2]) - 543}-${date_jand[1]}-${date_jand[0]}`;
              // setEditreportDateCommit(dateplus_jand);
              setEditreportDateSendpatient(dateplus_jand);

              // let dateCommit = moment(ele.txt_val)
              //   .add(-543, "year")
              //   .format("YYYY-MM-DD");
              // setEditreportDateCommit(dateCommit);
              break;
            case "วันที่ส่งรายงานผู้ป่วย":
              //**พี่ปูจะส่งมาเป็น คศ */
              // setEditreportDateSendpatient(ele.txt_val);
              let date = ele.txt_val.split("-");
              let dateplus = `${parseInt(date[2]) - 543}-${date[1]}-${date[0]}`;
              console.log("วันที่ส่งรายงานผู้ป่วย คศ. >>", dateplus);
              // setEditreportDateSendpatient(dateplus);
              setEditreportDateCommit(dateplus);

              // setEditreportDateSendpatient(datesent);
              break;
          }
        });
      }
    });
  };

  const handlegetworkstudent = (token) => {
    FetchControlWork.fetchgetworkstudent(token).then((data) => {
      console.log("this a data student", data);
      setGetstudentwork(data);
    });
  };

  const handlegetworktopic = (thistitle, token) => {
    let object = { title: thistitle };
    FetchControlWork.fetchgetTblluwork(object, token).then((data) => {
      console.log("this a data topicwork", data);
      setGettopicwork(data);
    });
  };

  const handleSubmitAddnewWork = (token) => {
    let typecase = inputtypeestimation.code;
    let passtofetch = true;

    console.log("case is >>>",typecase)

    switch (typecase) {
      case "01": //**report*/
        let objectreport = {
          sheet_code: inputtypeestimation.code
            ? inputtypeestimation.code
            : (passtofetch = false),
          sheet_id: inputtypeestimation.id
            ? inputtypeestimation.id
            : (passtofetch = false),
          advisor_id: advisorDocest.id
            ? advisorDocest.id
            : (passtofetch = false),
          student_id: studentEst.id ? studentEst.id : (passtofetch = false),
          date: dateEst ? dateEst : (passtofetch = false),
          time_begin: timebeginest ? timebeginest : (passtofetch = false),
          time_end: timeendest ? timeendest : (passtofetch = false),
          caption: "หอผู้ป่วย",
          txt: reportWard ? reportWard : (passtofetch = false),
          txt1: "การวินิจฉัย",
          txt_val1: reportDiagnosis ? reportDiagnosis : (passtofetch = false),
          txt2: "ชื่อผู้ป่วย",
          txt_val2: reportPatient ? reportPatient : (passtofetch = false),
          txt3: "เลขที่โรงพยาบาล",
          txt_val3: reportHosnumber ? reportHosnumber : (passtofetch = false),
          txt5: "วันที่ผู้ป่วย Admit",
          txt_val5: reportDateadmit
            ? moment(reportDateadmit).add(543, "year").format("DD-MM-YYYY")
            : "",
          txt6: "วันที่จ่าย/รับผู้ป่วย",
          txt_val6: reportDateCommit
            ? moment(reportDateCommit)
                .add(543, "year")
                .format("DD-MM-YYYY")
            : "",
          txt7: "วันที่ส่งรายงานผู้ป่วย",
          txt_val7: reportDateSendpatient
            ? moment(reportDateSendpatient).add(543, "year").format("DD-MM-YYYY")
            : "",
          txt_val6_1: reportDateCommit,
          txt_val7_1: reportDateSendpatient,
        };
        console.log("case 1 passtofetch =>",passtofetch)
        if (passtofetch) {
          console.log("object for add report>>>", objectreport);
          addDetailinputclear();
          docGetId("boxAddworkDoctor").style.display = "none";
          FetchControlWork.fetchAdddetailwork(objectreport, token).then(
            (message) => {
              console.log(message);
            }
          );
          Swal.fire({
            icon: "success",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 720,
          });
        } else {
          Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1200,
          });
        }
        break;
      case "02": //**progressnote */
        let objectprogressnote = {
          sheet_code: inputtypeestimation.code
            ? inputtypeestimation.code
            : (passtofetch = false),
          sheet_id: inputtypeestimation.id
            ? inputtypeestimation.id
            : (passtofetch = false),
          advisor_id: advisorDocest.id
            ? advisorDocest.id
            : (passtofetch = false),
          student_id: studentEst.id ? studentEst.id : (passtofetch = false),
          date: dateEst ? dateEst : (passtofetch = false),
          time_begin: timebeginest ? timebeginest : (passtofetch = false),
          time_end: timeendest ? timeendest : (passtofetch = false),
        };
        if (passtofetch) {
          console.log("object for add progressnote >>>", objectprogressnote);
          addDetailinputclear();
          docGetId("boxAddworkDoctor").style.display = "none";
          FetchControlWork.fetchAdddetailwork(objectprogressnote, token).then(
            (message) => {
              console.log(message);
              Swal.fire({
                icon: "success",
                showConfirmButton: false,
                showCancelButton: false,
                timer: 720,
              });
            }
          );
        } else {
          Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1200,
          });
        }

        break;
      case "03": //**opd teaching */
        let objectteaching = {
          sheet_code: inputtypeestimation.code
            ? inputtypeestimation.code
            : (passtofetch = false),
          sheet_id: inputtypeestimation.id
            ? inputtypeestimation.id
            : (passtofetch = false),
          advisor_id: advisorDocest.id
            ? advisorDocest.id
            : (passtofetch = false),
          grp_id: groupStudentest.id
            ? groupStudentest.id
            : (passtofetch = false),
          date: dateEst ? dateEst : (passtofetch = false),
          time_begin: timebeginest ? timebeginest : (passtofetch = false),
          time_end: timeendest ? timeendest : (passtofetch = false),
        };
        if (passtofetch) {
          console.log("object for add teaching >>>", objectteaching);
          addDetailinputclear();
          docGetId("boxAddworkDoctor").style.display = "none";
          FetchControlWork.fetchAdddetailwork(objectteaching, token).then(
            (message) => {
              console.log(message);
              Swal.fire({
                icon: "success",
                showConfirmButton: false,
                showCancelButton: false,
                timer: 720,
              });
            }
          );
        } else {
          Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1200,
          });
        }

        break;
      case "04": //**wardround*/
        let objectwardround = {
          sheet_code: inputtypeestimation.code
            ? inputtypeestimation.code
            : (passtofetch = false),
          sheet_id: inputtypeestimation.id
            ? inputtypeestimation.id
            : (passtofetch = false),
          advisor_id: advisorDocest.id
            ? advisorDocest.id
            : (passtofetch = false),
          grp_id: groupStudentest.id
            ? groupStudentest.id
            : (passtofetch = false),
          date: dateEst ? dateEst : (passtofetch = false),
          time_begin: timebeginest ? timebeginest : (passtofetch = false),
          time_end: timeendest ? timeendest : (passtofetch = false),
        };
        if (passtofetch) {
          console.log("object for add wardrond >>>", objectwardround);
          addDetailinputclear();
          docGetId("boxAddworkDoctor").style.display = "none";
          FetchControlWork.fetchAdddetailwork(objectwardround, token).then(
            (message) => {
              console.log(message);
              Swal.fire({
                icon: "success",
                showConfirmButton: false,
                showCancelButton: false,
                timer: 720,
              });
            }
          );
        } else {
          Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1200,
          });
        }

        break;
      case "05": //**case & topic นำเสนอ */
        let objectcasetopicShow = {
          sheet_code: inputtypeestimation.code
            ? inputtypeestimation.code
            : (passtofetch = false),
          sheet_id: inputtypeestimation.id
            ? inputtypeestimation.id
            : (passtofetch = false),
          advisor_id: advisorDocest.id
            ? advisorDocest.id
            : (passtofetch = false),
          grp_id: groupStudentest.id
            ? groupStudentest.id
            : (passtofetch = false),
          date: dateEst ? dateEst : (passtofetch = false),
          time_begin: timebeginest ? timebeginest : (passtofetch = false),
          time_end: timeendest ? timeendest : (passtofetch = false),
          txt_val: topicest.name ? topicest.name : (passtofetch = false),
        };
        if (passtofetch) {
          console.log("object for add objectcaseshow >>>", objectcasetopicShow);

          addDetailinputclear();
          docGetId("boxAddworkDoctor").style.display = "none";
          FetchControlWork.fetchAdddetailwork(objectcasetopicShow, token).then(
            (message) => {
              console.log(message);
              Swal.fire({
                icon: "success",
                showConfirmButton: false,
                showCancelButton: false,
                timer: 720,
              });
            }
          );
        } else {
          Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1200,
          });
        }
        break;
      case "06": //**case & topic ผู้ร่วม */
        let objectcasecoop = {
          sheet_code: inputtypeestimation.code
            ? inputtypeestimation.code
            : (passtofetch = false),
          sheet_id: inputtypeestimation.id
            ? inputtypeestimation.id
            : (passtofetch = false),
          advisor_id: advisorDocest.id
            ? advisorDocest.id
            : (passtofetch = false),
          grp_id: groupStudentest.id
            ? groupStudentest.id
            : (passtofetch = false),
          date: dateEst ? dateEst : (passtofetch = false),
          time_begin: timebeginest ? timebeginest : (passtofetch = false),
          time_end: timeendest ? timeendest : (passtofetch = false),
          txt_val: topicest ? topicest.name : (passtofetch = false),
        };
        if (passtofetch) {
          console.log("object for add objectcasecoop >>>", objectcasecoop);
          addDetailinputclear();
          docGetId("boxAddworkDoctor").style.display = "none";
          FetchControlWork.fetchAdddetailwork(objectcasecoop, token).then(
            (message) => {
              console.log(message);
              Swal.fire({
                icon: "success",
                showConfirmButton: false,
                showCancelButton: false,
                timer: 720,
              });
            }
          );
        } else {
          Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1200,
          });
        }

        break;
      case "07": //**flipped classroom */
        let objectflipped = {
          sheet_code: inputtypeestimation.code
            ? inputtypeestimation.code
            : (passtofetch = false),
          sheet_id: inputtypeestimation.id
            ? inputtypeestimation.id
            : (passtofetch = false),
          advisor_id: advisorDocest.id
            ? advisorDocest.id
            : (passtofetch = true),
          grp_id: groupStudentest.id
            ? groupStudentest.id
            : (passtofetch = true),
          date: dateEst ? dateEst : (passtofetch = true),
          time_begin: timebeginest ? timebeginest : (passtofetch = true),
          time_end: timeendest ? timeendest : (passtofetch = true),
        };
        if (passtofetch) {
          console.log("object for add flipped >>>", objectflipped);
          addDetailinputclear();
          docGetId("boxAddworkDoctor").style.display = "none";
          FetchControlWork.fetchAdddetailwork(objectflipped, token).then(
            (message) => {
              console.log(message);
              Swal.fire({
                icon: "success",
                showConfirmButton: false,
                showCancelButton: false,
                timer: 720,
              });
            }
          );
        } else {
          Swal.fire({
            title: "กรุณากรอกข้อมูลให้ครบถ้วน",
            icon: "warning",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 1200,
          });
        }

        break;
    }
    handleAllgroupinfowork();
    
  };

  const clearCloseAddeditmodal = () => {
    // console.log("this close getsheetwork", getsheetwork);
    setInputtypeestimation({
      id: getsheetwork[0].Id,
      code: getsheetwork[0].code,
      name: getsheetwork[0].name,
    });
  };

  const handleSubmitEditwork = (token) => {
    let casecode = editTypesheetwork.code;
    console.log("case >>>", casecode);
    console.log("look this null>>", editstudentEst);
    switch (casecode) {
      case "01": //ประเมินรายงาน
        console.log(">>>", editreportDateSendpatient);
        let objeditReport = {
          work_id: workIdeditwork,
          sheet_code: editTypesheetwork.code,
          sheet_id: editTypesheetwork.id,
          advisor_id: editadvisorDocest.id,
          student_id: editstudentEst.id,
          date: editdateEst,
          time_begin: edittimebeginest,
          time_end: edittimeendest,
          caption: "หอผู้ป่วย",
          txt: editreportWard,
          txt1: "การวินิจฉัย",
          txt_val1: editreportDiagnosis,
          txt2: "ชื่อผู้ป่วย",
          txt_val2: editreportPatient,
          txt3: "เลขที่โรงพยาบาล",
          txt_val3: editreportHosnumber,
          txt5: "วันที่ผู้ป่วย Admit",
          txt_val5: editreportDateadmit ? moment(editreportDateadmit).add(543,"year").format("DD-MM-YYYY"):"",
          txt6: "วันที่จ่าย/รับผู้ป่วย",
          txt_val6: editreportDateSendpatient
            ? moment(editreportDateSendpatient)
                .add(543, "year")
                .format("DD-MM-YYYY")
            : "",
          txt7: "วันที่ส่งรายงานผู้ป่วย",
          txt_val7: editreportDateCommit
            ? moment(editreportDateCommit).add(543, "year").format("DD-MM-YYYY")
            : "",
          txt_val6_1: editreportDateSendpatient,
          txt_val7_1: editreportDateCommit,
        };
        console.log("edit for add report>>>", objeditReport);
        addDetailinputclear();
        docGetId("boxEditworkDoctor").style.display = "none";
        FetchControlWork.fetchEditdetailwork(objeditReport, token).then(
          (message) => {
            console.log(message);
          }
        );

        break;
      case "02": //แบบฟอร์ม Progressnote
        let editobjectprogressnote = {
          work_id: workIdeditwork,
          sheet_id: editTypesheetwork.id,
          sheet_code: editTypesheetwork.code,
          advisor_id: editadvisorDocest.id,
          student_id: editstudentEst.id,
          date: editdateEst,
          time_begin: edittimebeginest,
          time_end: edittimeendest,
        };
        console.log("edit progressnote >>", editobjectprogressnote);
        docGetId("boxEditworkDoctor").style.display = "none";
        editDetailinputclear();
        FetchControlWork.fetchEditdetailwork(
          editobjectprogressnote,
          token
        ).then((message) => {
          console.log(message);
        });
        break;
      case "03": //OPD teaching
        let editobjectOPDteaching = {
          work_id: workIdeditwork,
          sheet_id: editTypesheetwork.id,
          sheet_code: editTypesheetwork.code,
          advisor_id: editadvisorDocest.id,
          grp_id: editgroupStudentest.id,
          date: editdateEst,
          time_begin: edittimebeginest,
          time_end: edittimeendest,
        };
        console.log("edit opd teaching>>", editobjectOPDteaching);
        docGetId("boxEditworkDoctor").style.display = "none";
        editDetailinputclear();
        FetchControlWork.fetchEditdetailwork(editobjectOPDteaching, token).then(
          (message) => {
            console.log(message);
          }
        );
        break;
      case "04": //ward round
        let editobjectwardround = {
          work_id: workIdeditwork,
          sheet_id: editTypesheetwork.id,
          sheet_code: editTypesheetwork.code,
          advisor_id: editadvisorDocest.id,
          grp_id: editgroupStudentest.id,
          date: editdateEst,
          time_begin: edittimebeginest,
          time_end: edittimeendest,
        };
        console.log("edit wardround >>", editobjectwardround);
        docGetId("boxEditworkDoctor").style.display = "none";
        editDetailinputclear();
        FetchControlWork.fetchEditdetailwork(editobjectwardround, token).then(
          (message) => {
            console.log(message);
          }
        );
        break;
      case "05": //Case&Topic ผู้นำเสนอ
        let editobjectcasttopicshow = {
          work_id: workIdeditwork,
          sheet_id: editTypesheetwork.id,
          sheet_code: editTypesheetwork.code,
          advisor_id: editadvisorDocest.id,
          grp_id: editgroupStudentest.id,
          date: editdateEst,
          time_begin: edittimebeginest,
          time_end: edittimeendest,
          txt_val: edittopicest.name,
        };
        // console.log("edit caseshow >>", editobjectcasttopicshow);
        docGetId("boxEditworkDoctor").style.display = "none";
        editDetailinputclear();
        FetchControlWork.fetchEditdetailwork(
          editobjectcasttopicshow,
          token
        ).then((message) => {
          console.log(message);
        });
        break;
      case "06": //Case&topic ผู้ร่วม
        let editobjectcasecoop = {
          work_id: workIdeditwork,
          sheet_id: editTypesheetwork.id,
          sheet_code: editTypesheetwork.code,
          advisor_id: editadvisorDocest.id,
          grp_id: editgroupStudentest.id,
          date: editdateEst,
          time_begin: edittimebeginest,
          time_end: edittimeendest,
          txt_val: edittopicest.name,
        };
        console.log("edit edit casecoop", editobjectcasecoop);
        docGetId("boxEditworkDoctor").style.display = "none";
        editDetailinputclear();
        FetchControlWork.fetchEditdetailwork(editobjectcasecoop, token).then(
          (message) => {
            console.log(message);
          }
        );
        break;
      case "07": //Flipped classroom
        let objectflipped = {
          work_id: workIdeditwork,
          sheet_id: editTypesheetwork.id,
          sheet_code: editTypesheetwork.code,
          advisor_id: editadvisorDocest.id,
          grp_id: editgroupStudentest.id,
          date: editdateEst,
          time_begin: edittimebeginest,
          time_end: edittimeendest,
          txt_val: edittopicest,
        };
        console.log("edit flipped classroom >>", objectflipped);
        docGetId("boxEditworkDoctor").style.display = "none";
        editDetailinputclear();
        FetchControlWork.fetchEditdetailwork(objectflipped, token).then(
          (message) => {
            console.log(message);
          }
        );
        break;
    }
    Swal.fire({
      icon: "success",
      showConfirmButton: false,
      showCancelButton: false,
      timer: 720,
    });
  };

  const handleDeletedetailwork = (data, tokenuser) => {
    let objIdworkdetail = {
      work_id: data.Id,
    };
    // console.log("ลบโดย data นี้ >>>", objIdworkdetail);
    // console.log("token", tokenuser);

    FetchControlWork.fetchcheckgetworkdetail(objIdworkdetail, tokenuser).then(
      (res) => {
        console.log(res);
        if (res.status) {
          Swal.fire({
            icon: "warning",
            title: "ลบรายละเอียดการประเมิน !!",
            text: "ต้องการ ลบ รายละเอียดการประเมิน ใช่ หรือ ไม่ ?",
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "ตกลง",
            cancelButtonText: "ยกเลิก",
          }).then((res) => {
            if (res.isConfirmed) {
              // console.log("ทำการลบต่อไป");
              FetchControlWork.fetchdeleteworkdetail(
                objIdworkdetail,
                tokenuser
              ).then(() => {
                handleAllgroupinfowork();
                setDataselectworkinfo("");
                clearHolderlineTable("tableTR-workinfosheet");
              });
            }
          });
        } else {
          // console.log("ทำการลบไป status = 0");
          FetchControlWork.fetchdeleteworkdetail(
            objIdworkdetail,
            tokenuser
          ).then(() => {
            handleAllgroupinfowork();
            setDataselectworkinfo("");
            clearHolderlineTable("tableTR-workinfosheet");
          });
        }
      }
    );
  };

  const handlecaseEditwork = (code, aData) => {
    console.log("aData paramator this =>", aData);
    setWorkIdeditwork(aData.Id);
    setEditTypesheetwork({
      id: aData.sheet_id,
      name: aData.sheet_name,
      code: code,
    });
    setEditadvisorDocest({
      id: aData.advisor_id !== null ? aData.advisor_id : "",
      name: aData.advisor_name !== null ? aData.advisor_name : "",
    });
    setEditgroupStudentest({
      id: aData.grp_id !== null ? aData.grp_id : "",
      name: aData.name !== null ? aData.name : "",
    });
    setEditstudentEst({
      id: aData.student_id !== null ? aData.student_id : "",
      name: aData.student_name !== null ? aData.student_name : "",
    });
    setEditdateEst(aData.date !== null ? aData.date : "0000-00-00");
    setEdittimebeginest(aData.time_begin !== null ? aData.time_begin : "");
    setEdittimeendest(aData.time_end !== null ? aData.time_end : "");
    handleCheckShowSpecialType(code);
    // console.log("code is =>", code);
    // console.log("data is =>", aData);
    switch (code) {
      case "01":
        handlegetworkhead(aData.Id, usertoken);
        break;
      case "05":
        console.log("sheetCode 05 data =>>", aData);
        setEdittopicest({
          title: aData.txt !== null ? aData.txt : "",
          name: aData.txt_val !== null ? aData.txt_val : "",
        });
        break;
      case "06":
        setEdittopicest({
          title: aData.txt !== null ? aData.txt : "",
          name: aData.txt_val !== null ? aData.txt_val : "",
        });
        break;
    }
  };

  useEffect(() => {
    handleGetdatagroup(selectYear, usertoken);
    handlesheetdatawork(usertoken);
    handleworklistworkadvisor(usertoken);
    handlegetworkstudent(usertoken);
    handlegetworktopic("case_topic", usertoken);
  }, []);

  useEffect(() => {
    handleAllgroupinfowork();
  }, [selectYear]);

  useEffect(() => {
    if (selectgrp.name) {
      handleSearchGroupinfowork(selectgrp);
    }
  }, [getworkgetwork]);

  useEffect(() => {
    if (!statusClosemodal) return;
    // console.log("ทำงานปิดmodal");
    clearCloseAddeditmodal();
    addDetailinputclear();
    editDetailinputclear();
    
  }, [statusClosemodal]);

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
          <button
            className="btn-closebody-contentwork"
            type="button"
            onClick={() => {
              props.close("close");
            }}
          >
            {"ปิด"}
          </button>
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
            onClick={(e) => {
              setSelectradioComplete(parseInt(1));
              handleCheckDayformonth(
                selectYear - 543,
                selectMonth,
                selectDataworktype,
                e.target.value,
                usertoken
              );
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
          <div className="workest-info-contentwork">
            <div className="col-info-contentwork boxworkestimation-contentwork">
              {getsheetwork[0] ? (
                <table
                  className="table-show-info"
                  id="tableEstimationlist"
                  style={{ width: "100%" }}
                >
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
                            clearHolderlineTable("tableTR-workinfosheet");
                            setDataselectworkinfo("");
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
            <div className="col-info-contentwork boxworkinfoest-contentwork">
              <div
                className="title-info-contentwork"
                style={{ backgroundColor: "#00796b" }}
              >
                <span>{titlegetwork ? `${titlegetwork}` : "-"}</span>
              </div>
              <div className="infoBoxcol-relative-contentwork">
                {getworkgetwork[0] ? (
                  <table
                    className="table-show-info"
                    id="tableshowinfoestimation"
                  >
                    <thead className="thaeadShowinfo">
                      <tr>
                        <th style={{ backgroundColor: "#00897b" }}>
                          {"วันที่"}
                        </th>
                        <th style={{ backgroundColor: "#00897b" }}>{"เวลา"}</th>
                        <th style={{ backgroundColor: "#00897b" }}>
                          {"กลุ่ม"}
                        </th>
                        <th style={{ backgroundColor: "#00897b" }}>
                          {"อาจารย์"}
                        </th>
                        <th style={{ backgroundColor: "#00897b" }}>
                          {"นักศึกษา"}
                        </th>
                        <th style={{ backgroundColor: "#00897b" }}>{"UP"}</th>
                        <th style={{ backgroundColor: "#00897b" }}>
                          {"แก้ไข"}
                        </th>
                        <th style={{ backgroundColor: "#00897b" }}>{"C"}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteron ? (
                        filtergetwork[0] ? (
                          filtergetwork.map((data, index) => {
                            console.log("datafiltercontent", data);
                            return (
                              <tr
                                key={index}
                                onClick={() => {
                                  console.log("this line info >>>", data);
                                  // HolderlineonTable(
                                  //   "tableTR-worksheet",
                                  //   "tr-worksheet-",
                                  //   index
                                  // );
                                }}
                              >
                                <td width={120}>{data.date}</td>
                                <td
                                  width={120}
                                >{`${data.time_begin}-${data.time_end}`}</td>
                                <td width={50}>{data.name}</td>
                                <td width={300}>{data.advisor_name}</td>
                                <td width={300}>{data.student_name}</td>
                                <td width={50}>
                                  <button
                                  onClick={() => {
                                    console.log("UPPPP");
                                    props.upfile("file");
                                    props.workinfoselected(data);
                                  }}
                                  >
                                    <i className="bi-chevron-up"></i>
                                  </button>
                                </td>
                                <td width={50}>
                                  <button
                                    onClick={() => {
                                      console.log("love");
                                      setTopicnameShowedit(data.topic);
                                      setDataeditwork(data);
                                      setStatusEditwork(true);
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
                            <tr
                              key={index}
                              className="tableTR-workinfosheet"
                              id={`tr-workinfosheet-${index}`}
                              onClick={() => {
                                console.log("this line info >>>", data);
                                HolderlineonTable(
                                  "tableTR-workinfosheet",
                                  "tr-workinfosheet-",
                                  index
                                );
                                setDataselectworkinfo(data);
                              }}
                            >
                              <td width={120}>{data.date}</td>
                              <td
                                width={120}
                              >{`${data.time_begin}-${data.time_end}`}</td>
                              <td width={50}>{data.name}</td>
                              <td width={300}>{data.advisor_name}</td>
                              <td width={300}>{data.student_name}</td>
                              <td width={50}>
                                <button
                                  onClick={() => {
                                    // console.log("UPPPP");
                                    props.upfile("file");
                                    props.workinfoselected(data);
                                  }}
                                >
                                  <i className="bi-chevron-up"></i>
                                </button>
                              </td>
                              <td width={50}>
                                <button
                                  onClick={() => {
                                    // console.log("data is this=>",data)
                                    // console.log("this >>>", selectCodework);
                                    setTopicnameShowedit(data.topic);
                                    setDataeditwork(data);
                                    setStatusEditwork(true);
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
              </div>
            </div>
          </div>
          <div className="title-header-contentwork">
            <h4>{"รายละเอียดงานของอาจารย์"}</h4>
          </div>
          <div className="row-info-contentwork">
            <div className="col-info-contentwork boxworkdoctorlist">
              <div
                className="infoBoxcol-relative-contentwork"
                id="tableinfodoctor"
              >
                {getworklistwork[0] ? (
                  <table
                    className="table-show-info"
                    id="tabledoctorlist"
                    style={{ width: "100%" }}
                  >
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
            <div className="col-info-contentwork boxworkesttotle">
              <div className="infoBoxcol-relative-contentwork">
                {getworkestimation[0] ? (
                  <table
                    className="table-show-info"
                    id="tabletotleest"
                    style={{ width: "100%" }}
                  >
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
                handleCheckShowSpecialType(inputtypeestimation.code);
                setStatusEditwork(false);
              }}
            >
              {"เพิ่ม"}
            </button>
          </div>
          <div className="boxcontent-btnmenu-contentwork">
            <button
              className="btn-menu-contentwork"
              type="button"
              onClick={() => {
                if (dataselectworkinfo) {
                  Swal.fire({
                    title: "ลบข้อมูลการประเมิน",
                    text: "ต้องการลบข้อมูลที่เลือกไว้หรือไม่ ???",
                    icon: "question",
                    showConfirmButton: true,
                    confirmButtonText: "ตกลง",
                    confirmButtonColor: "#558b2f",
                    showCancelButton: true,
                    cancelButtonText: "ยกเลิก",
                    cancelButtonColor: "#e51c23",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      //ยังไม่มีการลบ
                      handleDeletedetailwork(dataselectworkinfo, usertoken);
                    }
                  });
                } else {
                  Swal.fire({
                    title: "ลบข้อมูลการประเมิน",
                    text: "ยังไม่มีการเลือกข้อมูลการประเมินที่จะทำการลบ !!!",
                    icon: "warning",
                    showConfirmButton: false,
                    timer: 1700,
                  });
                }
              }}
            >
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
      <ModalBox
        idbox={"boxSearchStudent"}
        thisTitle={"ค้นหานศพ"}
        statusClose={setStatusClosemodal}
        content={handleSearchstudentmodal(statusEditwork)}
        styleconfignav={{ display: "none" }}
        styleconfigbody={{ width: "400px" }}
      ></ModalBox>
      <ModalBox
        idbox={"boxSearchAdvisor"}
        thistitle={"ค้นหาอาจารย์"}
        statusClose={setStatusClosemodal}
        content={handleSearchAdvisormodal(statusEditwork)}
        styleconfignav={{ display: "none" }}
        styleconfigbody={{ width: "400px" }}
      ></ModalBox>
    </div>
  );
};
export default ContentWork;
