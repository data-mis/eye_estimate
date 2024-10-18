import { useEffect, useState } from "react";
import ModalBox from "../modal/modalBox";
import { handleOpenModalbox } from "../config/modalConfig";
import FetchControlSetting from "../data/fetchControlSetting";
import Cookies from "universal-cookie";
import Spinnerpage from "../config/spinnerpage";
import { HolderlineonTable } from "../config/holdlinetable";
import Swal from "sweetalert2";
import moment from "moment/moment";

const ContentSetting = (props) => {
  const cookie = new Cookies();
  const usertoken = cookie.get("studentEyeToken");

  const [idsheetworktype, setIdsheetworktype] = useState("");
  const [idsheetdetail, setIdsheetdetail] = useState("");
  const [idsheetHead, setIdsheetHead] = useState("");
  const [idchoicesheet, setIdchoicesheet] = useState("");

  const [dataworklisttype, setDataworklisttype] = useState([]);
  const [dataHeaderlist, setDataHeaderlist] = useState([]);
  const [dataDetaillist, setDataDetaillist] = useState([]);
  const [dataChoicedetail, setDataChoicedetail] = useState([]);

  const [statusCloseMDLeditHDdoc, setStatusCloseMDLeditHDdoc] = useState(false);
  const [statusCloseModalAdddoc, setStatusCloseModalAdddoc] = useState(false);

  //Addsheetdoc
  const [sheetdocName, setSheetdocName] = useState("");
  const [sheetstart, setSheetstart] = useState("");
  const [sheetend, setSheetend] = useState("");

  //Editsheetdoc
  const [sheeteditId, setSheeteditId] = useState("");
  const [sheeteditdocName, setSheeteditdocName] = useState("");
  const [sheeteditstart, setSheeteditstart] = useState("");
  const [sheeteditend, setSheeteditend] = useState("");

  //Editheadersheet
  const [headsheetName, setHeadsheetName] = useState([{ id: "", result: "" }]);
  const [headsheetType, setHeadsheetType] = useState([{ id: "", result: "" }]);
  const [headsheetNo, setHeadsheetNo] = useState([{ id: "", result: "" }]);

  //choicesheet
  const [choicesheet, setChoicesheet] = useState([{ id: "", result: "" }]);
  const [choicescore, setChoicescore] = useState([{ id: "", result: "" }]);
  const [choiceno, setChoiceno] = useState([{ id: "", result: "" }]);
  const [choicetype, setChoicetype] = useState([{ id: "", result: "" }]);

  //detailobj
  const [objdetailTxt, setObjdetailTxt] = useState([{ id: "", result: "" }]);
  const [objdetailrealscore, setObjdetailrealscore] = useState([
    {
      id: "",
      result: "",
    },
  ]);
  const [objdetailscore, setObjdetailscore] = useState([
    { id: "", result: "" },
  ]);
  const [objdetailscoretype, setObjdetailscoretype] = useState([
    {
      id: "",
      result: "",
    },
  ]);
  const [objdetailsheetid, setObjdetailsheetid] = useState([
    {
      id: "",
      result: "",
    },
  ]);
  const [objdetailtxt, setObjdetailtxt] = useState([{ id: "", result: "" }]);

  //noteSheet
  const [notesheet, setNotesheet] = useState("");

  const docGetId = (id) => {
    return document.getElementById(id);
  };
  const addDetailsheet = (sheetid, token) => {
    let objectSheetid = {
      sheet_id: sheetid,
    };
    Swal.fire({
      title: "เพิ่มรายละเอียด sheet !!",
      text: "ต้องการเพิ่มรายละเอียด sheet ใช่หรือไม่ ??",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((res) => {
      if (res.isConfirmed) {
        console.log("ob sheetid", objectSheetid);
        FetchControlSetting.fetchaddsheetdetail(objectSheetid, token).then(
          (message) => {
            console.log(message);
            handleGetsheetdetail(idsheetworktype, usertoken);
          }
        );
      }
    });
  };

  const delDetailsheet = (detailid, token) => {
    if (!detailid) return;
    let objectdetailid = {
      id: detailid,
    };
    Swal.fire({
      title: "ลบรายละเอียด sheet !!",
      text: "ต้องการลบรายละเอียดที่เลือกหรือไม่ ?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("ต้องการลบ ทำงานต่อ");
        console.log(objectdetailid);
        FetchControlSetting.fetchdelsheetdetail(objectdetailid, token).then(
          (message) => {
            console.log(message);
            handleGetsheetdetail(idsheetworktype, usertoken);
          }
        );
      }
    });
  };

  const handleAddDocument = () => {
    return (
      <div className="body-contentsetting-modal">
        <div className="title-contentsetting-modal">
          <div className="title-center">
            <span>{"เพิ่มข้อมูล แบบประเมิน"}</span>
          </div>
        </div>
        <div className="info-contentsetting-modal">
          <div className="row-infoContentsetting-modal">
            <span>{"ชื่อ"}</span>
            <input
              className="inputinfo-editsheet-setting"
              type="text"
              value={sheetdocName}
              onChange={(e) => {
                setSheetdocName(e.target.value);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
          </div>
          <div className="middle-infoContentsetting-modal">
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"เริ่ม"}</span>
              <input
                className="inputinfo-editsheet-setting"
                type="date"
                value={sheetstart}
                onChange={(e) => {
                  setSheetstart(moment(e.target.value).format("YYYY-MM-DD"));
                }}
              ></input>
            </div>
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"สิ้นสุด"}</span>
              <input
                className="inputinfo-editsheet-setting"
                type="date"
                value={sheetend}
                onChange={(e) => {
                  setSheetend(moment(e.target.value).format("YYYY-MM-DD"));
                }}
              ></input>
            </div>
          </div>
          <div className="btnsubmit-infoContentsetting-modal">
            <button
              type="button"
              onClick={() => {
                handleAddsheetEstimation();
              }}
            >
              {"บันทึก"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  const handlecloseclearModalAddSheetEstimation = () => {
    setSheetdocName("");
    setSheetstart("");
    setSheetend("");
    document.getElementById("modalAddDocument").style.display = "none";
  };

  const handleAddsheetEstimation = () => {
    if (!sheetdocName || !sheetstart) return;
    let objFetch = {
      name: sheetdocName,
      start: sheetstart,
      stop: sheetend === "" ? "0000-00-00" : sheetend,
    };
    // console.log(">>>", objFetch);
    FetchControlSetting.fetchAddnewSheet(objFetch, usertoken).then(
      (message) => {
        console.log(message);
        handlecloseclearModalAddSheetEstimation();
        handleGetWorklisttype(usertoken);
        Swal.fire({
          icon: "success",
          showConfirmButton: false,
          showCancelButton: false,
          timer: 1700,
          background: "none",
        });
      }
    );
  };

  const handleEditsheetEstimation = () => {
    let objFetchedit = {
      id: sheeteditId,
      name: sheeteditdocName,
      start: sheeteditstart,
      stop: sheeteditend,
    };
    FetchControlSetting.fetchEditSheet(objFetchedit, usertoken).then(
      (message) => {
        console.log(message);
        document.getElementById("modalEditheaderTypeSetting").style.display =
          "none";
        handleGetWorklisttype(usertoken);
        Swal.fire({
          icon: "success",
          showCancelButton: false,
          showConfirmButton: false,
          timer: 1200,
          background: "none",
        });
      }
    );
  };

  const handleContentEditHeadertype = () => {
    return (
      <div className="body-contentsetting-modal">
        <div className="title-contentsetting-modal">
          <div className="title-center">
            <span>{"แก้ไขข้อมูล แบบประเมิน"}</span>
          </div>
        </div>
        <div className="info-contentsetting-modal">
          <div className="row-infoContentsetting-modal">
            <span className="boxspantitle-setting">{"ชื่อ : "}</span>
            <input
              className="inputinfo-editsheet-setting"
              type="text"
              value={sheeteditdocName}
              onChange={(e) => {
                setSheeteditdocName(e.target.value);
              }}
            ></input>
          </div>
          <div className="middle-infoContentsetting-modal">
            <div className="rowMiddle-infoContentsetting-modal">
              <span className="boxspantitle-setting">{"เริ่ม"}</span>
              <input
                className="inputinfo-editsheet-setting"
                type="date"
                value={sheeteditstart}
                onChange={(e) => {
                  setSheeteditstart(
                    moment(e.target.value).format("YYYY-MM-DD")
                  );
                }}
              ></input>
            </div>
            <div className="rowMiddle-infoContentsetting-modal">
              <span className="boxspantitle-setting">{"สิ้นสุด"}</span>
              <input
                type="date"
                value={sheeteditend}
                onChange={(e) => {
                  setSheeteditend(moment(e.target.value).format("YYYY-MM-DD"));
                }}
              ></input>
            </div>
          </div>
          <div className="btnsubmit-infoContentsetting-modal">
            <button
              type="button"
              onClick={() => {
                handleEditsheetEstimation();
              }}
            >
              {"บันทึก"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleGetWorklisttype = (token) => {
    FetchControlSetting.fetchSettingworklistdata(token).then((data) => {
      console.log("listworktype::>", data);
      setDataworklisttype(data);
      setIdsheetworktype(data[0].Id);
      setTimeout(() => {
        HolderlineonTable(
          "tableTR-setting-worklisttype",
          `tr-settingworklisttype-`,
          0
        );
      }, 500);
    });
  };

  const handleGetHeadsheet = (sheetid, token) => {
    let objectheadid = {
      sheet_id: sheetid,
    };
    // console.log("thisobjectheadid>>>", objectheadid);
    FetchControlSetting.fetchSettingHeadsheet(objectheadid, token).then(
      (data) => {
        // console.log("headdata>>>", data);
        setDataHeaderlist(data);
      }
    );
  };

  const handleGetsheetdetail = (sheetid, token) => {
    let objectdetailsheet = {
      sheet_id: sheetid,
    };
    FetchControlSetting.fetchgetsheetdetail(objectdetailsheet, token).then(
      (data) => {
        console.log("ดูรายละเอียด sheet !", data);
        setDataDetaillist(data);
        data.map((ele) => {
          setObjdetailTxt(...objdetailTxt, { id: ele.Id, result: ele.txt });
          setObjdetailscore(...objdetailscore, {
            id: ele.Id,
            result: ele.score,
          });
          setObjdetailrealscore(...objdetailrealscore, {
            id: ele.Id,
            result: ele.real_score,
          });
          setObjdetailscoretype(...objdetailscoretype, {
            id: ele.Id,
            result: ele.score_type,
          });
        });
        let arrTxt = [],
          arrScore = [],
          arrRealscore = [],
          arrScoretype = [];
        data.map((res) => {
          arrTxt.push({ id: res.Id, result: res.txt });
          arrScore.push({ id: res.Id, result: res.score });
          arrRealscore.push({ id: res.Id, result: res.real_score });
          arrScoretype.push({ id: res.Id, result: res.score_type });
        });
        // console.log("!>", arrTxt, arrScore, arrRealscore, arrScoretype);
        setObjdetailTxt(arrTxt);
        setObjdetailscore(arrScore);
        setObjdetailrealscore(arrRealscore);
        setObjdetailscoretype(arrScoretype);
      }
    );
  };

  const handleGetChoicedetail = (detailId, token) => {
    let objectdetailId = {
      sheet_detail_id: detailId,
    };
    // console.log("this ob detailId->>", objectdetailId);
    FetchControlSetting.fetchgetsheetchoice(objectdetailId, token).then(
      (data) => {
        // console.log("data choice >>>", data);
        setDataChoicedetail(data);
      }
    );
  };

  const handleEditSheetdetail = (id) => {
    let objEditdetail = {
      id: "",
      txt: "",
      score: "",
      real_score: "",
      score_type: "",
    };
    objEditdetail.id = id;
    objdetailTxt.map((data) => {
      if (data.id === id) {
        objEditdetail.txt = data.result;
      }
    });
    objdetailscore.map((data) => {
      if (data.id === id) {
        objEditdetail.score = data.result;
      }
    });
    objdetailrealscore.map((data) => {
      if (data.id === id) {
        objEditdetail.real_score = data.result;
      }
    });
    objdetailscoretype.map((data) => {
      if (data.id === id) {
        objEditdetail.score_type = data.result;
      }
    });
    console.log("final", objEditdetail);
    FetchControlSetting.fetchEditsheetdetail(objEditdetail, usertoken).then(
      (message) => {
        console.log(message);
      }
    );
  };

  const casetypeSetdetail = (forset, type) => {
    console.log("object for set ===>", forset);
    switch (type) {
      case "txt":
        setObjdetailTxt(forset);
        break;
      case "score":
        setObjdetailscore(forset);
        break;
      case "realScore":
        setObjdetailrealscore(forset);
        break;
      case "scoreType":
        setObjdetailscoretype(forset);
        break;
      case "headsheet":
        setHeadsheetName(forset);
        break;
      case "headtype":
        setHeadsheetType(forset);
        break;
      case "headno":
        setHeadsheetNo(forset);
        break;
      case "choicesheet":
        setChoicesheet(forset);
        break;
      case "choicescore":
        setChoicescore(forset);
        break;
      case "choiceno":
        setChoiceno(forset);
        break;
      case "choicetype":
        setChoicetype(forset);
        break;
    }
  };

  const handleobjDetailedit = (idobj, id, result, type) => {
    let pass = true;
    if (idobj[0].id !== "") {
      let arrRes = [];
      idobj.map((ele) => {
        if (ele.id !== id) {
          // console.log("!==", ele);
          arrRes.push(ele);
        }
      });
      arrRes.push({ id: id, result: result });
      console.log("arrRes", arrRes);
      casetypeSetdetail(arrRes, type);
    } else {
      // setObjdetailTxt([{ id: id, result: result }]);
      let arrResempty = [{ id: id, result: result }];
      console.log(">>>", arrResempty);
      casetypeSetdetail(arrResempty, type);
    }
  };

  const handleshowingvalue = (inputobj, dataobj, dataid) => {
    // console.log("ตัวid >>", dataid);
    // console.log("แสดงค่า", inputobj);
    let result,
      check = false;
    inputobj.map((ele) => {
      if (ele.id === dataid) {
        result = ele.result;
        check = true;
      }
    });
    if (check) {
      return result;
    } else {
      return dataobj;
    }
  };

  const handleAddsheetHead = (idsheettype) => {
    let objAddsheethead = {
      sheet_id: idsheettype,
    };

    FetchControlSetting.fetchAddsheethead(objAddsheethead, usertoken);
  };

  const handleDelsheetHead = (idhead) => {
    let objDelsheethead = {
      id: idhead,
    };
    FetchControlSetting.fetchDelsheethead(objDelsheethead, usertoken);
  };

  const handleUpheadsheet = (
    idsheetHead,
    txtsheethead,
    typesheethead,
    nosheethead
  ) => {
    console.log(idsheetHead);
    if (!idsheetHead) return;
    let txtresult, typeresult, noresult;
    headsheetName.map((ele) => {
      if (idsheetHead === ele.id) {
        txtresult = ele.result;
      }
    });
    headsheetType.map((ele) => {
      if (idsheetHead === ele.id) {
        typeresult = ele.result;
      }
    });
    headsheetNo.map((ele) => {
      if (idsheetHead === ele.id) {
        noresult = ele.result;
      }
    });
    let objectUpsheet = {
      id: idsheetHead,
      txt: txtresult ? txtresult : txtsheethead,
      type: typeresult ? typeresult : typesheethead,
      no: noresult ? noresult : nosheethead,
    };
    // console.log("up this obj>>", objectUpsheet);
    FetchControlSetting.fetchUpsheethead(objectUpsheet, usertoken).then(
      (message) => {
        console.log(message);
      }
    );
  };

  const handleEditChoice = (
    DchoiceId,
    DchoiceTxt,
    DchoiceScore,
    DchoiceType,
    DchoiceNo
  ) => {
    if (!DchoiceId) return;
    let txtresult, scoreresult, typeresult, noresult;
    choicesheet.map((ele) => {
      if (ele.id === DchoiceId) {
        txtresult = ele.result;
      }
    });
    choicescore.map((ele) => {
      if (ele.id === DchoiceId) {
        scoreresult = ele.result;
      }
    });
    choicetype.map((ele) => {
      if (ele.id === DchoiceId) {
        typeresult = ele.result;
      }
    });
    choiceno.map((ele) => {
      if (ele.id === DchoiceId) {
        noresult = ele.result;
      }
    });
    let objUp = {
      id: DchoiceId,
      txt: txtresult ? txtresult : DchoiceTxt,
      score: scoreresult ? scoreresult : DchoiceScore,
      type: typeresult ? typeresult : DchoiceType,
      no: noresult ? noresult : DchoiceNo,
    };
    // console.log("this up choice obj is >>>", objUp);
    FetchControlSetting.fetchUpChoice(objUp, usertoken).then((message) => {
      console.log(message);
    });
  };

  const handleTimecheck = (time) => {
    let count = 0;
    while (count <= time) {
      console.log("count>>", count);
      if (count === time) {
        return (
          <table className="table-show-info">
            <thead>
              <tr>
                <th>{"รายละเอียด"}</th>
                <th>{"Score"}</th>
                <th>{"R.score"}</th>
                <th>{"Type"}</th>
                <th>{"แก้ไข"}</th>
              </tr>
            </thead>
            <tbody>
              <tr>{"-"}</tr>
              <tr>{"-"}</tr>
              <tr>{"-"}</tr>
              <tr>{"-"}</tr>
              <tr>{"-"}</tr>
              <tr>{"-"}</tr>
            </tbody>
          </table>
        );
      } else {
        return <Spinnerpage></Spinnerpage>;
      }
    }
  };

  useEffect(() => {
    handleGetWorklisttype(usertoken);
  }, []);

  useEffect(() => {
    if (!idsheetworktype) return;
    console.log("ทำงานเปลี่ยน sheetwork", idsheetworktype);
    handleGetHeadsheet(idsheetworktype, usertoken);
    handleGetsheetdetail(idsheetworktype, usertoken);
  }, [idsheetworktype]);

  useEffect(() => {
    if (statusCloseModalAdddoc) {
      console.log("close is doing =>", statusCloseModalAdddoc);
      setStatusCloseModalAdddoc(false);
      handlecloseclearModalAddSheetEstimation();
    }
  }, [statusCloseModalAdddoc]);

  return (
    <div className="body-contentSetting">
      <div className="header-nav-contentSetting">
        <div className="boxCol-navheader">
          <div className="btn-boxHeader">
            <div className="col-btnboxheader">
              <button
                className="btn-typeBGhover"
                type="button"
                onClick={() => {
                  handleOpenModalbox("modalAddDocument");
                }}
              >
                {"เพิ่มเอกสาร"}
              </button>
            </div>
            <div className="col-btnboxheader">
              <button
                className="btn-typeBGhover"
                type="button"
                onClick={() => {
                  addDetailsheet(idsheetworktype, usertoken);
                }}
              >
                {"เพิ่มรายละเอียด"}
              </button>
              <button
                className="btn-typeBGhover"
                type="button"
                onClick={() => {
                  delDetailsheet(idsheetdetail, usertoken);
                }}
              >
                {"ลบรายละเอียด"}
              </button>
            </div>
          </div>
        </div>
        <div className="boxCol-navheader">
          <button
            type="button"
            onClick={() => {
              props.close("close");
            }}
          >
            {"ปิด"}
          </button>
        </div>
      </div>
      {/* ขนาดมือถือ */}
      <div className="moblie-contentSetting">
        {/* ส่วนของชนิดการประเมิน */}
        <div className="box-table-type">
          <div className="tablebox-boxtabletype">
            {/* <table className="table-show-info" style={{ width: "800px" }}>
              <thead>
                <tr>
                  <th>{"ชื่อ"}</th>
                  <th>{"เริ่ม"}</th>
                  <th>{"ถึง"}</th>
                  <th>{"แก้ไข"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td width={250}>{"(ชื่อ)"}</td>
                  <td width={150}>{"(เริ่ม)"}</td>
                  <td width={150}>{"(ถึง)"}</td>
                  <td width={100}>
                    <button
                      className="btn-edit-tableShowinfo"
                      type="button"
                      onClick={() => {
                        handleOpenModalbox("modalEditheaderTypeSetting");
                      }}
                    >
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table> */}
            {dataworklisttype[0] ? (
              <table className="table-show-info tableshowworklisttype-setting">
                <thead>
                  <tr>
                    <th>{"ชื่อ"}</th>
                    <th>{"เริ่ม"}</th>
                    <th>{"ถึง"}</th>
                    <th>{"แก้ไข"}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataworklisttype.map((data, index) => {
                    return (
                      <tr
                        className="tableTR-setting-worklisttype"
                        id={`tr-settingworklisttype-${index}`}
                        key={index}
                        onClick={() => {
                          HolderlineonTable(
                            "tableTR-setting-worklisttype",
                            `tr-settingworklisttype-`,
                            index
                          );
                          setIdsheetworktype(data.Id);
                          setNotesheet(data.note);
                          console.log("เลือกโชว์ตัวดาต้า >>", data);
                        }}
                      >
                        <td width={"50%"}>{data.name}</td>
                        <td width={"20%"}>{data.start}</td>
                        <td width={"20%"}>{data.stop}</td>
                        <td width={"10%"}>
                          <button
                            className="btn-edit-tableShowinfo"
                            type="button"
                            onClick={() => {
                              // console.log("data eidt sheet >>>", data);
                              setSheeteditId(data.Id);
                              setSheeteditdocName(data.name);
                              setSheeteditstart(data.start);
                              setSheeteditend(data.stop);
                              handleOpenModalbox("modalEditheaderTypeSetting");
                            }}
                          >
                            <i className="bi-three-dots"></i>
                          </button>
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
        </div>
        {/* ส่วนหัวข้อเรื่อง */}
        <div className="nav-boxtable-type">
          <span>{"header"}</span>
          <button
            type="button"
            onClick={() => {
              // console.log("sheetId", idsheetworktype)

              Swal.fire({
                title: "หัวข้อเรื่องแบบประเมิน",
                text: "ต้องการเพิ่ม หัวข้อเรื่อง ใช่หรือไม่ ?",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
              }).then((res) => {
                if (res.isConfirmed) {
                  // console.log("เพิ่มหัวข้อเรื่อง");
                  handleAddsheetHead(idsheetworktype);
                  handleGetHeadsheet(idsheetworktype, usertoken);
                }
              });
            }}
          >
            {"เพิ่ม Header"}
          </button>
          <button
            type="button"
            onClick={() => {
              // console.log("Id del", idsheetHead);
              if (idsheetHead) {
                Swal.fire({
                  title: "หัวข้อเรื่องแบบประเมิน",
                  text: "ต้องการลบ หัวข้อเรื่อง ใช่หรือไม่ ?",
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: "ตกลง",
                  cancelButtonText: "ยกเลิก",
                }).then((res) => {
                  if (res.isConfirmed) {
                    // console.log("ลบหัวข้อที่เลือก");
                    handleDelsheetHead(idsheetHead);
                    handleGetHeadsheet(idsheetworktype, usertoken);
                  }
                });
              } else {
                Swal.fire({
                  title: "หัวข้อเรื่องแบบประเมิน",
                  text: "กรุณาเลือกหัวข้อที่จะลบก่อน",
                  showConfirmButton: false,
                  showCancelButton: false,
                  icon: "warning",
                  timer: 1200,
                });
              }
            }}
          >
            {"ลบ Header"}
          </button>
        </div>
        <div className="box-table-type">
          <div className="tablebox-boxtabletype">
            <table className="table-show-info" style={{ width: "450px" }}>
              <thead>
                <tr>
                  <th>{"ชื่อ"}</th>
                  <th>{"ชนิด"}</th>
                  <th>{"ลำดับ"}</th>
                  <th>{"บันทึก"}</th>
                </tr>
              </thead>
              <tbody>
                {dataHeaderlist.map((data, index) => {
                  return (
                    <tr
                      key={index}
                      className="tableshow-headinfo1"
                      id={`trshow-headinfo1-${index}`}
                      onClick={() => {
                        HolderlineonTable(
                          "tableshow-headinfo1",
                          "trshow-headinfo1-",
                          index
                        );
                        console.log("headsheet>>>", data);
                        setIdsheetHead(data.Id);
                      }}
                    >
                      <td width={250}>
                        <input
                          className="input-editnormal-tableShowinfo"
                          type="text"
                          value={handleshowingvalue(
                            headsheetName,
                            data.txt.trim(),
                            data.Id
                          )}
                          onChange={(e) => {
                            handleobjDetailedit(
                              headsheetName,
                              data.Id,
                              e.target.value,
                              "headsheet"
                            );
                          }}
                          onFocus={(e) => e.target.select()}
                        ></input>
                      </td>
                      <td width={150}>
                        <input
                          className="input-editnormal-tableShowinfo"
                          type="text"
                          value={handleshowingvalue(
                            headsheetType,
                            data.type.trim(),
                            data.Id
                          )}
                          onChange={(e) => {
                            handleobjDetailedit(
                              headsheetType,
                              data.Id,
                              e.target.value,
                              "headtype"
                            );
                          }}
                          onFocus={(e) => e.target.select()}
                        ></input>
                      </td>
                      <td width={150}>
                        <input
                          className="input-editnormal-tableShowinfo"
                          type="text"
                          value={handleshowingvalue(
                            headsheetNo,
                            data.no.trim(),
                            data.Id
                          )}
                          onChange={(e) => {
                            handleobjDetailedit(
                              headsheetNo,
                              data.Id,
                              e.target.value,
                              "headno"
                            );
                          }}
                          onFocus={(e) => e.target.select()}
                        ></input>
                      </td>
                      <td width={100}>
                        <button
                          className="button-editnormal-tableShowinfo"
                          type="button"
                          onClick={() => {
                            Swal.fire({
                              title: "หัวข้อเรื่องแบบประเมิน",
                              text: "ต้องการ แก้ไข หัวข้อแบบประเมิน ใช่หรือไม่ ?",
                              showConfirmButton: true,
                              showCancelButton: true,
                              confirmButtonText: "ตกลง",
                              cancelButtonText: "ยกเลิก",
                            }).then((res) => {
                              if (res.isConfirmed) {
                                handleUpheadsheet(
                                  data.Id,
                                  data.txt,
                                  data.type,
                                  data.no
                                );
                              }
                            });

                            // console.log(data);
                          }}
                        >
                          save
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* <tr>
                  <td width={250}>{"(ชื่อ)"}</td>
                  <td width={50}>{"(ชนิด)"}</td>
                  <td width={50}>{"(ลำดับ)"}</td>
                  <td width={80}>
                    <button className="btn-edit-tableShowinfo" type="button">
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        {/* ส่วนแสดงรายละเอียดหัวข้อต่างๆ */}
        <div className="box-table-detail">
          <div className="tablebox-boxtabletype">
            {dataDetaillist[0] ? (
              <table className="table-show-info">
                <thead>
                  <tr>
                    <th>{"รายละเอียด"}</th>
                    <th>{"Score"}</th>
                    <th>{"R.score"}</th>
                    <th>{"Type"}</th>
                    <th>{"แก้ไข"}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataDetaillist.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="tableshow-detail-setting"
                        id={`tr-detailsheet-${index}`}
                        onClick={() => {
                          HolderlineonTable(
                            "tableshow-detail-setting",
                            "tr-detailsheet-",
                            index
                          );
                          setIdsheetdetail(data.Id);
                          handleGetChoicedetail(data.Id, usertoken);
                        }}
                      >
                        <td>
                          <textarea
                            className="textarea-input-contentSetting"
                            value={
                              objdetailTxt.result
                                ? objdetailTxt.result
                                : data.txt.trim()
                            }
                            rows={5}
                            cols={40}
                            onChange={(e) => {
                              handleobjDetailedit(
                                objdetailTxt,
                                data.Id,
                                e.target.value,
                                "txt"
                              );
                            }}
                          ></textarea>
                        </td>
                        <td>
                          <input
                            className="input-edit-tableShowinfo"
                            type="number"
                            value={
                              objdetailscore.result
                                ? objdetailscore.result
                                : data.score.trim()
                            }
                            onChange={(e) => {
                              console.log(e.target.value);
                              handleobjDetailedit(
                                objdetailscore,
                                data.Id,
                                e.target.value,
                                "score"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td>
                          <input
                            className="input-edit-tableShowinfo"
                            type="number"
                            value={
                              objdetailrealscore.result
                                ? objdetailrealscore.result
                                : data.real_score.trim()
                            }
                            onChange={(e) => {
                              handleobjDetailedit(
                                objdetailrealscore,
                                data.Id,
                                e.target.value,
                                "realScore"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td>
                          <input
                            className="input-edit-tableShowinfo"
                            type="text"
                            value={
                              objdetailscoretype.result
                                ? objdetailscoretype.result
                                : data.score_type.trim()
                            }
                            onChange={(e) => {
                              handleobjDetailedit(
                                objdetailscoretype,
                                data.Id,
                                e.target.value,
                                "scoreType"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td>
                          <button
                            className="btn-edit-Detail"
                            type="button"
                            onClick={() => {
                              Swal.fire({
                                title: "แก้ไขรายละเอียด sheet",
                                text: "ต้องการแก้ไข รายละเอียด ใช่หรือไม่ ?",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "ตกลง",
                                cancelButtonText: "ยกเลิก",
                              }).then((res) => {
                                if (res.isConfirmed) {
                                  handleEditSheetdetail(data.Id);
                                }
                              });

                              handleEditSheetdetail(data.Id);
                            }}
                          >
                            <i className="bi-three-dots"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            ) : (
              <Spinnerpage />
            )}
          </div>
        </div>
        {/* ส่วนระดับคะแนนตัวเลือกที่จะประเมิน */}
        <div className="nav-boxtable-type">
          <span>{"ตัวเลือก"}</span>
          <button
            type="button"
            onClick={() => {
              console.log("detailID>>>", idsheetdetail);
              if (idsheetdetail) {
                Swal.fire({
                  title: "จัดการตัวเลือก",
                  text: "ต้องการ เพิ่ม ตัวเลือก ใช่ หรือ ไม่ ?",
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: "ตกลง",
                  cancelButtonText: "ยกเลิก",
                }).then((res) => {
                  if (res.isConfirmed) {
                    console.log("เพิ่ม choice");
                    let objadd = {
                      sheet_detail_id: idsheetdetail,
                    };
                    // FetchControlSetting.fetchAddChoice(objadd, usertoken).then(
                    //   (message) => {
                    //     console.log(message);
                    //   }
                    // );
                  }
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "จัดการตัวเลือก",
                  text: "กรุณาเลือก รายละเอียด ก่อนทำรายการ",
                  showConfirmButton: false,
                  showCancelButton: false,
                  timer: 1200,
                });
              }
            }}
          >
            {"เพิ่มตัวเลือก"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (idchoicesheet) {
                Swal.fire({
                  title: "จัดการตัวเลือก",
                  text: "ต้องการ ลบ ตัวเลือก ใช่ หรือ ไม่ ?",
                  icon: "warning",
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: "ตกลง",
                  cancelButtonText: "ยกเลิก",
                }).then((res) => {
                  if (res.isConfirmed) {
                    console.log("ลบ choice");
                    let objdel = {
                      id: idchoicesheet,
                    };
                    // FetchControlSetting.fetchDelChoice(objdel,usertoken).then((message)=>{console.log(message)})
                  }
                });
              } else {
                Swal.fire({
                  icon: "warning",
                  title: "จัดการตัวเลือก",
                  text: "กรุณาเลือก ตัวเลือก ก่อนทำรายการ",
                  showConfirmButton: false,
                  showCancelButton: false,
                  timer: 1200,
                });
              }
            }}
          >
            {"ลบตัวเลือก"}
          </button>
        </div>
        <div className="box-table-type">
          <div className="tablebox-boxtabletype">
            <table className="table-show-info">
              <thead>
                <tr>
                  <th>{"ตัวเลือก"}</th>
                  <th>{"คะแนน"}</th>
                  <th>{"ลำดับ"}</th>
                  <th>{"type"}</th>
                  <th>{"บันทึก"}</th>
                </tr>
              </thead>
              <tbody>
                {dataChoicedetail.map((data, index) => {
                  return (
                    <tr
                      key={index}
                      className="tableshow-score-setting1"
                      id={`trshow-score1-${index}`}
                      onClick={() => {
                        HolderlineonTable(
                          "tableshow-score-setting1",
                          "trshow-score1-",
                          index
                        );
                        setIdchoicesheet(data.Id);
                      }}
                    >
                      <td width={250}>
                        <input
                          className="input-editnormal-tableShowinfo"
                          type="text"
                          // value={choicesheet ? choicesheet : data.txt.trim()}
                          value={handleshowingvalue(
                            choicesheet,
                            data.txt.trim(),
                            data.Id
                          )}
                          onChange={(e) => {
                            // setChoicesheet(e.target.value);
                            handleobjDetailedit(
                              choicesheet,
                              data.Id,
                              e.target.value,
                              "choicesheet"
                            );
                          }}
                          onFocus={(e) => e.target.select()}
                        ></input>
                      </td>
                      <td width={100}>
                        <input
                          className="input-editnormal-tableShowinfo"
                          type="text"
                          value={
                            // choicescore ? choicescore : data.score.trim()
                            handleshowingvalue(
                              choicescore,
                              data.score.trim(),
                              data.Id
                            )
                          }
                          onChange={(e) => {
                            // setChoicescore(e.target.value);
                            handleobjDetailedit(
                              choicescore,
                              data.Id,
                              e.target.value,
                              "choicescore"
                            );
                          }}
                          onFocus={(e) => e.target.select()}
                        ></input>
                      </td>
                      <td width={100}>
                        <input
                          className="input-editnormal-tableShowinfo"
                          type="text"
                          // value={choiceno ? choiceno : data.no.trim()}
                          value={handleshowingvalue(
                            choiceno,
                            data.no.trim(),
                            data.Id
                          )}
                          onChange={(e) => {
                            // setChoiceno(e.target.value);
                            handleobjDetailedit(
                              choiceno,
                              data.Id,
                              e.target.value,
                              "choiceno"
                            );
                          }}
                          onFocus={(e) => e.target.select()}
                        ></input>
                      </td>
                      <td width={100}>
                        <input
                          className="input-editnormal-tableShowinfo"
                          type="text"
                          // value={choicetype ? choicetype : data.type.trim()}
                          value={handleshowingvalue(
                            choicetype,
                            data.type.trim(),
                            data.Id
                          )}
                          onChange={(e) => {
                            // setChoicetype(e.target.value);
                            handleobjDetailedit(
                              choicetype,
                              data.Id,
                              e.target.value,
                              "choicetype"
                            );
                          }}
                          onFocus={(e) => e.target.select()}
                        ></input>
                      </td>
                      <td width={100}>
                        <button
                          type="button"
                          className="btn-edit-tableShowinfo"
                          onClick={() => {
                            Swal.fire({
                              title: "จัดการตัวเลือก",
                              text: "ต้องการ แก้ไข ตัวเลือก ใช่หรือไม่ ?",
                              showConfirmButton: true,
                              showCancelButton: true,
                              confirmButtonText: "ตกลง",
                              cancelButtonText: "ยกเลิก",
                            }).then((res) => {
                              if (res.isConfirmed) {
                                handleEditChoice(
                                  data.Id,
                                  data.txt,
                                  data.score,
                                  data.type,
                                  data.no
                                );
                              }
                            });
                          }}
                        >
                          <i className="bi-three-dots"></i>
                        </button>
                      </td>
                    </tr>
                  );
                })}
                {/* <tr>
                  <td>{"(ตัวเลือก)"}</td>
                  <td>{"(คะแนน)"}</td>
                  <td>{"(ลำดับ)"}</td>
                  <td>{"(type)"}</td>
                  <td>
                    <button className="btn-edit-tableShowinfo" type="button">
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        {/* หมายเหตุ */}
        <div className="box-table-type">
          <div className="nav-boxtable-type">
            <span>{"หมายเหตุ"}</span>
          </div>
          <textarea
            className="textarea-contentSetting"
            value={notesheet}
            onChange={(e) => {
              setNotesheet(e.target.value);
            }}
            onFocus={(e) => e.target.select}
          ></textarea>
        </div>
      </div>
      <div className="normal-contentSetting">
        <div className="col-normal-contentSetting">
          {/* ส่วนของชนิดการประเมิน */}
          <div className="normal-table-type">
            <div className="tablebox-normaltabletype">
              {dataworklisttype[0] ? (
                <table className="table-show-info tableshowworklisttype-setting">
                  <thead>
                    <tr>
                      <th>{"ชื่อ"}</th>
                      <th>{"เริ่ม"}</th>
                      <th>{"ถึง"}</th>
                      <th>{"แก้ไข"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataworklisttype.map((data, index) => {
                      return (
                        <tr
                          className="tableTR-setting-worklisttype1"
                          id={`tr-settingworklisttype1-${index}`}
                          key={index}
                          onClick={() => {
                            HolderlineonTable(
                              "tableTR-setting-worklisttype1",
                              `tr-settingworklisttype1-`,
                              index
                            );
                            setIdsheetworktype(data.Id);
                            console.log("เลือกโชว์ตัวดาต้า >>", data);
                            setNotesheet(data.note);
                          }}
                        >
                          <td width={"50%"}>{data.name}</td>
                          <td width={"20%"}>{data.start}</td>
                          <td width={"20%"}>{data.stop}</td>
                          <td width={"10%"}>
                            <button
                              className="btn-edit-tableShowinfo"
                              type="button"
                              onClick={() => {
                                // console.log("data eidt sheet >>>", data);
                                setSheeteditId(data.Id);
                                setSheeteditdocName(data.name);
                                setSheeteditstart(data.start);
                                setSheeteditend(data.stop);
                                handleOpenModalbox(
                                  "modalEditheaderTypeSetting"
                                );
                              }}
                            >
                              <i className="bi-three-dots"></i>
                            </button>
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
          </div>
          <div className="nav-boxtable-type">
            <span>{"Header"}</span>
            <button
              type="button"
              onClick={() => {
                // console.log("sheetId", idsheetworktype)

                Swal.fire({
                  title: "หัวข้อเรื่องแบบประเมิน",
                  text: "ต้องการเพิ่ม หัวข้อเรื่อง ใช่หรือไม่ ?",
                  showConfirmButton: true,
                  showCancelButton: true,
                  confirmButtonText: "ตกลง",
                  cancelButtonText: "ยกเลิก",
                }).then((res) => {
                  if (res.isConfirmed) {
                    // console.log("เพิ่มหัวข้อเรื่อง");
                    handleAddsheetHead(idsheetworktype);
                    handleGetHeadsheet(idsheetworktype, usertoken);
                  }
                });
              }}
            >
              {"เพิ่ม Header"}
            </button>
            <button
              type="button"
              onClick={() => {
                // console.log("Id del", idsheetHead);
                if (idsheetHead) {
                  Swal.fire({
                    title: "หัวข้อเรื่องแบบประเมิน",
                    text: "ต้องการลบ หัวข้อเรื่อง ใช่หรือไม่ ?",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "ตกลง",
                    cancelButtonText: "ยกเลิก",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      // console.log("ลบหัวข้อที่เลือก");
                      handleDelsheetHead(idsheetHead);
                      handleGetHeadsheet(idsheetworktype, usertoken);
                    }
                  });
                } else {
                  Swal.fire({
                    title: "หัวข้อเรื่องแบบประเมิน",
                    text: "กรุณาเลือกหัวข้อที่จะลบก่อน",
                    showConfirmButton: false,
                    showCancelButton: false,
                    icon: "warning",
                    timer: 1200,
                  });
                }
              }}
            >
              {"ลบ Header"}
            </button>
          </div>
          {/* ส่วนหัวข้อเรื่อง */}
          <div className="normal-table-type">
            <div className="tablebox-normaltabletype">
              <table className="table-show-info" style={{ width: "650px" }}>
                <thead>
                  <tr>
                    <th>{"ชื่อ"}</th>
                    <th>{"ชนิด"}</th>
                    <th>{"ลำดับ"}</th>
                    <th>{"บันทึก"}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataHeaderlist.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="tableshow-headinfo"
                        id={`trshow-headinfo-${index}`}
                        onClick={() => {
                          HolderlineonTable(
                            "tableshow-headinfo",
                            "trshow-headinfo-",
                            index
                          );
                          console.log("headsheet>>>", data);
                          setIdsheetHead(data.Id);
                        }}
                      >
                        <td width={250}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            value={handleshowingvalue(
                              headsheetName,
                              data.txt.trim(),
                              data.Id
                            )}
                            onChange={(e) => {
                              handleobjDetailedit(
                                headsheetName,
                                data.Id,
                                e.target.value,
                                "headsheet"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td width={150}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            value={handleshowingvalue(
                              headsheetType,
                              data.type.trim(),
                              data.Id
                            )}
                            onChange={(e) => {
                              handleobjDetailedit(
                                headsheetType,
                                data.Id,
                                e.target.value,
                                "headtype"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td width={150}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            value={handleshowingvalue(
                              headsheetNo,
                              data.no.trim(),
                              data.Id
                            )}
                            onChange={(e) => {
                              handleobjDetailedit(
                                headsheetNo,
                                data.Id,
                                e.target.value,
                                "headno"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td width={100}>
                          <button
                            className="button-editnormal-tableShowinfo"
                            type="button"
                            onClick={() => {
                              Swal.fire({
                                title: "หัวข้อเรื่องแบบประเมิน",
                                text: "ต้องการ แก้ไข หัวข้อแบบประเมิน ใช่หรือไม่ ?",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "ตกลง",
                                cancelButtonText: "ยกเลิก",
                              }).then((res) => {
                                if (res.isConfirmed) {
                                  handleUpheadsheet(
                                    data.Id,
                                    data.txt,
                                    data.type,
                                    data.no
                                  );
                                }
                              });

                              // console.log(data);
                            }}
                          >
                            save
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* หมายเหตุ */}
          <div className="boxnormal-table-type">
            <div className="nav-boxtable-type">
              <span>{"หมายเหตุ"}</span>
            </div>
            <textarea
              className="textarea-contentSetting"
              value={notesheet}
              onChange={(e) => {
                setNotesheet(e.target.value);
              }}
              onFocus={(e) => e.target.select()}
            ></textarea>
          </div>
        </div>
        {/* ขนาดทั่วไป */}
        <div className="col-normal-contentSetting">
          {/* รายละเอียด */}
          <div className="normal-middle-tabletype">
            <div className="tablebox-normaltabletype boxDetail-tablebox-normaltabletype">
              {dataDetaillist[0] ? (
                <table className="table-show-info">
                  <thead>
                    <tr>
                      <th>{"รายละเอียด2"}</th>
                      <th>{"Score"}</th>
                      <th>{"R.score"}</th>
                      <th>{"Type"}</th>
                      <th>{"แก้ไข"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataDetaillist.map((data, index) => {
                      return (
                        <tr
                          key={index}
                          className="tableshow-detail-setting1"
                          id={`tr-detailsheet1-${index}`}
                          onClick={() => {
                            HolderlineonTable(
                              "tableshow-detail-setting1",
                              "tr-detailsheet1-",
                              index
                            );
                            setIdsheetdetail(data.Id);
                            handleGetChoicedetail(data.Id, usertoken);
                          }}
                        >
                          <td>
                            <textarea
                              className="textarea-input-contentSetting"
                              value={objdetailTxt[index].result}
                              rows={5}
                              cols={40}
                              onChange={(e) => {
                                console.log(
                                  "ข้อความที่จะกรอกทั้งหมด =>",
                                  e.target.value
                                );
                                handleobjDetailedit(
                                  objdetailTxt,
                                  data.Id,
                                  e.target.value,
                                  "txt"
                                );
                              }}
                            ></textarea>
                          </td>
                          <td>
                            <input
                              className="input-edit-tableShowinfo"
                              type="number"
                              value={objdetailscore[index].result}
                              onChange={(e) => {
                                console.log(e.target.value);
                                handleobjDetailedit(
                                  objdetailscore,
                                  data.Id,
                                  e.target.value,
                                  "score"
                                );
                              }}
                              onFocus={(e) => e.target.select()}
                            ></input>
                          </td>
                          <td>
                            <input
                              className="input-edit-tableShowinfo"
                              type="number"
                              value={objdetailrealscore[index].result}
                              onChange={(e) => {
                                handleobjDetailedit(
                                  objdetailrealscore,
                                  data.Id,
                                  e.target.value,
                                  "realScore"
                                );
                              }}
                              onFocus={(e) => e.target.select()}
                            ></input>
                          </td>
                          <td>
                            <input
                              className="input-edit-tableShowinfo"
                              type="text"
                              value={objdetailscoretype[index].result}
                              onChange={(e) => {
                                handleobjDetailedit(
                                  objdetailscoretype,
                                  data.Id,
                                  e.target.value,
                                  "scoreType"
                                );
                              }}
                              onFocus={(e) => e.target.select()}
                            ></input>
                          </td>
                          <td>
                            <button
                              className="btn-edit-Detail"
                              type="button"
                              onClick={() => {
                                // console.log("ไอดีเช็ค", data.Id);
                                // console.log("เทสเก็บข้อมูล", objdetailTxt);
                                Swal.fire({
                                  title: "แก้ไขรายละเอียด sheet",
                                  text: "ต้องการแก้ไข รายละเอียด ใช่หรือไม่ ?",
                                  showConfirmButton: true,
                                  showCancelButton: true,
                                  confirmButtonText: "ตกลง",
                                  cancelButtonText: "ยกเลิก",
                                }).then((res) => {
                                  if (res.isConfirmed) {
                                    handleEditSheetdetail(data.Id);
                                  }
                                });
                              }}
                            >
                              <i className="bi-three-dots"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <table className="table-show-info">
                  <thead>
                    <tr>
                      <th>{"รายละเอียด"}</th>
                      <th>{"Score"}</th>
                      <th>{"R.score"}</th>
                      <th>{"Type"}</th>
                      <th>{"แก้ไข"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>{"-"}</tr>
                    <tr>{"-"}</tr>
                    <tr>{"-"}</tr>
                    <tr>{"-"}</tr>
                    <tr>{"-"}</tr>
                    <tr>{"-"}</tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
          <div className="nav-boxtable-type">
            <span>{"ตัวเลือก"}</span>
            <button
              type="button"
              onClick={() => {
                console.log("detailID>>>", idsheetdetail);
                if (idsheetdetail) {
                  Swal.fire({
                    title: "จัดการตัวเลือก",
                    text: "ต้องการ เพิ่ม ตัวเลือก ใช่ หรือ ไม่ ?",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "ตกลง",
                    cancelButtonText: "ยกเลิก",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      console.log("เพิ่ม choice");
                      let objadd = {
                        sheet_detail_id: idsheetdetail,
                      };
                      FetchControlSetting.fetchAddChoice(
                        objadd,
                        usertoken
                      ).then((message) => {
                        console.log(message);
                        handleGetChoicedetail(idsheetdetail, usertoken);
                      });
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "จัดการตัวเลือก",
                    text: "กรุณาเลือก รายละเอียด ก่อนทำรายการ",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1200,
                  });
                }
              }}
            >
              {"เพิ่ม ตัวเลือก"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (idchoicesheet) {
                  Swal.fire({
                    title: "จัดการตัวเลือก",
                    text: "ต้องการ ลบ ตัวเลือก ใช่ หรือ ไม่ ?",
                    icon: "warning",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "ตกลง",
                    cancelButtonText: "ยกเลิก",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      console.log("ลบ choice");
                      let objdel = {
                        id: idchoicesheet,
                      };
                      // FetchControlSetting.fetchDelChoice(objdel,usertoken).then((message)=>{console.log(message)})
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "จัดการตัวเลือก",
                    text: "กรุณาเลือก ตัวเลือก ก่อนทำรายการ",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1200,
                  });
                }
              }}
            >
              {"ลบ ตัวเลือก"}
            </button>
          </div>
          {/* ส่วนระดับคะแนนตัวเลือกที่จะประเมิน */}
          <div className="normal-table-type">
            <div className="tablebox-normaltabletype">
              <table className="table-show-info" style={{ width: "650px" }}>
                <thead>
                  <tr>
                    <th>{"ตัวเลือก"}</th>
                    <th>{"คะแนน"}</th>
                    <th>{"ลำดับ"}</th>
                    <th>{"type"}</th>
                    <th>{"บันทึก"}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataChoicedetail.map((data, index) => {
                    return (
                      <tr
                        key={index}
                        className="tableshow-score-setting"
                        id={`trshow-score-${index}`}
                        onClick={() => {
                          HolderlineonTable(
                            "tableshow-score-setting",
                            "trshow-score-",
                            index
                          );
                          setIdchoicesheet(data.Id);
                        }}
                      >
                        <td width={250}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            // value={choicesheet ? choicesheet : data.txt.trim()}
                            value={handleshowingvalue(
                              choicesheet,
                              data.txt.trim(),
                              data.Id
                            )}
                            onChange={(e) => {
                              // setChoicesheet(e.target.value);
                              handleobjDetailedit(
                                choicesheet,
                                data.Id,
                                e.target.value,
                                "choicesheet"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td width={100}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            value={
                              // choicescore ? choicescore : data.score.trim()
                              handleshowingvalue(
                                choicescore,
                                data.score.trim(),
                                data.Id
                              )
                            }
                            onChange={(e) => {
                              // setChoicescore(e.target.value);
                              handleobjDetailedit(
                                choicescore,
                                data.Id,
                                e.target.value,
                                "choicescore"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td width={100}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            // value={choiceno ? choiceno : data.no.trim()}
                            value={handleshowingvalue(
                              choiceno,
                              data.no.trim(),
                              data.Id
                            )}
                            onChange={(e) => {
                              // setChoiceno(e.target.value);
                              handleobjDetailedit(
                                choiceno,
                                data.Id,
                                e.target.value,
                                "choiceno"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td width={100}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            // value={choicetype ? choicetype : data.type.trim()}
                            value={handleshowingvalue(
                              choicetype,
                              data.type.trim(),
                              data.Id
                            )}
                            onChange={(e) => {
                              // setChoicetype(e.target.value);
                              handleobjDetailedit(
                                choicetype,
                                data.Id,
                                e.target.value,
                                "choicetype"
                              );
                            }}
                            onFocus={(e) => e.target.select()}
                          ></input>
                        </td>
                        <td width={100}>
                          <button
                            type="button"
                            className="btn-edit-tableShowinfo"
                            onClick={() => {
                              Swal.fire({
                                title: "จัดการตัวเลือก",
                                text: "ต้องการ แก้ไข ตัวเลือก ใช่หรือไม่ ?",
                                showConfirmButton: true,
                                showCancelButton: true,
                                confirmButtonText: "ตกลง",
                                cancelButtonText: "ยกเลิก",
                              }).then((res) => {
                                if (res.isConfirmed) {
                                  handleEditChoice(
                                    data.Id,
                                    data.txt,
                                    data.score,
                                    data.type,
                                    data.no
                                  );
                                }
                              });
                            }}
                          >
                            <i className="bi-three-dots"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ModalBox
        idbox="modalAddDocument"
        statusClose={setStatusCloseModalAdddoc}
        content={handleAddDocument()}
      ></ModalBox>
      <ModalBox
        idbox={"modalEditheaderTypeSetting"}
        statusClose={setStatusCloseMDLeditHDdoc}
        content={handleContentEditHeadertype()}
      ></ModalBox>
    </div>
  );
};
export default ContentSetting;
