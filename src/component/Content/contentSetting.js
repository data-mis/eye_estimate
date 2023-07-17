import { useEffect, useState } from "react";
import ModalBox from "../modal/modalBox";
import { handleOpenModalbox } from "../config/modalConfig";
import FetchControlSetting from "../data/fetchControlSetting";
import Cookies from "universal-cookie";
import Spinnerpage from "../config/spinnerpage";
import { HolderlineonTable } from "../config/holdlinetable";
import Swal from "sweetalert2";
import moment from "moment/moment";

const ContentSetting = () => {
  const cookie = new Cookies();
  const usertoken = cookie.get("token");

  const [idsheetworktype, setIdsheetworktype] = useState("");
  const [idsheetdetail, setIdsheetdetail] = useState("");
  const [idsheetHead, setIdsheetHead] = useState("");

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
  const [headsheetName, setHeadsheetName] = useState("");
  const [headsheetType, setHeadsheetType] = useState("");
  const [headsheetNo, setHeadsheetNo] = useState("");

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
        // FetchControlSetting.fetchaddsheetdetail(objectSheetid, token).then(
        //   (message) => {
        //     console.log(message);
        //   }
        // );
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

  const handleAddsheetEstimation = () => {
    if (!sheetdocName || !sheetstart) return;
    let objFetch = {
      name: sheetdocName,
      start: sheetstart,
      stop: sheetend === "" ? "0000-00-00" : sheetend,
    };
    console.log(">>>", objFetch);
    // FetchControlSetting.fetchAddnewSheet(objFetch, usertoken);
  };

  const handleEditsheetEstimation = () => {
    let objFetchedit = {
      id: sheeteditId,
      name: sheeteditdocName,
      start: sheeteditstart,
      stop: sheeteditend,
    };
    console.log(">>>", objFetchedit);
    // FetchControlSetting.fetchEditSheet(objFetchedit, usertoken);
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
      // console.log("listworktype::>", data);
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
        setDataDetaillist(data);
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
      // console.log("arrRes", arrRes);
      casetypeSetdetail(arrRes, type);
    } else {
      // setObjdetailTxt([{ id: id, result: result }]);
      let arrResempty = [{ id: id, result: result }];
      // console.log(">>>", arrResempty);
      casetypeSetdetail(arrResempty, type);
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

  useEffect(() => {
    handleGetWorklisttype(usertoken);
  }, []);

  useEffect(() => {
    if (!idsheetworktype) return;
    handleGetHeadsheet(idsheetworktype, usertoken);
    handleGetsheetdetail(idsheetworktype, usertoken);
  }, [idsheetworktype]);

  return (
    <div className="body-contentSetting">
      <div className="header-nav-contentSetting">
        <div className="boxCol-navheader">
          <div className="btn-boxHeader">
            <div className="col-btnboxheader">
              <button
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
                type="button"
                onClick={() => {
                  addDetailsheet(idsheetworktype, usertoken);
                }}
              >
                {"เพิ่มรายละเอียด"}
              </button>
              <button
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
            className="btn-nav-menuopen"
            id="btnOpenNavmenu"
            type="button"
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
            <table className="table-show-info" style={{ width: "800px" }}>
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
            </table>
          </div>
        </div>
        {/* ส่วนหัวข้อเรื่อง */}
        <div className="nav-boxtable-type">
          <span>{"header"}</span>
          <button type="button">{"เพิ่ม Header"}</button>
          <button type="button">{"ลบ Header"}</button>
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
                <tr>
                  <td width={250}>{"(ชื่อ)"}</td>
                  <td width={50}>{"(ชนิด)"}</td>
                  <td width={50}>{"(ลำดับ)"}</td>
                  <td width={80}>
                    <button className="btn-edit-tableShowinfo" type="button">
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* ส่วนแสดงรายละเอียดหัวข้อต่างๆ */}
        <div className="box-table-detail">
          <div className="tablebox-boxtabletype">
            <table className="table-show-info">
              <thead>
                <tr>
                  <th>{"รายละเอียด"}</th>
                  <th>{"score"}</th>
                  <th>{"R.score"}</th>
                  <th>{"type"}</th>
                  <th>{"บันทึก"}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <textarea className="textarea-input-contentSetting"></textarea>
                  </td>
                  <td>
                    <input
                      className="input-edit-tableShowinfo"
                      type="text"
                    ></input>
                  </td>
                  <td>
                    <input
                      className="input-edit-tableShowinfo"
                      type="text"
                    ></input>
                  </td>
                  <td>
                    <input
                      className="input-edit-tableShowinfo"
                      type="text"
                    ></input>
                  </td>
                  <td>
                    <button className="btn-edit-Detail">
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* ส่วนระดับคะแนนตัวเลือกที่จะประเมิน */}
        <div className="nav-boxtable-type">
          <span>{"ตัวเลือก"}</span>
          <button type="button">{"เพิ่มตัวเลือก"}</button>
          <button type="button">{"ลบตัวเลือก"}</button>
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
                <tr>
                  <td>{"(ตัวเลือก)"}</td>
                  <td>{"(คะแนน)"}</td>
                  <td>{"(ลำดับ)"}</td>
                  <td>{"(type)"}</td>
                  <td>
                    <button className="btn-edit-tableShowinfo" type="button">
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* หมายเหตุ */}
        <div className="box-table-type">
          <div className="nav-boxtable-type">
            <span>{"หมายเหตุ"}</span>
          </div>
          <textarea className="textarea-contentSetting"></textarea>
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
                    console.log(data);
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
                          // console.log("headID>>>",data.Id)
                          setIdsheetHead(data.Id);
                        }}
                      >
                        <td width={250}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            value={data.txt.trim()}
                            onChange={(e) => {
                              setHeadsheetName(e.target.value);
                            }}
                          ></input>
                        </td>
                        <td width={150}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            // defaultValue={data.type.trim()}
                            value={data.type.trim()}
                            onChange={(e) => {
                              setHeadsheetType(e.target.value);
                            }}
                          ></input>
                        </td>
                        <td width={150}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            // defaultValue={data.no.trim()}
                            value={data.no.trim()}
                            onChange={(e) => {
                              setHeadsheetNo(e.target.value);
                            }}
                          ></input>
                        </td>
                        <td width={100}>
                          <button
                            className="button-editnormal-tableShowinfo"
                            type="button"
                            onClick={() => {
                              console.log(data);
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
            <textarea className="textarea-contentSetting"></textarea>
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
                              defaultValue={data.txt ? data.txt.trim() : ""}
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
                              defaultValue={data.score ? data.score.trim() : ""}
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
                              defaultValue={
                                data.real_score ? data.real_score.trim() : ""
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
                              defaultValue={
                                data.score_type ? data.score_type.trim() : ""
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
                                console.log("ไอดีเช็ค", data.Id);
                                console.log("เทสเก็บข้อมูล", objdetailTxt);
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
          <div className="nav-boxtable-type">
            <span>{"ตัวเลือก"}</span>
            <button type="button">{"เพิ่ม ตัวเลือก"}</button>
            <button type="button">{"ลบ ตัวเลือก"}</button>
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
                        }}
                      >
                        <td width={250}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            defaultValue={data.txt.trim()}
                          ></input>
                        </td>
                        <td width={100}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            defaultValue={data.score.trim()}
                          ></input>
                        </td>
                        <td width={100}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            defaultValue={data.no.trim()}
                          ></input>
                        </td>
                        <td width={100}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            defaultValue={data.type.trim()}
                          ></input>
                        </td>
                        <td width={100}>
                          <button
                            type="button"
                            className="btn-edit-tableShowinfo"
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
