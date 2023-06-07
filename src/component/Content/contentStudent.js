import { useEffect, useRef, useState } from "react";
import FetchController, { handleFatch } from "../data/fetchConroller";
import { searching } from "../config/searchConfig";
import ModalBox from "../modal/modalBox";
import { handleOpenModalbox } from "../config/modalConfig";
import Cookies from "universal-cookie";
import { result } from "lodash";
import { HttpConfig } from "../data/httpConfig";

const ContentStudent = (props) => {
  const testFileFolder = "../../../public/picture/student";
  const [year, setYear] = useState(parseInt(new Date().getFullYear()) + 543);

  const [searchtext, setSearchtext] = useState();
  const [dataStudent, setDataStudent] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);

  const [idStudent, setIdStudent] = useState();
  const [numberStudent, setNumberStudent] = useState();

  const [mcq, setMcq] = useState();
  const [osce, setOsce] = useState();
  const [meq, setMeq] = useState();
  const [book, setBook] = useState();

  const [picURL, setPicURL] = useState("");
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

  const [titleModalStudent, setTitleModalStudent] =
    useState("เพิ่มข้อมูล นศพ.");

  const [statusConStudentbox, setStatusConStudentbox] = useState("add");
  // const [dataConStudentbox, setDataConStudentbox] = useState([]);

  const [isHoldaLine, setIsHoldaLine] = useState(false);
  const [statusAdd, setStatusAdd] = useState(false);
  const [statusEdit, setStatusEdit] = useState(false);
  const [statusDel, setStatusDel] = useState(false);
  const [statusReadonly, setStatusReadonly] = useState(false);
  const [statusCloseModal, setStatusCloseModal] = useState(false);

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

  //ดึงข้อมูลอาจารย์หมอ
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

  //ดึงข้อมูลกลุ่มนศพ
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

  function datatestbase64convest(dataurl, filename) {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    result = new File([u8arr], filename, { type: mime });
    return result;
  }

  const todataUrl = (data) =>
    fetch(data)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const render = new FileReader();
            render.onloadend = () => resolve(render.result);
            render.onerror = reject;
            render.readAsDataURL(blob);
          })
      );

  const handleUploadPicture = async (data, idStudent) => {
    let fileSelect = inputPic.current.files[0];
    let pass = false;

    if (idStudent) {
      if (idStudent.length < 9) {
        document.getElementsByClassName(
          "Modalinput-idStudent"
        )[0].style.border = "1px solid red";
        return;
      }
      document.getElementsByClassName("Modalinput-idStudent")[0].style.border =
        "1px solid #ddd";
      data.map((ele) => {
        if (ele.std_id.trim().match(idStudent)) {
          pass = true;
        }
      });
      if (pass) {
        // console.log("ผ่านครับอัพรูปได้เลย");
        try {
          if (!fileSelect) return;

          // console.log("file==>", fileSelect);
          let newfile = new File([fileSelect], `${idStudent}.jpg`, {
            type: fileSelect.type,
          });

          let datafrom = new FormData();
          datafrom.append("file", newfile);
          datafrom.append("std_id", `${idStudent}`);
          FetchController.fetchImgae(datafrom, usertoken);
        } catch (error) {
          console.log(error.response?.data);
        }
      } else {
        document.getElementsByClassName(
          "Modalinput-idStudent"
        )[0].style.border = "1px solid red";
        console.log("มันไม่มี รหัสนักศึกษาคนนี้");
      }
    } else {
      if (
        !yearModal ||
        !mdinputTtl ||
        !mdinputName ||
        !mdinputLname ||
        !mdinputType ||
        !mdinputidStudent ||
        !mdinputDoctor.id ||
        !mdinputGroup.id ||
        !mdinputStartdate ||
        !mdinputStopdate
      ) {
        console.log("ว่างหมด");
      }
    }
  };

  const handleSubmitSaveInfoStudent = async () => {
    if (
      !yearModal ||
      !mdinputTtl ||
      !mdinputName ||
      !mdinputLname ||
      !mdinputType ||
      !mdinputidStudent ||
      !mdinputDoctor.id ||
      !mdinputGroup.id ||
      !mdinputStartdate ||
      !mdinputStopdate
    ) {
      let getClassBorderRED = (id) => {
        return (document.getElementsByClassName(id)[0].style.border =
          "1px solid red");
      };

      getClassBorderRED("Modalinput-year");
      getClassBorderRED("Modalinput-ttl");
      getClassBorderRED("Modalinput-name");
      getClassBorderRED("Modalinput-lname");
      getClassBorderRED("Modalinput-type");
      getClassBorderRED("Modalinput-idStudent");
      getClassBorderRED("Modalinput-perfessor");
      getClassBorderRED("Modalinput-group");
      getClassBorderRED("Modalinput-start");
      getClassBorderRED("Modalinput-stop");

      return;
    } else {
      let getClassBorderNormal = (id) => {
        return (document.getElementsByClassName(id)[0].style.border =
          "1px solid #ddd");
      };

      getClassBorderNormal("Modalinput-year");
      getClassBorderNormal("Modalinput-ttl");
      getClassBorderNormal("Modalinput-name");
      getClassBorderNormal("Modalinput-lname");
      getClassBorderNormal("Modalinput-type");
      getClassBorderNormal("Modalinput-idStudent");
      getClassBorderNormal("Modalinput-perfessor");
      getClassBorderNormal("Modalinput-group");
      getClassBorderNormal("Modalinput-start");
      getClassBorderNormal("Modalinput-stop");

      const object = {
        year: yearModal - 543,
        ttl: mdinputTtl,
        name: mdinputName,
        lname: mdinputLname,
        type: mdinputType,
        std_id: mdinputidStudent,
        advisor_id: mdinputDoctor.id,
        grp_id: mdinputGroup.id,
        start: mdinputStartdate,
        stop: mdinputStopdate,
      };

      // console.log("save ===> ", object);
      await FetchController.fetchAddStudent(object, usertoken);
      setStatusAdd(true);
    }
  };

  const handleSubmitEditInfoStudent = async () => {
    if (
      !yearModal ||
      !mdinputTtl ||
      !mdinputName ||
      !mdinputLname ||
      !mdinputType ||
      !mdinputidStudent ||
      !mdinputDoctor.id ||
      !mdinputGroup.id ||
      !mdinputStartdate ||
      !mdinputStopdate
    )
      return;
    const object = {
      id: idStudent,
      year: yearModal - 543,
      ttl: mdinputTtl,
      name: mdinputName,
      lname: mdinputLname,
      type: mdinputType,
      std_id: mdinputidStudent,
      advisor_id: mdinputDoctor.id,
      grp_id: mdinputGroup.id,
      start: mdinputStartdate,
      stop: mdinputStopdate,
    };

    // console.log("ข้อมูลแก้ไข=>", object);
    FetchController.fetchEditstudent(object, usertoken);
    setStatusEdit(true);
    getID(`boxModal`).style.display = "none";
  };

  const handleSelectLinetable = (row) => {
    // getID(`table-tr-${row}`).classList.add("tableHightlight");
  };

  const showURLimageStudent = (StudentId, token) => {
    FetchController.fetchGetImage({ std_id: StudentId.trim() }, token).then(
      (data) => {
        if (data) {
          setPicURL(`http://${data.url}`);
        }
      }
    );
  };

  const modalContent = (status) => {
    //ข้อมูลที่จะแสงใน boxModal
    if (status === "add") {
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
                  readOnly={statusReadonly}
                  disabled={statusReadonly}
                ></input>
                <button
                  className="btn-up-input"
                  type="button"
                  style={{ visibility: statusReadonly ? "hidden" : "visible" }}
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
                  style={{ visibility: statusReadonly ? "hidden" : "visible" }}
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
                  readOnly={statusReadonly}
                  disabled={statusReadonly}
                ></input>
                <button
                  className="btn-dropdown-input"
                  type="button"
                  style={{ visibility: statusReadonly ? "hidden" : "visible" }}
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
                value={mdinputName}
                readOnly={statusReadonly}
                disabled={statusReadonly}
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
                value={mdinputLname}
                readOnly={statusReadonly}
                disabled={statusReadonly}
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
                  readOnly={statusReadonly}
                  disabled={statusReadonly}
                  onChange={(e) => {
                    if (e.target.value !== "") {
                      setMdinputType(e.target.value);
                    }
                  }}
                ></input>
                <button
                  className="btn-dropdown-input"
                  style={{ visibility: statusReadonly ? "hidden" : "visible" }}
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
                value={mdinputidStudent}
                readOnly={statusReadonly}
                disabled={statusReadonly}
                onChange={(e) => {
                  setMdinputidStudent(e.target.value);
                }}
                onFocus={(e) => {
                  e.target.select();
                }}
                maxLength={9}
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
                  disabled={statusReadonly}
                ></input>
                <button
                  type="button"
                  className="btn-dropdown-input"
                  style={{ visibility: statusReadonly ? "hidden" : "visible" }}
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
                  disabled={statusReadonly}
                ></input>
                <button
                  type="button"
                  style={{ visibility: statusReadonly ? "hidden" : "visible" }}
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
                placeholder="dd-mm-yyyy"
                pattern="\d{4}-\d{2}-\d{2}"
                value={
                  mdinputStartdate !== "0000-00-00"
                    ? mdinputStartdate
                    : "dd-mm-yyyy"
                }
                onChange={(e) => {
                  e.preventDefault();
                  setMdinputStartdate(e.target.value);
                }}
                readOnly={statusReadonly}
                disabled={statusReadonly}
              ></input>
            </div>
            {/* ลงสาย */}
            <div className="input-modalBox">
              <span>{"ลงสาย"}</span>
              <input
                className="Modalinput-stop"
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                placeholder="dd-mm-yyyy"
                value={
                  mdinputStopdate !== "0000-00-00"
                    ? mdinputStopdate
                    : "dd-mm-yyyy"
                }
                onChange={(e) => {
                  e.preventDefault();
                  setMdinputStopdate(e.target.value);
                }}
                readOnly={statusReadonly}
                disabled={statusReadonly}
              ></input>
            </div>
            <div className="btn-modal-submit">
              <button
                type="submit"
                onClick={async (e) => {
                  e.preventDefault();
                  handleSubmitSaveInfoStudent();
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
                id="imageBTNadd"
                ref={inputPic}
                accept="image/png,image/jpeg,image/jpg"
                onChange={(e) => {
                  imgPreview(e);
                }}
              ></input>
              <button
                type="button"
                className="btn-add-filePicture"
                onClick={(e) => {
                  e.preventDefault();
                  handleUploadPicture(dataStudent, mdinputidStudent);
                }}
              >
                UPLOAD
              </button>
            </div>
          </div>
        </div>
      );
    } else if (status === "edit") {
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
                value={mdinputName}
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
                value={mdinputLname}
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
                value={mdinputidStudent}
                onChange={(e) => {
                  setMdinputidStudent(e.target.value);
                }}
                onFocus={(e) => {
                  e.target.select();
                }}
                maxLength={9}
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
                placeholder="dd-mm-yyyy"
                pattern="\d{4}-\d{2}-\d{2}"
                value={
                  mdinputStartdate !== "0000-00-00"
                    ? mdinputStartdate
                    : "dd-mm-yyyy"
                }
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
                placeholder="dd-mm-yyyy"
                pattern="\d{4}-\d{2}-\d{2}"
                value={
                  mdinputStopdate !== "0000-00-00"
                    ? mdinputStopdate
                    : "dd-mm-yyyy"
                }
                onChange={(e) => {
                  e.preventDefault();
                  setMdinputStopdate(e.target.value);
                }}
              ></input>
            </div>
            <div className="btn-modal-submit">
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmitEditInfoStudent();
                }}
              >
                {"แก้ไข"}
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
                id="imageBTNedit"
                accept="image/png,image/jpeg,image/jpg"
                ref={inputPic}
                onChange={(e) => {
                  imgPreview(e);
                }}
              ></input>
              <button
                type="button"
                className="btn-add-filePicture"
                onClick={(e) => {
                  e.preventDefault();
                  handleUploadPicture(dataStudent, mdinputidStudent);
                }}
              >
                UPLOAD
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const handleEditDataStudent = (data) => {
    console.log("data=>", data);

    setMdinputTtl(data.ttl.trim());
    setMdinputName(data.name.trim());
    setMdinputLname(data.lname.trim());
    setMdinputType(data.type.trim());
    setMdinputidStudent(data.std_id.trim());
    setMdinputDoctor({
      id: data.advisor_id ? data.advisor_id.trim() : "",
      name: data.advisor_name ? data.advisor_name.trim() : "",
    });
    setMdinputGroup({ id: data.grp_id.trim(), name: data.grp_name.trim() });
    setMdinputStartdate(data.start.trim());
    setMdinputStopdate(data.stop.trim());
  };

  const clearMdinput = () => {
    setMdinputTtl("");
    setMdinputName("");
    setMdinputLname("");
    setMdinputType("");
    setMdinputidStudent("");
    setMdinputDoctor({ id: "", name: "" });
    setMdinputGroup({ id: "", name: "" });
    setMdinputStartdate("0000-00-00");
    setMdinputStopdate("0000-00-00");
  };

  const handleSaveing = () => {
    document.getElementsByClassName("btn-modal-submit")[0].style.visibility =
      "hidden";
    setStatusReadonly(true);
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

  useEffect(() => {
    if (statusAdd) {
      setTimeout(() => {
        handleSaveing();
        handleFatch();
        setStatusAdd(false);
      }, 500);
    }
  }, [statusAdd]);

  useEffect(() => {
    if (statusEdit) {
      setTimeout(() => {
        handleFatch();
        setStatusEdit(false);
      }, 500);
    }
  }, [statusEdit]);

  useEffect(() => {
    if (statusDel) {
      setTimeout(() => {
        handleFatch();
        setStatusDel(false);
      }, 500);
    }
  }, [statusDel]);

  useEffect(() => {
    if (statusCloseModal) {
      setStatusReadonly(false);
      clearMdinput();
      document.getElementsByClassName("btn-modal-submit")[0].style.visibility =
        "visible";
      setPicURL("");
      let getClassBorderNormal = (id) => {
        return (document.getElementsByClassName(id)[0].style.border =
          "1px solid #ddd");
      };

      getClassBorderNormal("Modalinput-year");
      getClassBorderNormal("Modalinput-ttl");
      getClassBorderNormal("Modalinput-name");
      getClassBorderNormal("Modalinput-lname");
      getClassBorderNormal("Modalinput-type");
      getClassBorderNormal("Modalinput-idStudent");
      getClassBorderNormal("Modalinput-perfessor");
      getClassBorderNormal("Modalinput-group");
      getClassBorderNormal("Modalinput-start");
      getClassBorderNormal("Modalinput-stop");
      inputPic.current.value = "";
    }
  }, [statusCloseModal]);

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
        <table className="table-show-info">
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
                  className="table-tr-studentinfo"
                  id={`table-tr-${index}`}
                  key={index}
                  onClick={() => {
                    console.log("handle list !=>", data);
                    setIdStudent(data.Id);
                    setNumberStudent(data.std_id);
                    showURLimageStudent(data.std_id, usertoken);
                    setMcq(data.mcq);
                    setOsce({ OSCE1: data.osce1, OSCE2: data.osce2 });
                    setMeq({ MEQ1: data.meq1, MEQ2: data.meq2 });
                    setBook(data.book);
                    setIsHoldaLine(true);
                    handleSelectLinetable(index);
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
                        setTitleModalStudent("แก้ไขข้อมูล นศพ.");
                        handleOpenModalbox("boxModal");
                        setStatusCloseModal(false);
                        handleEditDataStudent(data);
                        setStatusConStudentbox("edit");
                      }}
                    >
                      <i className="bi-three-dots"></i>
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
                  <button
                    className="btn-edit-tableInfoStudent"
                    onClick={(e) => {
                      e.preventDefault();
                      let object = [
                        {
                          ttl: "นาย",
                          name: "อ้ายคำ",
                          lname: "ใจหล้า",
                          type: "นศพ.",
                          std_id: "665332211",
                          advisor_id: "2",
                          grp_id: "1",
                          start: "0000-00-00",
                          stop: "0000-00-00",
                        },
                      ];
                      setTitleModalStudent("แก้ไขข้อมูล นศพ.");
                      handleOpenModalbox("boxModal");
                      setStatusCloseModal(false);
                      handleEditDataStudent(object);
                      setStatusConStudentbox("edit");
                    }}
                  >
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
              setStatusCloseModal(false);
              setStatusConStudentbox("add");
              clearMdinput();
            }}
          >
            {"เพิ่ม"}
          </button>
        </div>
        <div className="btn-del-contentStudent">
          <button
            className="btnDelStudent"
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              if (idStudent.toString() !== "28") return;
              let object = { id: idStudent };
              await FetchController.fetchDelete(object, usertoken);
              setStatusDel(true);
            }}
          >
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
            <button
              type="button"
              className="btn-save-footer"
              onClick={(e) => {
                e.preventDefault();
                if (idStudent) {
                  let object = {
                    id: idStudent,
                    mcq: mcq,
                    osce1: osce.OSCE1,
                    osce2: osce.OSCE2,
                    meq1: meq.MEQ1,
                    meq2: meq.MEQ2,
                    book: book,
                  };

                  FetchController.fetchScoreStudent(object, usertoken);
                } else {
                  console.log("ไม่ได้เลือกเลย");
                }
              }}
            >
              {"บันทึก"}
            </button>
          </div>
        </div>
      </div>
      <ModalBox
        content={modalContent(statusConStudentbox)}
        thisTitle={titleModalStudent ? titleModalStudent : ""}
        statusClose={setStatusCloseModal}
      ></ModalBox>
    </div>
  );
};
export default ContentStudent;
