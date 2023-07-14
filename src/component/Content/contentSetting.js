import { useEffect, useState } from "react";
import ModalBox from "../modal/modalBox";
import { handleOpenModalbox } from "../config/modalConfig";
import FetchControlSetting from "../data/fetchControlSetting";
import Cookies from "universal-cookie";
import Spinnerpage from "../config/spinnerpage";
import { HolderlineonTable } from "../config/holdlinetable";
import Swal from "sweetalert2";

const ContentSetting = () => {
  const cookie = new Cookies();
  const usertoken = cookie.get("token");

  const [idsheetworktype, setIdsheetworktype] = useState("");
  const [idsheetdetail, setIdsheetdetail] = useState("");

  const [dataworklisttype, setDataworklisttype] = useState([]);
  const [dataHeaderlist, setDataHeaderlist] = useState([]);
  const [dataDetaillist, setDataDetaillist] = useState([]);
  const [dataChoicedetail, setDataChoicedetail] = useState([]);

  const [statusCloseMDLeditHDdoc, setStatusCloseMDLeditHDdoc] = useState(false);
  const [statusCloseModalAdddoc, setStatusCloseModalAdddoc] = useState(false);

  //detailobj
  const [objdetailId, setObjdetailId] = useState({ id: "", result: "" });
  const [objdetailrealscore, setObjdetailrealscore] = useState({
    id: "",
    result: "",
  });
  const [objdetailscore, setObjdetailscore] = useState({ id: "", result: "" });
  const [objdetailscoretype, setObjdetailscoretype] = useState({
    id: "",
    result: "",
  });
  const [objdetailsheetid, setObjdetailsheetid] = useState({
    id: "",
    result: "",
  });
  const [objdetailtxt, setObjdetailtxt] = useState({ id: "", result: "" });

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
            <input type="text"></input>
          </div>
          <div className="middle-infoContentsetting-modal">
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"เริ่ม"}</span>
              <input type="date"></input>
            </div>
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"สิ้นสุด"}</span>
              <input type="date"></input>
            </div>
          </div>
          <div className="btnsubmit-infoContentsetting-modal">
            <button type="button">{"บันทึก"}</button>
          </div>
        </div>
      </div>
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
            <span>{"ชื่อ"}</span>
            <input type="text"></input>
          </div>
          <div className="middle-infoContentsetting-modal">
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"เริ่ม"}</span>
              <input type="date"></input>
            </div>
            <div className="rowMiddle-infoContentsetting-modal">
              <span>{"สิ้นสุด"}</span>
              <input type="date"></input>
            </div>
          </div>
          <div className="btnsubmit-infoContentsetting-modal">
            <button type="button">{"บันทึก"}</button>
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
        console.log("data detail this >>", data);
        setDataDetaillist(data);
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
        console.log("data choice >>>", data);
        setDataChoicedetail(data);
      }
    );
  };

  const handleEditSheetdetail = (id) => {
    if (objdetailId.id === id) {
      console.log("ข้อมูลเก็บมา", objdetailId);
    }
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
            <button type="button">{"เพิ่ม Header"}</button>
            <button type="button">{"ลบ Header"}</button>
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
                        }}
                      >
                        <td width={250}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            defaultValue={data.txt.trim()}
                          ></input>
                        </td>
                        <td width={150}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            defaultValue={data.type.trim()}
                          ></input>
                        </td>
                        <td width={150}>
                          <input
                            className="input-editnormal-tableShowinfo"
                            type="text"
                            defaultValue={data.no.trim()}
                          ></input>
                        </td>
                        <td width={100}>
                          <button
                            className="button-editnormal-tableShowinfo"
                            type="button"
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
                                setObjdetailId({
                                  id: data.Id,
                                  reuslt: e.target.value,
                                });
                              }}
                            ></textarea>
                          </td>
                          <td>
                            <input
                              className="input-edit-tableShowinfo"
                              type="text"
                              defaultValue={data.score ? data.score.trim() : ""}
                              onChange={(e) => {
                                console.log(e.target.value);
                              }}
                            ></input>
                          </td>
                          <td>
                            <input
                              className="input-edit-tableShowinfo"
                              type="text"
                              defaultValue={
                                data.real_score ? data.real_score.trim() : ""
                              }
                            ></input>
                          </td>
                          <td>
                            <input
                              className="input-edit-tableShowinfo"
                              type="text"
                              defaultValue={
                                data.score_type ? data.score_type.trim() : ""
                              }
                            ></input>
                          </td>
                          <td>
                            <button
                              className="btn-edit-Detail"
                              type="button"
                              onClick={() => {
                                console.log("ไอดีเช็ค", data.Id);
                                console.log("เทสเก็บข้อมูล");
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
