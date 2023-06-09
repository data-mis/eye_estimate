import { useState } from "react";
import { handleOpenModalbox } from "../config/modalConfig";
import ModalBox from "../modal/modalBox";
import { useEffect } from "react";

const ContentDoctor = (props) => {
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

  const handleShowDropdown = () => {
    if (!statusDropttl) {
      getDocId("boxDropdownTTL").style.display = "block";
      setStatusDropttl(true);
    } else {
      getDocId("boxDropdownTTL").style.display = "none";
      setStatusDropttl(false);
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
                username: usernamedoc,
                ttl: ttlDoc,
                name: namedoc,
                lname: lnamedoc,
                gender: genderDoc,
                pin: PINdoc,
                start: startdoc,
                stop: stopdoc,
              };
              console.log(object);
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
                      handleShowDropdown();
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
                    setStartdoc(e.target.value);
                  }}
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
                    setStopdoc(e.target.value);
                  }}
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

  return (
    <div className="body-content-ctDoctor">
      <div className="nav-content-ctDoctor">
        <div className="box-nav-content">
          <span>{"ข้อมูล อาจารย์"}</span>
        </div>
        <div className="nav-box-search">
          <span>{"ค้นหา"}</span>
          <input type="text" className="input-navDoctor-search"></input>
          <button type="button" className="btn-navDoctor-search">
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
              <tr>
                <td width={100}>{"34143"}</td>
                <td width={80}>{"ผศ.พญ."}</td>
                <td width={150}>{"จุฬาลักษณ์"}</td>
                <td width={150}>{"ตั้งมั่นคงวรกูล"}</td>
                <td width={80}>{"******"}</td>
                <td width={150}>{"00-00-0000"}</td>
                <td width={150}>{"00-00-0000"}</td>
                <td width={200}>{"test_email_long@gmail.com"}</td>
                <td width={200}>{"Line@testingLine"}</td>
                <td width={50}>
                  <button>
                    <i className="bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="content-menu">
          <div className="box-menu-contentDoctor">
            <button
              type="button"
              className="content-menu-btn"
              onClick={() => {
                handleOpenModalbox("boxModal");
              }}
            >
              {"เพิ่ม"}
            </button>
            <button type="button" className="content-menu-btn">
              {"ลบ"}
            </button>
          </div>
        </div>
      </div>
      <ModalBox
        content={contentInmodal()}
        statusClose={setStatusCloseModal}
      ></ModalBox>
    </div>
  );
};

export default ContentDoctor;
