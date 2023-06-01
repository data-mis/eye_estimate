import { useEffect, useRef, useState } from "react";
import FetchController, { handleFatch } from "../data/fetchConroller";
import { searching } from "../config/searchConfig";
import ModalBox from "../modal/modalBox";
import { handleOpenModalbox } from "../config/modalConfig";
import Cookies from "universal-cookie";
const ContentStudent = (props) => {
  const testFileFolder = "../../../public/picture/student";
  const [year, setYear] = useState(parseInt(new Date().getFullYear()) + 543);

  const [searchtext, setSearchtext] = useState();
  const [dataStudent, setDataStudent] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [mcq, setMcq] = useState();
  const [osce, setOsce] = useState();
  const [meq, setMeq] = useState();
  const [book, setBook] = useState();

  const [picURL, setPicURL] = useState();
  const inputPic = useRef(null);
  const [btnTtl, setBtnTtl] = useState(false);

  const [yearModal, setYearModal] = useState(
    parseInt(new Date().getFullYear()) + 543
  );
  const [mdinputTtl, setMdinputTtl] = useState("");
  const [mdinputName, setMdinputName] = useState("");
  const [mdinputLname, setMdinputLname] = useState("");
  const [mdinputType, setMdinputType] = useState("");
  const [mdinputidStudent, setMdinputidStudent] = useState("");
  const [mdinputDoctor, setMdinputDoctor] = useState("");
  const [mdinputGroup, setMdinputGroup] = useState("");
  const [mdinputStartdate, setMdinputStartdate] = useState("0000-00-00");
  const [mdinputStopdate, setMdinputStopdate] = useState("0000-00-00");

  const cookie = new Cookies();
  const usertoken = cookie.get("token");

  const getID = (id) => {
    return document.getElementById(id);
  };

  const handleYearselect = (status) => {
    //เช็คค่าเพิ่มค่าปี ค่าปีโชว์ข้อมูล นศพ.
    if (status) {
      let ayear = parseInt(year) + 1;
      setYear(ayear);
    } else {
      let ayear = parseInt(year) - 1;
      setYear(ayear);
    }
  };

  const handleFatch = async () => {
    setDataStudent(await FetchController.fetchStudent(year, usertoken));
  };

  const imgPreview = (e) => {
    //แสดงภาพที่เลือกใน input boxModal
    let file = e.target.files[0];

    let tryURI = URL.createObjectURL(file);
    setPicURL(tryURI);
  };

  const handleFatchTeacher = () => {
    if (!localStorage.getItem("teacherName")) {
      FetchController.fetchGetTeacher(usertoken).then((data) => {
        let nameTeacher = [];
        data.map((ele) => {
          nameTeacher.push({
            id: ele.Id.trim(),
            name: `${ele.ttl.trim()} ${ele.name.trim()} ${ele.lname.trim()}`,
          });
        });
        localStorage.setItem("teacherName", JSON.stringify(nameTeacher));
      });
    }
  };

  const handleFatchGroup = (year) => {
    let ayear = { year: parseInt(year) - 543 };
    console.log("ayear", ayear);
    if (!localStorage.getItem("groupName")) {
      FetchController.fetchGetGroup(ayear, usertoken).then((data) => {
        let nameGroup = [];
        data.map((ele) => {
          nameGroup.push({ id: ele.Id.trim(), name: ele.name.trim() });
        });
        localStorage.setItem("groupName", JSON.stringify(nameGroup));
      });
    }
  };

  const modalContent = () => {
    //ข้อมูลที่จะแสงใน boxModal
    return (
      <div
        className="body-content-modalStudent"
        onClick={() => {
          if (btnTtl) {
            getID("dropDowninputBoxTll").style.display = "none";
            getID("dropDowninputBoxType").style.display = "none";
            getID("divBoxTtlDrop").style.position = "static";
            getID("divBoxTypeDrop").style.position = "static";
            getID("divBoxDoctorDrop").style.position = "static";
            getID("dropDowninputBoxDoctor").style.display = "none";
            getID("divBoxGrupDrop").style.position = "static";
            getID("dropDowinputBoxGroup").style.display = "none";
            setBtnTtl(false);
          }
        }}
      >
        <form className="form-modalContent">
          {/* ปี */}
          <div className="input-modalBox">
            <span>{"ปี"}</span>
            <div className="inputButtonUpdown">
              <input
                className="Modalinput-year"
                type="number"
                value={yearModal}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setYearModal(e.target.value);
                  }
                }}
                onFocus={(e) => {
                  e.target.select();
                }}
              ></input>
              <button
                className="btn-up-input"
                type="button"
                onClick={() => {
                  let ayear = parseInt(yearModal);
                  setYearModal(ayear + 1);
                }}
              >
                <i className="bi-caret-up"></i>
              </button>
              <button
                className="btn-down-input"
                type="button"
                onClick={() => {
                  let ayear = parseInt(yearModal);
                  setYearModal(ayear - 1);
                }}
              >
                <i className="bi-caret-down"></i>
              </button>
            </div>
          </div>
          {/* คำนำหน้า */}
          <div className="input-modalBox">
            <span>{"คำนำหน้า"}</span>
            <div className="inputButtonDrop" id="divBoxTtlDrop">
              <input
                className="Modalinput-ttl"
                type="text"
                value={mdinputTtl}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setMdinputTtl(e.target.value);
                  }
                }}
              ></input>
              <button
                className="btn-dropdown-input"
                type="button"
                onClick={() => {
                  if (!btnTtl) {
                    getID("divBoxTtlDrop").style.position = "relative";
                    getID("dropDowninputBoxTll").style.display = "block";
                    setBtnTtl(true);
                  } else {
                    getID("divBoxTtlDrop").style.position = "static";
                    getID("dropDowninputBoxTll").style.display = "none";
                    setBtnTtl(false);
                  }
                }}
              >
                <i className="bi-caret-down"></i>
              </button>
              <div className="box-dropDown" id="dropDowninputBoxTll">
                <button
                  type="button"
                  onClick={() => {
                    setMdinputTtl("นาย");
                  }}
                >
                  {"นาย"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMdinputTtl("นางสาว");
                  }}
                >
                  {"นางสาว"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMdinputTtl("นพ.");
                  }}
                >
                  {"นพ."}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMdinputTtl("พญ.");
                  }}
                >
                  {"พญ."}
                </button>
              </div>
            </div>
          </div>
          {/* ชื่อ */}
          <div className="input-modalBox">
            <span>{"ชื่อ"}</span>
            <input
              className="Modalinput-name"
              type="text"
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={(e) => {
                setMdinputName(e.target.value);
              }}
            ></input>
          </div>
          {/* นามสกุล */}
          <div className="input-modalBox">
            <span>{"นามสกุล"}</span>
            <input
              className="Modalinput-lname"
              type="text"
              onFocus={(e) => {
                e.target.select();
              }}
              onChange={(e) => {
                setMdinputLname(e.target.value);
              }}
            ></input>
          </div>
          {/* ประเภท */}
          <div className="input-modalBox">
            <span>{"ประเภท"}</span>
            <div className="inputButtonDrop" id="divBoxTypeDrop">
              <input
                className="Modalinput-type"
                type="text"
                value={mdinputType}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setMdinputType(e.target.value);
                  }
                }}
              ></input>
              <button
                className="btn-dropdown-input"
                type="button"
                onClick={() => {
                  if (!btnTtl) {
                    getID("divBoxTypeDrop").style.position = "relative";
                    getID("dropDowninputBoxType").style.display = "block";
                    setBtnTtl(true);
                  } else {
                    getID("divBoxTypeDrop").style.position = "static";
                    getID("dropDowninputBoxType").style.display = "none";
                    setBtnTtl(false);
                  }
                }}
              >
                <i className="bi-caret-down"></i>
              </button>
              <div className="box-dropDown" id="dropDowninputBoxType">
                <button
                  type="button"
                  onClick={() => {
                    setMdinputType("นศพ.");
                  }}
                >
                  {"นศพ."}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMdinputType("Resident");
                  }}
                >
                  {"Resident"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMdinputType("Fellow");
                  }}
                >
                  {"Fellow"}
                </button>
              </div>{" "}
            </div>
          </div>
          {/* รหัสนักศึกษา */}
          <div className="input-modalBox">
            <span>{"รหัสนักศึกษา"}</span>
            <input
              className="Modalinput-idStudent"
              type="text"
              onChange={(e) => {
                setMdinputidStudent(e.target.value);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
          </div>
          {/* อ.ที่ปรึกษา */}
          <div className="input-modalBox" id={"divBoxDoctorDrop"}>
            <span>{"อ.ที่ปรึกษา"}</span>
            <div className="inputButtonDropFull">
              <input
                className="Modalinput-perfessor"
                type="text"
                value={mdinputDoctor.name}
                readOnly
              ></input>
              <button
                type="button"
                className="btn-dropdown-input"
                onClick={() => {
                  if (!btnTtl) {
                    getID("divBoxDoctorDrop").style.position = "relative";
                    getID("dropDowninputBoxDoctor").style.display = "block";
                    setBtnTtl(true);
                  } else {
                    getID("divBoxDoctorDrop").style.position = "static";
                    getID("dropDowninputBoxDoctor").style.display = "none";
                    setBtnTtl(false);
                  }
                }}
              >
                <i className="bi-caret-down"></i>
              </button>
              <div className="box-dropDown-full" id="dropDowninputBoxDoctor">
                {localStorage.getItem("teacherName")
                  ? JSON.parse(localStorage.getItem("teacherName")).map(
                      (data, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            setMdinputDoctor(data);
                          }}
                        >
                          {data.name}
                        </button>
                      )
                    )
                  : ""}
              </div>
            </div>
          </div>
          {/* กลุ่ม */}
          <div className="input-modalBox">
            <span>{"กลุ่ม"}</span>
            <div className="inputButtonDropFull" id="divBoxGrupDrop">
              <input
                className="Modalinput-group"
                type="text"
                value={mdinputGroup.name}
                readOnly
              ></input>
              <button
                type="button"
                className="btn-dropdown-input"
                onClick={(e) => {
                  e.preventDefault();
                  if (!btnTtl) {
                    getID("divBoxGrupDrop").style.position = "relative";
                    getID("dropDowinputBoxGroup").style.display = "block";
                    setBtnTtl(true);
                  } else {
                    getID("divBoxGrupDrop").style.position = "static";
                    getID("dropDowinputBoxGroup").style.display = "none";
                    setBtnTtl(false);
                  }
                }}
              >
                <i className="bi-caret-down"></i>
              </button>
              <div className="box-dropDown-full" id="dropDowinputBoxGroup">
                {localStorage.getItem("groupName")
                  ? JSON.parse(localStorage.getItem("groupName")).map(
                      (data, index) => (
                        <button
                          type="button"
                          key={index}
                          onClick={(e) => {
                            e.preventDefault();
                            setMdinputGroup(data);
                          }}
                        >
                          {data.name}
                        </button>
                      )
                    )
                  : ""}
              </div>
            </div>
          </div>
          {/* ขึ้นสาย */}
          <div className="input-modalBox">
            <span>{"ขึ้นสาย"}</span>
            <input
              className="Modalinput-start"
              type="date"
              onChange={(e) => {
                e.preventDefault();
                setMdinputStartdate(e.target.value);
              }}
            ></input>
          </div>
          {/* ลงสาย */}
          <div className="input-modalBox">
            <span>{"ลงสาย"}</span>
            <input
              className="Modalinput-stop"
              type="date"
              onChange={(e) => {
                e.preventDefault();
                setMdinputStartdate(e.target.value);
              }}
            ></input>
          </div>
          <div className="btn-modal-submit">
            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                console.log("บันทึกข้อมูล นศพ. ใหม่", {
                  year: yearModal-543,
                  ttl: mdinputTtl,
                  name: mdinputName,
                  lname: mdinputLname,
                  type: mdinputType,
                  studentid: mdinputidStudent,
                  doctor: mdinputDoctor.id,
                  group: mdinputGroup.id,
                  start: mdinputStartdate,
                  stop: mdinputStopdate,
                });
              }}
            >
              {"บันทึก"}
            </button>
          </div>
        </form>
        <div className="form-picture">
          <div className="preview-picture">
            <img className="img-perview" src={picURL}></img>
          </div>
          <div className="input-picture">
            <input
              className="input-picture-file"
              type="file"
              ref={inputPic}
              multiple={true}
              onChange={(e) => {
                imgPreview(e);
              }}
            ></input>
            <button
              type="button"
              className="btn-add-filePicture"
              onClick={(e) => {
                e.preventDefault();
                console.log("==>", inputPic.current.files[0]);
              }}
            >
              UPLOAD
            </button>
          </div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    if (!year) return;
    handleFatch();
    handleFatchTeacher();
    handleFatchGroup(yearModal);
  }, [year]);

  useEffect(() => {
    setDataSearch(searching(searchtext, dataStudent));
  }, [dataStudent]);

  return (
    <div className="body-content-ctStudent">
      <div className="header-show-contentStudent">
        <div className="text-header">ข้อมูล นศพ.</div>
        <div className="menu-search">
          <div className="box-menu-1">
            <span>{"ปี"}</span>
            <input
              type="number"
              id="YearInput"
              value={year}
              onChange={(e) => {
                if (e.target.value === "") {
                  setYear(parseInt(new Date().getFullYear()) + 543);
                } else {
                  setYear(e.target.value);
                }
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
            <div className="relative-btnBox">
              <button
                className="up-btn"
                type="button"
                onClick={() => {
                  handleYearselect(true);
                }}
              >
                <i className="bi-caret-up"></i>
              </button>
              <button
                className="down-btn"
                type="button"
                onClick={() => {
                  handleYearselect(false);
                }}
              >
                <i className="bi-caret-down"></i>
              </button>
            </div>
          </div>
          <div className="box-menu-2">
            <span>{"ค้นหา"}</span>
            <input
              type="text"
              onChange={(e) => {
                setSearchtext(e.target.value);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
            <button
              type="button"
              onClick={() => {
                setDataSearch(searching(searchtext, dataStudent));
              }}
            >
              <i className="bi-search"></i>
            </button>
          </div>
        </div>
        <div className="menu-close">
          <button>{"ปิด"}</button>
        </div>
      </div>
      <div className="info-show-contentStudent">
        <table className="table-show-infoStudent">
          <thead>
            <tr>
              <th>คำนำหน้า</th>
              <th>ชื่อ</th>
              <th>นามสกุล</th>
              <th>ประเภท</th>
              <th>รหัส นศ.</th>
              <th>อาจารย์ที่ปรึกษา</th>
              <th>กลุ่ม</th>
              <th>เริ่มสาย</th>
              <th>ลงสาย</th>
              <th>แก้ไข</th>
            </tr>
          </thead>
          <tbody>
            {/* ข้อมูลนศพ. */}
            {dataSearch[0] ? (
              dataSearch.map((data, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    console.log("handle list !=>", data);
                    setMcq(data.mcq);
                    setOsce({ OSCE1: data.osce1, OSCE2: data.osce2 });
                    setMeq({ MEQ1: data.meq1, MEQ2: data.meq2 });
                    setBook(data.book);
                  }}
                >
                  <td>{data.ttl ? data.ttl.trim() : ""}</td>
                  <td>{data.name ? data.name.trim() : ""}</td>
                  <td>{data.lname ? data.lname.trim() : ""}</td>
                  <td>{data.type ? data.type.trim() : ""}</td>
                  <td>{data.std_id ? data.std_id.trim() : ""}</td>
                  <td>{data.advisor_name ? data.advisor_name.trim() : ""}</td>
                  <td>{data.grp_name ? data.grp_name.trim() : ""}</td>
                  <td>{data.start ? data.start.trim() : ""}</td>
                  <td>{data.stop ? data.stop.trim() : ""}</td>
                  <td>
                    <button className="btn-edit-tableInfoStudent">
                      <i
                        className="bi-three-dots"
                        onClick={() => {
                          console.log("Edit button");
                        }}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : dataStudent[0] ? (
              dataStudent.map((data, index) => (
                <tr
                  key={index}
                  onClick={() => {
                    console.log("handle list !=>", data);
                  }}
                >
                  <td>{data.ttl ? data.ttl.trim() : ""}</td>
                  <td>{data.name ? data.name.trim() : ""}</td>
                  <td>{data.lname ? data.lname.trim() : ""}</td>
                  <td>{data.type ? data.type.trim() : ""}</td>
                  <td>{data.std_id ? data.std_id.trim() : ""}</td>
                  <td>{data.advisor_name ? data.advisor_name.trim() : ""}</td>
                  <td>{data.grp_name ? data.grp_name.trim() : ""}</td>
                  <td>{data.start ? data.start.trim() : ""}</td>
                  <td>{data.stop ? data.stop.trim() : ""}</td>
                  <td>
                    <button
                      className="btn-edit-tableInfoStudent"
                      onClick={() => {
                        console.log("Edit button");
                      }}
                    >
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td>{"-"}</td>
                <td>{"-"}</td>
                <td>{"-"}</td>
                <td>{"-"}</td>
                <td>{"-"}</td>
                <td>{"-"}</td>
                <td>{"-"}</td>
                <td>{"-"}</td>
                <td>{"-"}</td>
                <td>
                  <button className="btn-edit-tableInfoStudent">
                    <i className="bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="menu-content-ctStudent">
        <div className="btn-add-contentStudent">
          <button
            className="btnAddStudent"
            type="button"
            onClick={() => {
              handleOpenModalbox("boxModal");
            }}
          >
            {"เพิ่ม"}
          </button>
        </div>
        <div className="btn-del-contentStudent">
          <button className="btnDelStudent" type="button">
            {"ลบ"}
          </button>
        </div>
      </div>
      <div className="footer-show-contentStudent">
        <div className="footer-col">
          <div className="box-incol">
            <span className="textheader">{"MCQ"}</span>
            <input
              type="number"
              className="input-incol"
              value={mcq ? mcq : ""}
              onChange={(e) => {
                if (e.target.value !== "") {
                  setMcq(e.target.value);
                }
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
            <span className="textbottom">{"(80)"}</span>
          </div>
        </div>
        <div className="footer-col">
          <div className="box-incol">
            <span className="textheader">{"OSCE 1 "}</span>
            <input
              type="number"
              className="input-incol"
              value={osce ? osce.OSCE1 : ""}
              onChange={(e) => {
                let osce2 = osce.OSCE2;
                if (e.target.value !== "") {
                  setOsce({ OSCE1: e.target.value, OSCE2: osce2 });
                }
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
            <span className="textbottom">{"(100)"}</span>
          </div>
          <div className="box-incol">
            <span className="textheader">{"OSCE 2"}</span>
            <input
              type="number"
              className="input-incol"
              value={osce ? osce.OSCE2 : ""}
              onChange={(e) => {
                let osce1 = osce.OSCE1;
                if (e.target.value !== "") {
                  setOsce({ OSCE1: osce1, OSCE2: e.target.value });
                }
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
            <span className="textbottom">{"(100)"}</span>
          </div>
        </div>
        <div className="footer-col">
          <div className="box-incol">
            <span className="textheader">{"MEQ 1 "}</span>
            <input
              type="number"
              className="input-incol"
              value={meq ? meq.MEQ1 : ""}
              onChange={(e) => {
                let meq2 = meq.MEQ2;
                if (e.target.value !== "") {
                  setMeq({ MEQ1: e.target.value, MEQ2: meq2 });
                }
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
            <span className="textbottom">{"(100)"}</span>
          </div>
          <div className="box-incol">
            <span className="textheader">{"MEQ 2"}</span>
            <input
              type="number"
              className="input-incol"
              value={meq ? meq.MEQ2 : ""}
              onChange={(e) => {
                let meq1 = meq.MEQ1;
                if (e.target.value !== "") {
                  setMeq({ MEQ1: meq1, MEQ2: e.target.value });
                }
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
            <span className="textbottom">{"(100)"}</span>
          </div>
        </div>
        <div className="footer-col">
          <div className="box-text-incol">
            <span className="textheader">{"สมุดบันทึกการปฎิบัติงาน"}</span>
            <input
              type="number"
              className="input-incol"
              value={book ? book : ""}
              onChange={(e) => {
                if (e.target.value !== "") {
                  setBook(e.target.value);
                }
              }}
              onFocus={(e) => {
                e.target.select();
              }}
            ></input>
            <span className="textbottom">{"(1)"}</span>
          </div>
        </div>
        <div className="footer-col">
          <div className="box-text-incol">
            <button type="button" className="btn-save-footer">
              {"บันทึก"}
            </button>
          </div>
        </div>
      </div>
      <ModalBox
        content={modalContent()}
        thisTitle={"เพิ่มข้อมูล นศพ."}
      ></ModalBox>
    </div>
  );
};
export default ContentStudent;
