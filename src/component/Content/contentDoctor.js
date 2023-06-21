import { useState } from "react";
import { handleOpenModalbox } from "../config/modalConfig";
import ModalBox from "../modal/modalBox";
import { useEffect } from "react";
import FetchController from "../data/fetchConroller";
import Cookies from "universal-cookie";
import Spinnerpage from "../config/spinnerpage";
import { searchDoctorcontent } from "../config/searchConfig";
import moment from "moment";
import Swal from "sweetalert2";

const ContentDoctor = (props) => {
  const cookie = new Cookies();
  const usertoken = cookie.get("token");

  const [statusCloseModal, setStatusCloseModal] = useState(false);
  const [statusDropttl, setStatusDropttl] = useState(false);
  const [statusShowPIN, setStatusShowPIN] = useState(false);

  const [usernamedoc, setUsernamedoc] = useState("");
  const [ttlDoc, setTtlDoc] = useState("");
  const [namedoc, setNamedoc] = useState("");
  const [lnamedoc, setLnamedoc] = useState("");
  const [genderDoc, setGenderDoc] = useState("male");
  const [PINdoc, setPINdoc] = useState("");
  const [startdoc, setStartdoc] = useState("0000-00-00");
  const [stopdoc, setStopdoc] = useState("0000-00-00");

  const [dataTeacher, setDataTeacher] = useState([]);
  const [dataSelectEdit, setDataSelectEdit] = useState([]);
  const [searchtext, setSearchtext] = useState("");
  const [holdIdData, setHoldidData] = useState("");

  const arrTtl = [
    { ttl: "ผศ.นพ." },
    { ttl: "ผศ.พญ." },
    { ttl: "รศ.ดร.พญ." },
    { ttl: "รศ.นพ." },
    { ttl: "รศ.พญ." },
    { ttl: "ศ.ดร.พญ." },
    { ttl: "ศ.นพ." },
    { ttl: "ศ.นญ." },
    { ttl: "อ.นพ." },
    { ttl: "อ.พญ." },
  ];

  const clearInputdocmodal = () => {
    setUsernamedoc("");
    setTtlDoc("");
    setNamedoc("");
    setLnamedoc("");
    setGenderDoc("male");
    setPINdoc("");
    setStartdoc("0000-00-00");
    setStopdoc("0000-00-00");
  };

  const getDocId = (id) => {
    return document.getElementById(id);
  };
  const getDocClass = (id) => {
    return document.getElementsByClassName(id);
  };

  const generatePINforDoc = () => {
    let max = 999999;
    let min = 100000;

    setPINdoc(Math.round(Math.random() * (max - min + 1) + min));
  };

  const handleShowDropdown = (mode) => {
    if (mode === "add") {
      if (!statusDropttl) {
        getDocId("boxDropdownTTL").style.display = "block";
        setStatusDropttl(true);
      } else {
        getDocId("boxDropdownTTL").style.display = "none";
        setStatusDropttl(false);
      }
    } else if (mode === "edit") {
      if (!statusDropttl) {
        getDocId("boxEditDropdownTTL").style.display = "block";
        setStatusDropttl(true);
      } else {
        getDocId("boxEditDropdownTTL").style.display = "none";
        setStatusDropttl(false);
      }
    }
  };

  const handleClickonBody = (e) => {
    if (
      e.target !== getDocClass("btndropdown-ttl-contentInboxModal")[0] &&
      e.target !== getDocClass("bi-caret-down")[0]
    ) {
      getDocId("boxDropdownTTL").style.display = "none";
      setStatusDropttl(false);
    }
    if (
      e.target !== getDocClass("btndropdown-ttl-contentInboxModal")[1] &&
      e.target !== getDocClass("bi-caret-down")[1]
    ) {
      getDocId("boxEditDropdownTTL").style.display = "none";
      setStatusDropttl(false);
    }
  };

  const handleSwithBtnPIN = (status) => {
    if (status) {
      getDocId("btnEyeHide").style.display = "none";
      getDocId("btnEyeShow").style.display = "block";
      setStatusShowPIN(true);
    } else {
      getDocId("btnEyeShow").style.display = "none";
      getDocId("btnEyeHide").style.display = "block";
      setStatusShowPIN(false);
    }
  };

  const contentInmodal = () => {
    return (
      <div
        className="contentInbodyModalBox"
        onClick={(e) => {
          handleClickonBody(e);
        }}
      >
        <div className="header-inboxModal">
          <span>{"เพิ่มข้อมูล อาจารย์"}</span>
        </div>
        <div className="body-content-inboxModal">
          <form
            className="form-contentInboxModal"
            onSubmit={(e) => {
              e.preventDefault();
              let object = {
                adv_id: usernamedoc,
                ttl: ttlDoc,
                name: namedoc,
                lname: lnamedoc,
                sex: genderDoc === "male" ? 1 : 2,
                pin: PINdoc,
                start: startdoc,
                stop: stopdoc,
              };
              handlesubmitAdddoc(object, usertoken);
            }}
          >
            {/* username */}
            <div className="box-input-contentInboxModal">
              <span>{"Username :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="text"
                  onChange={(e) => {
                    setUsernamedoc(e.target.value);
                  }}
                  onFocus={(e) => e.target.select()}
                  value={usernamedoc}
                ></input>
              </div>
            </div>
            {/* คำนำหน้าชื่อ */}
            <div className="box-input-contentInboxModal">
              <span>{"คำนำหน้า :"}</span>
              <div className="contentboxInput-InboxModal">
                <div className="relativeBox-drop">
                  <input
                    type="text"
                    value={ttlDoc}
                    onChange={(e) => {
                      setTtlDoc(e.target.value);
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                  ></input>
                  <button
                    className="btndropdown-ttl-contentInboxModal"
                    type="button"
                    onClick={() => {
                      handleShowDropdown("add");
                    }}
                  >
                    <i className="bi-caret-down"></i>
                  </button>
                  <div
                    className="dropDown-ttl-contentInboxModal"
                    id="boxDropdownTTL"
                  >
                    {arrTtl.map((ele, index) => (
                      <div
                        className="infoTtl-dropdown-contentInboxModal"
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          setTtlDoc(ele.ttl);
                        }}
                      >
                        <span>{ele.ttl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* ชื่อ */}
            <div className="box-input-contentInboxModal">
              <span>{"ชื่อ :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="text"
                  onChange={(e) => {
                    setNamedoc(e.target.value);
                  }}
                  onFocus={(e) => e.target.select()}
                  value={namedoc}
                ></input>
              </div>
            </div>
            {/* นามสกุล */}
            <div className="box-input-contentInboxModal">
              <span>{"นามสกุล :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="text"
                  onChange={(e) => {
                    setLnamedoc(e.target.value);
                  }}
                  onFocus={(e) => e.target.select()}
                  value={lnamedoc}
                ></input>
              </div>
            </div>
            {/* เพศ */}
            <div className="box-input-contentInboxModal">
              <span>{"เพศ :"}</span>
              <div className="contentboxInput-InboxModal">
                <div className="radio-btn-InboxModal">
                  <input
                    type="radio"
                    value={"male"}
                    name={"gender"}
                    checked={genderDoc === "male"}
                    onChange={(e) => {
                      setGenderDoc(e.target.value);
                    }}
                  ></input>
                  <span>{"ชาย"}</span>
                  <input
                    type="radio"
                    value={"female"}
                    name={"gender"}
                    checked={genderDoc === "female"}
                    onChange={(e) => {
                      setGenderDoc(e.target.value);
                    }}
                  ></input>
                  <span>{"หญิง"}</span>
                </div>
              </div>
            </div>
            {/* PIN */}
            <div className="box-input-contentInboxModal">
              <span>{"PIN :"}</span>
              <div className="contentboxInput-InboxModal">
                <div className="relativeBox-PIN" id="boxPIN">
                  <input
                    type={statusShowPIN ? "text" : "password"}
                    value={PINdoc}
                    maxLength={6}
                    onChange={(e) => {
                      e.preventDefault();
                      setPINdoc(e.target.value);
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                  ></input>
                  <button
                    className="btn-eyes-showtext-hide"
                    id="btnEyeHide"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwithBtnPIN(true);
                    }}
                  >
                    <i className="bi-eye"></i>
                  </button>
                  <button
                    className="btn-eyes-showtext-show"
                    type="button"
                    id="btnEyeShow"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSwithBtnPIN(false);
                    }}
                  >
                    <i className="bi-eye-fill"></i>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      generatePINforDoc();
                    }}
                  >
                    <i className="bi-repeat"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* เริ่ม */}
            <div className="box-input-contentInboxModal">
              <span>{"เริ่ม :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="date"
                  onChange={(e) => {
                    if (e.target.value === "" || !e.target.value) {
                      setStartdoc("0000-00-00");
                    } else {
                      setStartdoc(e.target.value);
                    }
                  }}
                  value={startdoc}
                ></input>
              </div>
            </div>
            {/* หยุด */}
            <div className="box-input-contentInboxModal">
              <span>{"หยุด :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="date"
                  onChange={(e) => {
                    if (e.target.value === "" || !e.target.value) {
                      setStopdoc("0000-00-00");
                    } else {
                      setStopdoc(e.target.value);
                    }
                  }}
                  value={stopdoc}
                ></input>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <div className="btnSubmit-boxContentInboxModal">
                <button type="submit">{"บันทึก"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const contentEditboxdoc = (data) => {
    return (
      <div
        className="contentInbodyModalBox"
        onClick={(e) => {
          handleClickonBody(e);
        }}
      >
        <div
          className="header-inboxModal"
          style={{ backgroundColor: "#f36c60" }}
        >
          <span>{"แก้ไขข้อมูล อาจารย์"}</span>
        </div>
        <div className="body-content-inboxModal">
          <form
            className="form-contentInboxModal"
            onSubmit={(e) => {
              e.preventDefault();
              if (holdIdData) {
                let object = {
                  id: holdIdData,
                  adv_id: usernamedoc,
                  ttl: ttlDoc,
                  name: namedoc,
                  lname: lnamedoc,
                  sex: genderDoc,
                  pin: PINdoc,
                  start: startdoc,
                  stop: stopdoc,
                };
                handlesubmitEditdoc(object, usertoken);
              }
            }}
          >
            {/* Editusername */}
            <div className="box-input-contentInboxModal">
              <span>{"Username :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="text"
                  onChange={(e) => {
                    setUsernamedoc(e.target.value);
                  }}
                  onFocus={(e) => e.target.select()}
                  value={usernamedoc}
                ></input>
              </div>
            </div>
            {/* Editคำนำหน้าชื่อ */}
            <div className="box-input-contentInboxModal">
              <span>{"คำนำหน้า :"}</span>
              <div className="contentboxInput-InboxModal">
                <div className="relativeBox-drop">
                  <input
                    type="text"
                    value={ttlDoc}
                    onChange={(e) => {
                      setTtlDoc(e.target.value);
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                  ></input>
                  <button
                    className="btndropdown-ttl-contentInboxModal"
                    type="button"
                    onClick={() => {
                      handleShowDropdown("edit");
                    }}
                  >
                    <i className="bi-caret-down"></i>
                  </button>
                  <div
                    className="dropDown-ttl-contentInboxModal"
                    id="boxEditDropdownTTL"
                  >
                    {arrTtl.map((ele, index) => (
                      <div
                        className="infoTtl-dropdown-contentInboxModal"
                        key={index}
                        onClick={(e) => {
                          e.preventDefault();
                          setTtlDoc(ele.ttl);
                        }}
                      >
                        <span>{ele.ttl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Editชื่อ */}
            <div className="box-input-contentInboxModal">
              <span>{"ชื่อ :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="text"
                  onChange={(e) => {
                    setNamedoc(e.target.value);
                  }}
                  onFocus={(e) => e.target.select()}
                  defaultValue={data.name ? data.name.trim() : ""}
                  value={namedoc}
                ></input>
              </div>
            </div>
            {/* Editนามสกุล */}
            <div className="box-input-contentInboxModal">
              <span>{"นามสกุล :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="text"
                  onChange={(e) => {
                    setLnamedoc(e.target.value);
                  }}
                  onFocus={(e) => e.target.select()}
                  defaultValue={data.lname ? data.lname.trim() : ""}
                  value={lnamedoc}
                ></input>
              </div>
            </div>
            {/* Editเพศ */}
            <div className="box-input-contentInboxModal">
              <span>{"เพศ :"}</span>
              <div className="contentboxInput-InboxModal">
                <div className="radio-btn-InboxModal">
                  <input
                    type="radio"
                    value={"male"}
                    name={"gender"}
                    checked={genderDoc === "male"}
                    onChange={(e) => {
                      setGenderDoc(e.target.value);
                    }}
                  ></input>
                  <span>{"ชาย"}</span>
                  <input
                    type="radio"
                    value={"female"}
                    name={"gender"}
                    checked={genderDoc === "female"}
                    onChange={(e) => {
                      setGenderDoc(e.target.value);
                    }}
                  ></input>
                  <span>{"หญิง"}</span>
                </div>
              </div>
            </div>
            {/* EditPIN */}
            <div className="box-input-contentInboxModal">
              <span>{"PIN :"}</span>
              <div className="contentboxInput-InboxModal">
                <div className="relativeBox-PIN" id="boxPIN">
                  <input
                    type={"text"}
                    value={PINdoc}
                    maxLength={6}
                    onChange={(e) => {
                      e.preventDefault();
                      setPINdoc(e.target.value);
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                  ></input>
                  <button
                    type="button"
                    onClick={() => {
                      generatePINforDoc();
                    }}
                  >
                    <i className="bi-repeat"></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Editเริ่ม */}
            <div className="box-input-contentInboxModal">
              <span>{"เริ่ม :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="date"
                  onChange={(e) => {
                    setStartdoc(e.target.value);
                  }}
                  defaultValue={data.start ? data.start.trim() : "0000-00-00"}
                  value={startdoc}
                ></input>
              </div>
            </div>
            {/* Editหยุด */}
            <div className="box-input-contentInboxModal">
              <span>{"หยุด :"}</span>
              <div className="contentboxInput-InboxModal">
                <input
                  type="date"
                  onChange={(e) => {
                    setStopdoc(e.target.value);
                  }}
                  defaultValue={data.start ? data.stop.trim() : "0000-00-00"}
                  value={stopdoc}
                ></input>
              </div>
            </div>
            <div className="box-input-contentInboxModal">
              <div className="btnSubmit-boxContentInboxModal">
                <button type="submit">{"บันทึก"}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const dataDoctorTeacherFull = async () => {
    let fetchdata = await FetchController.fetchGetDoctorteacherFull(
      usertoken
    ).then((data) => {
      return data;
    });
    console.log("datahere->", fetchdata);
    setDataTeacher(fetchdata);
  };

  const handleSearchingDatadoctor = (search, data) => {
    let thissearchdata = searchDoctorcontent(search, data);
    if (thissearchdata[0]) {
      setDataTeacher(thissearchdata);
    } else {
      dataDoctorTeacherFull();
    }
  };

  const handlesubmitAdddoc = async (object, usertoken) => {
    let status = await FetchController.fetchAddDoctorteacher(
      object,
      usertoken
    ).then((message) => {
      console.log(message);
      return message.status;
    });
    if (status) {
      await dataDoctorTeacherFull();
      getDocId("thisbtnModalboxClose-boxModal").click();
      clearInputdocmodal();
    }
  };

  const handlesubmitEditdoc = async (object, usertoken) => {
    let status = await FetchController.fetchEditDoctorteacher(
      object,
      usertoken
    ).then((message) => {
      console.log(message);
      return message.status;
    });
    if (status) {
      await dataDoctorTeacherFull();
      getDocId("thisbtnModalboxClose-editDocModal").click();
      clearInputdocmodal();
    }
  };

  const handleDeleteDoc = (object, usertoken) => {
    console.log("delinfo>>>", object);
    //ยังไม่ได้ fetch
    dataDoctorTeacherFull();
    clearInputdocmodal();
    setHoldidData("");
  };

  const handleHoldlineTable = (id) => {
    console.log("INDEX->", id);
    let leghtTR = document.getElementsByClassName("tableTR").length;
    for (let t = 0; t < leghtTR; t++) {
      document.getElementsByClassName("tableTR")[t].style.border =
        "2px solid black";
    }
    getDocId(`tr-${id}`).style.border = "5px solid #01579b";
  };

  const handleEditvalueset = (ele) => {
    console.log(ele);
    setUsernamedoc(ele.adv_id ? ele.adv_id.trim() : "");
    setTtlDoc(ele.ttl ? ele.ttl.trim() : "");
    setNamedoc(ele.name ? ele.name.trim() : "");
    setLnamedoc(ele.lname ? ele.lname.trim() : "");
    setGenderDoc(ele.sex ? (parseInt(ele.sex) === 1 ? "male" : "female") : "");
    setPINdoc(ele.pin ? ele.pin : "");
    setStartdoc(ele.start ? ele.start.trim() : "");
    setStopdoc(ele.stop ? ele.stop.trim() : "");
  };

  useEffect(() => {
    dataDoctorTeacherFull();
  }, []);

  useEffect(() => {
    if (statusCloseModal) {
      console.log("ปิดโมเดล?");
      setPINdoc("");
      setTtlDoc("");
      setGenderDoc("male");
    } else {
      console.log("เปิดมะ");
    }
  }, [statusCloseModal]);

  return (
    <div className="body-content-ctDoctor">
      <div className="nav-content-ctDoctor">
        <div className="box-nav-content">
          <span>{"ข้อมูล อาจารย์"}</span>
        </div>
        <div className="nav-box-search">
          <span>{"ค้นหา"}</span>
          <input
            type="text"
            className="input-navDoctor-search"
            onChange={(e) => {
              setSearchtext(e.target.value);
            }}
            onFocus={(e) => e.target.select()}
          ></input>
          <button
            type="button"
            className="btn-navDoctor-search"
            onClick={() => {
              if (dataTeacher[0]) {
                handleSearchingDatadoctor(searchtext, dataTeacher);
              }
            }}
          >
            <i className="bi-search"></i>
          </button>
        </div>
        <div className="box-nav-content">
          <button type="button" className="btn-close-ctDoctor">
            {"ปิด"}
          </button>
        </div>
      </div>
      <div className="content-ctDoctor">
        <div className="content-table">
          {dataTeacher[0] ? (
            <table className="table-show-info">
              <thead>
                <tr>
                  <th>เลขที่ใบประกอบ</th>
                  <th>คำนำหน้า</th>
                  <th>ชื่อ</th>
                  <th>นามสกุล</th>
                  <th>PIN</th>
                  <th>เริ่ม</th>
                  <th>สิ้นสุด</th>
                  <th>Email</th>
                  <th>Line</th>
                  <th>แก้ไข</th>
                </tr>
              </thead>
              <tbody>
                {dataTeacher.map((data, index) => {
                  return (
                    <tr
                      className="tableTR"
                      id={`tr-${index}`}
                      key={index}
                      onClick={() => {
                        // console.log("holding add id =>", data.Id);
                        setHoldidData(data.Id);
                        handleHoldlineTable(index);
                      }}
                    >
                      <td width={100}>{data.adv_id}</td>
                      <td width={80}>{data.ttl}</td>
                      <td width={150}>{data.name}</td>
                      <td width={150}>{data.lname}</td>
                      <td width={80}>{`******`}</td>
                      <td width={150}>{data.start}</td>
                      <td width={150}>{data.stop}</td>
                      <td width={200}>{data.email}</td>
                      <td width={200}>{data.line_id}</td>
                      <td width={50}>
                        <button
                          type="button"
                          onClick={() => {
                            setHoldidData(data.Id);
                            handleEditvalueset(data);
                            setDataSelectEdit(data);
                            handleOpenModalbox("editDocModal");
                            setStatusCloseModal(false);
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
        <div className="content-menu">
          <div className="box-menu-contentDoctor">
            <button
              type="button"
              className="content-menu-btn"
              onClick={() => {
                handleOpenModalbox("boxModal");
                setStatusCloseModal(false);
              }}
            >
              {"เพิ่ม"}
            </button>
            <button
              type="button"
              className="content-menu-btn"
              onClick={() => {
                console.log("ทำงานลบไอดี =>", holdIdData);
                if (holdIdData) {
                  let object = {
                    id: holdIdData,
                    stop: moment(new Date()).format("YYYY-MM-DD"),
                  };
                  handleDeleteDoc(object, usertoken);
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "กรุณาเลือกชุดข้อมูลอีกครั้ง",
                    showConfirmButton: false,
                    showCancelButton: false,
                    timer: 1250,
                  });
                }
              }}
            >
              {"ลบ"}
            </button>
          </div>
        </div>
      </div>
      <ModalBox
        idbox={"boxModal"}
        content={contentInmodal()}
        statusClose={setStatusCloseModal}
      ></ModalBox>
      <ModalBox
        idbox={"editDocModal"}
        content={contentEditboxdoc(dataSelectEdit)}
        statusClose={setStatusCloseModal}
      ></ModalBox>
    </div>
  );
};

export default ContentDoctor;
