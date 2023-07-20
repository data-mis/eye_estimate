import { useEffect, useState } from "react";
import ModalBox from "../modal/modalBox";
import moment, { isDuration } from "moment";
import Cookies from "universal-cookie";
import Spinnerpage from "../config/spinnerpage";
import { handleOpenModalbox } from "../config/modalConfig";
import Swal from "sweetalert2";
import {
  HolderlineonTable,
  clearHolderlineTable,
} from "../config/holdlinetable";
import { searchGroupcontent } from "../config/searchConfig";
import FetchControlGroup from "../data/fetchControlGroup";

const ContentGroupStudent = (props) => {
  const cookie = new Cookies();
  const usertoken = cookie.get("token");

  const docGetId = (id) => {
    return document.getElementById(id);
  };

  const [yearSelectGroup, setYearSelectGroup] = useState(
    parseInt(moment(new Date()).format("YYYY"))
  );

  const [dataGroupall, setDataGroupall] = useState([]);
  const [selectDataGroup, setSelectDataGroup] = useState();
  const [selectStudentEmpty, setSelectStudentEmpty] = useState();
  const [selectStudentingroup, setSelectStudentingroup] = useState();

  const [editNameGroup, setEditNameGroup] = useState();
  const [editstartGroup, setEditstartGroup] = useState();
  const [editendGroup, setEditendGroup] = useState();

  const [dataGroupAdvisor, setDataGroupAdvisor] = useState([]);
  const [dataGroupStudentEmpty, setDataGroupStudentEmpty] = useState([]);
  const [dataGroupStudentingroup, setDataGroupStudentingroup] = useState([]);

  const [inputAddvisorId1, setInputAddvisorID1] = useState({});
  const [inputAddvisorId2, setInputAddvisorID2] = useState({});
  const [inputMEQ1, setInputMEQ1] = useState(0);
  const [inputMEQ2, setInputMEQ2] = useState(0);

  const [searchgroup, setSearchgroup] = useState();
  const [titleText, setTitleText] = useState("");
  const [closeModalbox, setCloseModalbox] = useState(false);
  const [statusOpenDrop, setStatusOpenDrop] = useState(false);
  const [statusFinishDocMEQ, setStatusFinishDocMEQ] = useState(false);

  const handleModleAddDoctor = (mode) => {
    if (mode) {
      docGetId(`boxModal`).style.display = "block";
    } else {
      docGetId(`boxModal`).style.display = "none";
    }
  };

  const handleDropDoctorMEQ = (mode) => {
    console.log(statusOpenDrop);
    switch (mode) {
      case 1:
        if (statusOpenDrop === false) {
          setStatusOpenDrop(true);
          docGetId("advisorDrop1").style.position = "relative";
          docGetId("advisorDrop2").style.position = "static";
          docGetId("dropBoxAdvisor1").style.display = "block";
          docGetId("dropBoxAdvisor2").style.display = "none";
        } else if (statusOpenDrop === true) {
          setStatusOpenDrop(false);
          docGetId("dropBoxAdvisor1").style.display = "none";
          docGetId("dropBoxAdvisor2").style.display = "none";
          docGetId("advisorDrop1").style.position = "static";
          docGetId("advisorDrop2").style.position = "static";
        }
        break;

      case 2:
        if (statusOpenDrop === false) {
          setStatusOpenDrop(true);
          docGetId("advisorDrop2").style.position = "relative";
          docGetId("advisorDrop1").style.position = "static";
          docGetId("dropBoxAdvisor2").style.display = "block";
          docGetId("dropBoxAdvisor1").style.display = "none";
        } else if (statusOpenDrop === true) {
          setStatusOpenDrop(false);
          docGetId("dropBoxAdvisor1").style.display = "none";
          docGetId("dropBoxAdvisor2").style.display = "none";
          docGetId("advisorDrop1").style.position = "static";
          docGetId("advisorDrop2").style.position = "static";
        }

        break;

      case 3:
        if (statusOpenDrop === false) {
          setStatusOpenDrop(true);
          docGetId("advisorDrop1Modal").style.position = "relative";
          docGetId("advisorDrop2Modal").style.position = "static";
          docGetId("dropBoxAdvisor1Modal").style.display = "block";
          docGetId("dropBoxAdvisor2Modal").style.display = "none";
        } else if (statusOpenDrop === true) {
          setStatusOpenDrop(false);
          docGetId("dropBoxAdvisor1Modal").style.display = "none";
          docGetId("dropBoxAdvisor2Modal").style.display = "none";
          docGetId("advisorDrop1Modal").style.position = "static";
          docGetId("advisorDrop2Modal").style.position = "static";
        }
        break;

      case 4:
        if (statusOpenDrop === false) {
          setStatusOpenDrop(true);
          docGetId("advisorDrop2Modal").style.position = "relative";
          docGetId("advisorDrop1Modal").style.position = "static";
          docGetId("dropBoxAdvisor2Modal").style.display = "block";
          docGetId("dropBoxAdvisor1Modal").style.display = "none";
        } else if (statusOpenDrop === true) {
          setStatusOpenDrop(false);
          docGetId("dropBoxAdvisor1Modal").style.display = "none";
          docGetId("dropBoxAdvisor2Modal").style.display = "none";
          docGetId("advisorDrop1Modal").style.position = "static";
          docGetId("advisorDrop2Modal").style.position = "static";
        }

        break;
    }
  };

  const handleSubmitModalDoctorMEQ = (e) => {
    e.preventDefault();
    let object = {
      advisor1: inputAddvisorId1,
      advisor2: inputAddvisorId2,
      meq1: inputMEQ1,
      meq2: inputMEQ2,
    };
    // setStatusFinishDocMEQ(true);
    console.log("object=>", object);
    handleModleAddDoctor(false);
  };

  const handlecalUpdownyear = (mode, year) => {
    let yearnow = parseInt(year);
    switch (mode) {
      case "up":
        let resup = yearnow + 1;
        setYearSelectGroup(resup);
        break;

      case "down":
        let resdown = yearnow - 1;
        setYearSelectGroup(resdown);
        break;
    }
  };

  const handleSubmiteditgroup = (idgroup) => {
    if (!idgroup) return;
    let objecteditgroup = {
      id: idgroup,
      name: editNameGroup,
      start: editstartGroup,
      stop: editendGroup,
    };
    console.log(objecteditgroup);
    Swal.fire({
      title: "แก้ไขรายชื่อกลุ่ม !!",
      text: "ต้องการแก้ไข รายชื่อกลุ่ม ใช่หรือไม่ ?",
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "ตกลง",
      cancelButtonText: "ยกเลิก",
    }).then((res) => {
      if (res.isConfirmed) {
        FetchControlGroup.fetchEditgroup(objecteditgroup, usertoken);
        document.getElementById("boxEditGroupModal").style.display = "none";
        setTimeout(() => {
          handleDataGropstudent(yearSelectGroup, usertoken);
        }, 200);
      }
    });
  };

  const ContentAddDoctorModal = () => {
    return (
      <div
        className="body-content-addDoctorMEQ"
        onClick={(e) => {
          // console.log("event Click on Body modle:", e.target);
        }}
      >
        <form
          className="formInfo-addDoctorMEQ"
          onSubmit={(e) => {
            // handleSubmitModalDoctorMEQ(e);
            e.preventDefault();
            handleAddadvisoringroup(
              selectDataGroup ? selectDataGroup.Id : "",
              inputAddvisorId1 ? inputAddvisorId1.id : "",
              inputAddvisorId2 ? inputAddvisorId2.id : "",
              inputMEQ1 ? inputMEQ1 : "",
              inputMEQ2 ? inputMEQ2 : "",
              usertoken
            );
          }}
        >
          <div className="boxRow-addDoctorMEQ">
            <span>{"อาจารย์"}</span>
            <div className="boxRow-adddoctorMEQ-drop" id={`advisorDrop1Modal`}>
              <input
                type="text"
                className="input-textadvisor-addDoctorMEQ"
                onFocus={(e) => e.target.select()}
                value={inputAddvisorId1.name ? inputAddvisorId1.name : ""}
                required
                readOnly
              ></input>
              <button
                type="button"
                onClick={() => {
                  handleDropDoctorMEQ(3);
                }}
              >
                <i className="bi-caret-down"></i>
              </button>
              <div
                className="dropDown-info-adddoctorMEQ"
                id={`dropBoxAdvisor1Modal`}
              >
                {dataGroupAdvisor[0] ? (
                  dataGroupAdvisor.map((data, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setInputAddvisorID1({ name: data.name, id: data.id });
                          handleDropDoctorMEQ(3);
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
            <span>{"MEQ"}</span>
            <input
              type="text"
              className="input-textMEQ-addDoctorMEQ"
              onChange={(e) => {
                setInputMEQ1(e.target.value);
              }}
              onFocus={(e) => e.target.select()}
              value={inputMEQ1}
              required
            ></input>
          </div>
          <div className="boxRow-addDoctorMEQ">
            <span>{"อาจารย์"}</span>
            <div className="boxRow-adddoctorMEQ-drop" id={`advisorDrop2Modal`}>
              <input
                type="text"
                className="input-textadvisor-addDoctorMEQ"
                value={inputAddvisorId2.name ? inputAddvisorId2.name : ""}
                onFocus={(e) => e.target.select()}
                required
                readOnly
              ></input>
              <button
                type="button"
                onClick={() => {
                  handleDropDoctorMEQ(4);
                }}
              >
                <i className="bi-caret-down"></i>
              </button>
              <div
                className="dropDown-info-adddoctorMEQ"
                id={`dropBoxAdvisor2Modal`}
              >
                {dataGroupAdvisor[0] ? (
                  dataGroupAdvisor.map((data, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setInputAddvisorID2({ name: data.name, id: data.id });
                          handleDropDoctorMEQ(4);
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
            <span>{"MEQ"}</span>
            <input
              type="text"
              className="input-textMEQ-addDoctorMEQ"
              onChange={(e) => {
                setInputMEQ2(e.target.value);
              }}
              onFocus={(e) => {
                e.target.select();
              }}
              value={inputMEQ2}
              required
            ></input>
          </div>
          <button
            className="btn-save-addDoctorMEQ"
            type="submit"
            onClick={() => {
              // console.log("บันทึก อาจารย์รับผิดชอบกลุ่ม");
              Swal.fire({
                title: "เพิ่มอาจารย์ที่รับผิดชอบ !!",
                text: "ต้องการ เพิ่ม อาจารย์ที่รับผิดชอบ ใช่ หรือ ไม่",
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "ตกลง",
                cancelButtonText: "ยกเลิก",
                icon: "question",
              }).then((res) => {
                if (res.isConfirmed) {
                  console.log("เพิ่มอาจารย์ ที่ปรึกษา +++");
                  handleAddadvisoringroup(
                    selectDataGroup ? selectDataGroup.Id : "",
                    inputAddvisorId1 ? inputAddvisorId1.id : "",
                    inputAddvisorId2 ? inputAddvisorId2.id : "",
                    inputMEQ1 ? inputMEQ1 : "",
                    inputMEQ2 ? inputMEQ2 : "",
                    usertoken
                  );
                }
              });
            }}
          >{`บันทึก`}</button>
        </form>
      </div>
    );
  };

  const ContentEditGroupModal = (data) => {
    return (
      <div className="body-content-editGroupAllmodal">
        <div className="header-editGroupAllmodal">
          <span>{"แก้ไขข้อมูล กลุ่ม"}</span>
        </div>
        <div className="input-editGroupAllmodal">
          <div className="titlename-inputeditGroupAllmodal">
            <span>{"ชื่อ"}</span>
          </div>
          <div className="inputname-inputeditGroupAllmodal">
            <input
              type="text"
              value={editNameGroup ? editNameGroup : data ? data.name : ""}
              onChange={(e) => {
                setEditNameGroup(e.target.value);
              }}
              onFocus={(e) => e.target.select()}
            ></input>
          </div>
        </div>
        <div className="inputdate-editGroupAllmodal">
          <div className="box-inputDate-editGroupAllmodal">
            <div className="boxgrid-inputdate-editGroupAllmodal">
              <div className="input-grid-editGroupAllmodal">
                <span>{"เริ่ม"}</span>
              </div>
              <div className="input-grid-editGroupAllmodal">
                <input
                  type="date"
                  value={
                    editstartGroup ? editstartGroup : data ? data.start : ""
                  }
                  onChange={(e) => {
                    setEditstartGroup(e.target.value);
                  }}
                ></input>
              </div>
            </div>
            <div className="boxgrid-inputdate-editGroupAllmodal">
              <div className="input-grid-editGroupAllmodal">
                <span>{"สิ้นสุด"}</span>
              </div>
              <div className="input-grid-editGroupAllmodal">
                <input
                  type="date"
                  value={editendGroup ? editendGroup : data ? data.stop : ""}
                  onChange={(e) => {
                    setEditendGroup(e.target.value);
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div
            className="boxsubmit-button-editGroupAllmodal"
            onClick={() => {
              console.log("TEST !!! edit");
              handleSubmiteditgroup(data ? data.Id : "");
            }}
          >
            <button type="button">{"แก้ไข"}</button>
          </div>
        </div>
      </div>
    );
  };

  const handleCheckAdvisorgroup = (group, advisor) => {
    if (group.teacher1 !== "0" || group.teacher2 !== "0") {
      if (advisor[0]) {
        advisor.map((advisor) => {
          if (advisor.id === group.teacher1) {
            setInputAddvisorID1({ id: advisor.id, name: advisor.name });
            setInputMEQ1(parseInt(group.meq1));
          } else if (advisor.id === group.teacher2) {
            setInputAddvisorID2({ id: advisor.id, name: advisor.name });
            setInputMEQ2(parseInt(group.meq2));
          }
        });
      }
    } else {
      // console.log("ไม่มีครูไม่มีmeq");
      setInputAddvisorID1({});
      setInputAddvisorID2({});
      setInputMEQ1(0);
      setInputMEQ2(0);
    }
  };

  const handleDataGropstudent = async (yearinfo, tokenuser) => {
    let object = {
      year: yearinfo,
    };
    await FetchControlGroup.fetchGetGroupStudentgroup(object, tokenuser).then(
      (data) => {
        setDataGroupall(data);
      }
    );
  };

  const handleDataGroupAdvisor = async (tokenuser) => {
    await FetchControlGroup.fetchGetGroupStudentAdvisor(tokenuser).then(
      (res) => {
        setDataGroupAdvisor(res);
      }
    );
  };

  const handleDataGroupStudentemptygroup = async (tokenuser) => {
    await FetchControlGroup.fetchGetGroupStudentemptygroup(tokenuser).then(
      (data) => {
        // console.log("ข้อมูลนศพ ที่ว่าง");
        setDataGroupStudentEmpty(data);
      }
    );
  };

  const handleClearHoldlineandselectdata = () => {
    clearHolderlineTable("tableTR-studentIngroup");
    clearHolderlineTable("tableTR-groupall");
    clearHolderlineTable("tableTR-studentEmpty");
    setSelectDataGroup("");
    setSelectStudentEmpty("");
    setSelectStudentingroup("");
  };

  const handleDataGroupstudentingroup = async (idgroup, tokenuser) => {
    let object = { grp_id: idgroup };
    await FetchControlGroup.fetchGetGroupStudentingroup(object, tokenuser).then(
      (data) => {
        // console.log("ข้อมูลนศพ ในกลุ่ม");
        setDataGroupStudentingroup(data);
      }
    );
  };

  const handleAddDataGroupstudent = async (idstudent, idgroup, tokenuser) => {
    if (!idstudent && !idgroup) {
      return Swal.fire({
        title: "กรุณาเลือก กลุ่ม และ นักศึกษาว่าง ก่อนเพิ่มเข้ากลุ่ม !!",
        color: "red",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
    } else if (!idstudent) {
      return Swal.fire({
        title: "กรุณาเลือก นักศึกษาว่าง",
        color: "red",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
    } else if (!idgroup) {
      return Swal.fire({
        title: "กรุณาเลือก กลุ่ม",
        color: "red",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
      });
    }
    let object = { id: idstudent, grp_id: idgroup };
    // console.log("objectAddstudentingroup=>", object);
    // console.log("tokenfetch>>", tokenuser);
    handleClearHoldlineandselectdata();
    FetchControlGroup.fetchAddGroupStudent(object, tokenuser).then(
      (message) => {
        console.log(message);
        handleDataGroupStudentemptygroup(tokenuser);
        handleDataGroupstudentingroup(idstudent, tokenuser);
      }
    );
  };

  const handleDelgroupstudentingroup = (idstudent, idgroup, tokenuser) => {
    if (!idstudent) {
      return Swal.fire({
        title: "กรุณาเลือก รายชื่อนักศึกษา!!",
        text: "ในตารางนักศึกษาในกลุ่ม",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
        color: "red",
      });
    }
    let object = { id: idstudent };
    console.log("delete object=>", object);
    handleClearHoldlineandselectdata();
    FetchControlGroup.fetchDeleteGroupstudentingroup(object, tokenuser).then(
      (message) => {
        console.log(message);
        handleDataGroupStudentemptygroup(tokenuser);
        handleDataGroupstudentingroup(idstudent, tokenuser);
      }
    );
  };

  const handleAddadvisoringroup = (
    groupid,
    teacher1,
    teacher2,
    meq1,
    meq2,
    tokenuser
  ) => {
    if (!teacher1 && !teacher2) {
      Swal.fire({
        title: "กรุณาเลือกรายชื่ออาจารย์",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1200,
        color: "red",
      });
    }

    let object = {
      id: groupid,
      teacher1: teacher1 ? teacher1 : "",
      teacher2: teacher2 ? teacher2 : "",
      meq1: meq1,
      meq2: meq2,
    };
    console.log("addAdvisoringroup =>", object);
    FetchControlGroup.fetchAddGroupadvisorgroup(object, tokenuser).then(
      (res) => {
        console.log(res);
        handleDataGropstudent(yearSelectGroup, tokenuser);
      }
    );
  };

  const handleAddGroupforgroup = (year, tokenuser) => {
    let object = { year: year };
    if (year) {
      console.log("เพิ่มกลุ่ม >>", object);
      Swal.fire({
        title: "เพิ่มรายชื่อกลุ่ม !!",
        text: "ต้องการ เพิ่ม รายชื่อกลุ่ม ใช่หรือไม่ ?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        cancelButtonText: "ยกเลิก",
      }).then((res) => {
        if (res.isConfirmed) {
          FetchControlGroup.fetchAddGroupforGroup(object, tokenuser);
        }
      });
    }
  };

  const handleDeleteGroupforgroup = (groupid, tokenuser) => {
    if (!groupid) return;
    let object = { id: groupid };
    if (groupid) {
      console.log("object deletegroupforgroup =>", object);
      Swal.fire({
        title: "ลบ รายชื่อกลุ่ม !!",
        text: "ต้องการ ลบ รายชื่อกลุ่ม ใช่ หรือ ไม่ ?",
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonText: "ตกลง",
        confirmButtonText: "ยกเลิก",
        icon: "question",
      }).then((res) => {
        if (res.isConfirmed) {
          FetchControlGroup.fetchDeleteGroupforgroup(object, tokenuser);
        }
      });
    }
  };

  useEffect(() => {
    handleDataGropstudent(yearSelectGroup, usertoken);
  }, [yearSelectGroup]);

  useEffect(() => {
    if (statusFinishDocMEQ) {
      console.log("save doctor select");
      docGetId("btnAdddocmeq").style.display = "none";
      docGetId("btnsavegroup").style.display = "block";
      setStatusFinishDocMEQ(false);
    }
  }, [statusFinishDocMEQ]);

  useEffect(() => {
    handleDataGropstudent(yearSelectGroup, usertoken);
    handleDataGroupAdvisor(usertoken);
    handleDataGroupStudentemptygroup(usertoken);
  }, []);

  return (
    <div className="body-content-groupStudent">
      <div className="hander-content-groupStudent">
        <div className="col-header">
          <span>{"ข้อมูล กลุ่ม"}</span>
        </div>
        <div className="col-header box-col-year">
          <span>{"ปี"}</span>
          <input
            type="text"
            className="input-year-groupStudent"
            value={yearSelectGroup}
            onChange={(e) => {
              setYearSelectGroup(e.target.value);
            }}
            onFocus={(e) => e.target.select()}
          ></input>
          <div className="relative-btnBox">
            <button
              className="yearControllup"
              type="button"
              onClick={() => {
                handlecalUpdownyear("up", yearSelectGroup);
              }}
            >
              <i className="bi-caret-up"></i>
            </button>
            <button
              className="yearControlldown"
              type="button"
              onClick={() => {
                handlecalUpdownyear("down", yearSelectGroup);
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
          </div>
        </div>
        <div className="col-header">
          <span>{"ค้นหา"}</span>
          <input
            type="text"
            className="input-search-groupStudent"
            onChange={(e) => {
              setSearchgroup(e.target.value);
            }}
            onFocus={(e) => e.target.select()}
          ></input>
          <button
            type="button"
            className="btn-search-groupStudent"
            onClick={() => {
              if (searchgroup) {
                console.log("ไม่ว่าง");
                setDataGroupall(searchGroupcontent(searchgroup, dataGroupall));
              } else {
                console.log("ว่าง");
                handleDataGropstudent(yearSelectGroup, usertoken);
              }
            }}
          >
            <i className="bi-search"></i>
          </button>
        </div>
        <div className="col-header">
          <button type="button" className="btn-close-groupStudent">
            {"ปิด"}
          </button>
        </div>
      </div>
      <div className="content-groupStudent">
        {/* ตารางแสดงกลุ่มทั้งหมด */}
        <div className="table-box-groupStudent">
          {dataGroupall ? (
            dataGroupall[0] ? (
              <table className="table-show-info" id="tableGroupAll">
                <thead>
                  <tr>
                    <th>{"ชื่อ"}</th>
                    <th>{"เริ่ม"}</th>
                    <th>{"ถึง"}</th>
                    <th>{"แก้ไข"}</th>
                  </tr>
                </thead>
                <tbody>
                  {dataGroupall.map((data, index) => {
                    return (
                      <tr
                        className="tableTR-groupall"
                        id={`tablega-${index}`}
                        key={index}
                        onClick={() => {
                          setSelectDataGroup(data);
                          handleCheckAdvisorgroup(data, dataGroupAdvisor);
                          handleDataGroupstudentingroup(data.Id, usertoken);
                          HolderlineonTable(
                            "tableTR-groupall",
                            "tablega-",
                            index
                          );
                        }}
                      >
                        <td>{`${data.name}`}</td>
                        <td>{`${data.start}`}</td>
                        <td>{`${data.stop}`}</td>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              setEditNameGroup(data.name);
                              setEditstartGroup(data.start);
                              setEditendGroup(data.stop);
                              handleOpenModalbox("boxEditGroupModal");
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
            )
          ) : (
            <table className="table-show-info" id="tableGroupAll">
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
                  <td width={200}>{"-"}</td>
                  <td width={150}>{"-"}</td>
                  <td width={150}>{"-"}</td>
                  <td width={50}>
                    <button type="button">
                      <i className="bi-three-dots"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
        <div className="box-controll-student">
          <h3>{"นักศึกษาว่าง"}</h3>
          {/* ตารางแสดงนักเรียนที่ว่าง */}
          <div className="row-table-controll-student">
            {dataGroupStudentEmpty ? (
              dataGroupStudentEmpty[0] ? (
                <table className="table-show-info" style={{ width: "550px" }}>
                  <thead>
                    <tr>
                      <th>{"รหัส"}</th>
                      <th>{"ชื่อ"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataGroupStudentEmpty.map((data, index) => {
                      return (
                        <tr
                          className="tableTR-studentEmpty"
                          id={`tr-studentEmpty-${index}`}
                          key={index}
                          onClick={() => {
                            console.log("studentempty click", data);
                            setSelectStudentEmpty(data);
                            HolderlineonTable(
                              "tableTR-studentEmpty",
                              "tr-studentEmpty-",
                              index
                            );
                          }}
                        >
                          <td width={150}>{data.std_id}</td>
                          <td width={400}>{data.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <table className="table-show-info" style={{ width: "550px" }}>
                  <thead>
                    <tr>
                      <th>{"รหัส"}</th>
                      <th>{"ชื่อ"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{""}</th>
                      <th>{""}</th>
                    </tr>
                  </tbody>
                </table>
              )
            ) : (
              <table className="table-show-info" style={{ width: "550px" }}>
                <thead>
                  <tr>
                    <th>{"รหัส"}</th>
                    <th>{"ชื่อ"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width={150}>{"(รหัส)"}</td>
                    <td width={400}>{"(ชื่อ)"}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          <div className="btnAddDel-controll-student">
            <button
              type="button"
              className="btnAdd-inControllStudent"
              onClick={() => {
                console.log("มันต้องเพิ่มเข้ากลุ่ม ?");
                handleAddDataGroupstudent(
                  selectStudentEmpty ? selectStudentEmpty.id : "",
                  selectDataGroup ? selectDataGroup.Id : "",
                  usertoken
                );
              }}
            >
              {"เพิ่มเข้ากลุ่ม"}
            </button>
            <button
              type="button"
              className="btnDel-incontrollStudent"
              onClick={() => {
                handleDelgroupstudentingroup(
                  selectStudentingroup ? selectStudentingroup.id : "",
                  selectDataGroup ? selectDataGroup.Id : "",
                  usertoken
                );
              }}
            >
              {"ลบออกจากกลุ่ม"}
            </button>
          </div>
          <h3>{"นักศึกษาในกลุ่ม"}</h3>
          {/* ตารางแสดงนักศึกษาในกลุ่มนั้นๆ */}
          <div className="row-table-controll-student">
            {dataGroupStudentingroup ? (
              dataGroupStudentingroup[0] ? (
                <table className="table-show-info" style={{ width: "550px" }}>
                  <thead>
                    <tr>
                      <th>{"รหัส"}</th>
                      <th>{"ชื่อ"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataGroupStudentingroup.map((data, index) => {
                      return (
                        <tr
                          className="tableTR-studentIngroup"
                          id={`tr-studentIngroup-${index}`}
                          key={index}
                          onClick={() => {
                            HolderlineonTable(
                              "tableTR-studentIngroup",
                              "tr-studentIngroup-",
                              index
                            );
                            setSelectStudentingroup(data);
                            console.log(data);
                          }}
                        >
                          <td width={150}>{data.std_id}</td>
                          <td width={400}>{data.name}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <table className="table-show-info" style={{ width: "550px" }}>
                  <thead>
                    <tr>
                      <th>{"รหัส"}</th>
                      <th>{"ชื่อ"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td width={150}>{"(รหัส)"}</td>
                      <td width={400}>{"(ชื่อ)"}</td>
                    </tr>
                  </tbody>
                </table>
              )
            ) : (
              <table className="table-show-info" style={{ width: "550px" }}>
                <thead>
                  <tr>
                    <th>{"รหัส"}</th>
                    <th>{"ชื่อ"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width={150}>{"(รหัส)"}</td>
                    <td width={400}>{"(ชื่อ)"}</td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
          {/* อาจารย์ที่รับผิดชอบ */}
          <div className="box-doctorInput-ControllStudent">
            <div className="row-doctorInputControllStudent">
              <div className="row-input-doctorInputControllStudent">
                <div className="boxInRowInputControllStudent">
                  <span>{"อาจารย์"}</span>
                  <div className="boxRow-adddoctorMEQ-drop" id={`advisorDrop1`}>
                    <input
                      type="text"
                      className="input-textadvisor-addDoctorMEQ"
                      onFocus={(e) => e.target.select()}
                      value={inputAddvisorId1.name ? inputAddvisorId1.name : ""}
                      onClick={() => {
                        handleDropDoctorMEQ(1);
                      }}
                      required
                      readOnly
                    ></input>
                    <button
                      type="button"
                      onClick={() => {
                        handleDropDoctorMEQ(1);
                      }}
                    >
                      <i className="bi-caret-down"></i>
                    </button>
                    <div
                      className="dropDown-info-adddoctorMEQ"
                      id={`dropBoxAdvisor1`}
                    >
                      {dataGroupAdvisor[0] ? (
                        dataGroupAdvisor.map((data, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setInputAddvisorID1({
                                  name: data.name,
                                  id: data.id,
                                });
                                handleDropDoctorMEQ(1);
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
                <div className="boxInRowInputControllStudent">
                  <span>{"MEQ"}</span>
                  <input
                    className="input-meq-ControllStudent"
                    type="number"
                    onChange={(e) => {
                      setInputMEQ1(e.target.value);
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    value={inputMEQ1}
                  ></input>
                </div>
              </div>
              <div className="row-input-doctorInputControllStudent">
                <div className="boxInRowInputControllStudent">
                  <span>{"อาจารย์"}</span>
                  <div className="boxRow-adddoctorMEQ-drop" id={`advisorDrop2`}>
                    <input
                      type="text"
                      className="input-textadvisor-addDoctorMEQ"
                      value={inputAddvisorId2.name ? inputAddvisorId2.name : ""}
                      onFocus={(e) => e.target.select()}
                      onClick={() => {
                        handleDropDoctorMEQ(2);
                      }}
                      required
                      readOnly
                    ></input>
                    <button
                      type="button"
                      onClick={() => {
                        handleDropDoctorMEQ(2);
                      }}
                    >
                      <i className="bi-caret-down"></i>
                    </button>
                    <div
                      className="dropDown-info-adddoctorMEQ"
                      id={`dropBoxAdvisor2`}
                    >
                      {dataGroupAdvisor[0] ? (
                        dataGroupAdvisor.map((data, index) => {
                          return (
                            <div
                              key={index}
                              onClick={() => {
                                setInputAddvisorID2({
                                  name: data.name,
                                  id: data.id,
                                });
                                handleDropDoctorMEQ(2);
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
                <div className="boxInRowInputControllStudent">
                  <span>{"MEQ"}</span>
                  <input
                    className="input-meq-ControllStudent"
                    type="number"
                    onChange={(e) => {
                      setInputMEQ2(e.target.value);
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                    value={inputMEQ2}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row-doctorInputControllStudent">
              <button
                className="btn-submit-groupStudent"
                type="button"
                onClick={() => {
                  // console.log("บันทึก อาจารย์รับผิดชอบกลุ่ม");
                  Swal.fire({
                    title: "เพิ่มอาจารย์ที่รับผิดชอบ !!",
                    text: "ต้องการ เพิ่ม อาจารย์ที่รับผิดชอบ ใช่ หรือ ไม่",
                    showConfirmButton: true,
                    showCancelButton: true,
                    confirmButtonText: "ตกลง",
                    cancelButtonText: "ยกเลิก",
                    icon: "question",
                  }).then((res) => {
                    if (res.isConfirmed) {
                      console.log("เพิ่มอาจารย์ ที่ปรึกษา +++");
                      handleAddadvisoringroup(
                        selectDataGroup ? selectDataGroup.Id : "",
                        inputAddvisorId1 ? inputAddvisorId1.id : "",
                        inputAddvisorId2 ? inputAddvisorId2.id : "",
                        inputMEQ1 ? inputMEQ1 : "",
                        inputMEQ2 ? inputMEQ2 : "",
                        usertoken
                      );
                    }
                  });
                }}
              >
                {"บันทึก"}
              </button>
            </div>
          </div>
          <div className="box-btnmodal-adding">
            <button
              className="btn-addingModal-addAdvisor"
              id="btnAdddocmeq"
              type="button"
              onClick={(e) => {
                if (selectDataGroup) {
                  setTitleText("เพิ่มอาจารย์ และ MEQ");
                  handleModleAddDoctor(true);
                } else {
                  Swal.fire({
                    title: "กรุณาเลือกรายชื่อกลุ่ม!!",
                    text: "ตารางกลุ่ม",
                    showCancelButton: false,
                    showConfirmButton: false,
                    color: "red",
                    timer: 1200,
                  });
                }
              }}
            >
              {"อาจารย์"}
            </button>
            {/* <button
              className="btn-addingModal-savegroup"
              type="button"
              id="btnsavegroup"
              onClick={()=>{console.log("ปุ่มไหนนิ")}}
            >
              {"บันทึก"}
            </button> */}
          </div>
        </div>
        <div className="box-menu-groupStudent">
          <div className="btn-menu-boxGroupStudent">
            <button
              type="button"
              onClick={() => {
                handleAddGroupforgroup(yearSelectGroup, usertoken);
              }}
            >
              {"เพิ่ม"}
            </button>
          </div>
          <div className="btn-menu-boxGroupStudent">
            <button
              type="button"
              onClick={() => {
                if (selectDataGroup !== "") {
                  handleDeleteGroupforgroup(selectDataGroup.Id, usertoken);
                } else {
                  Swal.fire({
                    title: "กรุณาเลือกรายชื่อกลุ่ม!!!",
                    text: "ในตารางรายชื่อกลุ่ม",
                    showCancelButton: false,
                    showConfirmButton: false,
                    color: "red",
                    timer: 1200,
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
        thisTitle={titleText}
        statusClose={setCloseModalbox}
        content={ContentAddDoctorModal()}
      ></ModalBox>
      <ModalBox
        idbox={"boxEditGroupModal"}
        statusClose={setCloseModalbox}
        content={ContentEditGroupModal(selectDataGroup)}
      ></ModalBox>
    </div>
  );
};
export default ContentGroupStudent;
