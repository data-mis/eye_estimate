import { useEffect, useState } from "react";
import ModalBox from "../modal/modalBox";

const ContentGroupStudent = (props) => {
  const docGetId = (id) => {
    return document.getElementById(id);
  };

  const [inputAddvisorId1, setInputAddvisorID1] = useState("");
  const [inputAddvisorId2, setInputAddvisorID2] = useState("");
  const [inputMEQ1, setInputMEQ1] = useState();
  const [inputMEQ2, setInputMEQ2] = useState();

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
    setStatusFinishDocMEQ(true);
    console.log("object=>", object);
    handleModleAddDoctor(false);
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
            handleSubmitModalDoctorMEQ(e);
          }}
        >
          <div className="boxRow-addDoctorMEQ">
            <span>{"อาจารย์"}</span>
            <div className="boxRow-adddoctorMEQ-drop" id={`advisorDrop1`}>
              <input
                type="text"
                className="input-textadvisor-addDoctorMEQ"
                onChange={(e) => {
                  setInputAddvisorID1(e.target.value);
                }}
                onFocus={(e) => e.target.select()}
                value={inputAddvisorId1}
                required
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
                <div
                  onClick={() => {
                    setInputAddvisorID1("อ.หนึ่ง ทดสอบ");
                    handleDropDoctorMEQ(1);
                  }}
                >
                  <span>{`อ.หนึ่ง ทดสอบ`}</span>
                </div>
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
              required
            ></input>
          </div>
          <div className="boxRow-addDoctorMEQ">
            <span>{"อาจารย์"}</span>
            <div className="boxRow-adddoctorMEQ-drop" id={`advisorDrop2`}>
              <input
                type="text"
                className="input-textadvisor-addDoctorMEQ"
                value={inputAddvisorId2}
                onChange={(e) => {
                  setInputAddvisorID2(e.target.value);
                }}
                onFocus={(e) => e.target.select()}
                required
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
                <div
                  onClick={() => {
                    setInputAddvisorID2("อ.สอง ทดสอบ");
                    handleDropDoctorMEQ(2);
                  }}
                >
                  <span>{`อ.สอง ทดสอบ`}</span>
                </div>
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
              required
            ></input>
          </div>
          <button
            className="btn-save-addDoctorMEQ"
            type="submit"
          >{`บันทึก`}</button>
        </form>
      </div>
    );
  };

  useEffect(() => {
    if (statusFinishDocMEQ) {
      console.log("save doctor select");
      docGetId("btnAdddocmeq").style.display = "none";
      docGetId("btnsavegroup").style.display = "block";
      setStatusFinishDocMEQ(false);
    }
  }, [statusFinishDocMEQ]);

  return (
    <div className="body-content-groupStudent">
      <div className="hander-content-groupStudent">
        <div className="col-header">
          <span>{"ข้อมูล กลุ่ม"}</span>
        </div>
        <div className="col-header box-col-year">
          <span>{"ปี"}</span>
          <input type="text" className="input-year-groupStudent"></input>
          <div className="relative-btnBox">
            <button className="yearControllup" type="button">
              <i className="bi-caret-up"></i>
            </button>
            <button className="yearControlldown" type="button">
              <i className="bi-caret-down"></i>
            </button>
          </div>
        </div>
        <div className="col-header">
          <span>{"ค้นหา"}</span>
          <input type="text" className="input-search-groupStudent"></input>
          <button>
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
        <div className="table-box-groupStudent">
          <table className="table-show-info" style={{ width: "550px" }}>
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
                <td width={200}>{"(ชื่อ)"}</td>
                <td width={150}>{"(เริ่ม)"}</td>
                <td width={150}>{"(ถึง)"}</td>
                <td width={50}>
                  <button>
                    <i className="bi-three-dots"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="box-controll-student">
          <h3>{"นักศึกษาว่าง"}</h3>
          <div className="row-table-controll-student">
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
          </div>
          <div className="btnAddDel-controll-student">
            <button type="button" className="btnAdd-inControllStudent">
              {"เพิ่มเข้ากลุ่ม"}
            </button>
            <button type="button" className="btnDel-incontrollStudent">
              {"ลบออกจากกลุ่ม"}
            </button>
          </div>
          <h3>{"นักศึกษาในกลุ่ม"}</h3>
          <div className="row-table-controll-student">
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
          </div>
          <div className="box-doctorInput-ControllStudent">
            <div className="row-doctorInputControllStudent">
              <div className="row-input-doctorInputControllStudent">
                <div className="boxInRowInputControllStudent">
                  <span>{"อาจารย์"}</span>
                  <div className="boxRow-adddoctorMEQ-drop" id={`advisorDrop1`}>
                    <input
                      type="text"
                      className="input-textadvisor-addDoctorMEQ"
                      onChange={(e) => {
                        setInputAddvisorID1(e.target.value);
                      }}
                      onFocus={(e) => e.target.select()}
                      value={inputAddvisorId1}
                      required
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
                      <div
                        onClick={() => {
                          setInputAddvisorID1("อ.หนึ่ง ทดสอบ");
                          handleDropDoctorMEQ(1);
                        }}
                      >
                        <span>{`อ.หนึ่ง ทดสอบ`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="boxInRowInputControllStudent">
                  <span>{"MEQ"}</span>
                  <input
                    className="input-meq-ControllStudent"
                    type="text"
                    onChange={(e) => {
                      setInputMEQ1(e.target.value);
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
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
                      value={inputAddvisorId2}
                      onChange={(e) => {
                        setInputAddvisorID2(e.target.value);
                      }}
                      onFocus={(e) => e.target.select()}
                      required
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
                      <div
                        onClick={() => {
                          setInputAddvisorID2("อ.สอง ทดสอบ");
                          handleDropDoctorMEQ(2);
                        }}
                      >
                        <span>{`อ.สอง ทดสอบ`}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="boxInRowInputControllStudent">
                  <span>{"MEQ"}</span>
                  <input
                    className="input-meq-ControllStudent"
                    type="text"
                    onChange={(e) => {
                      setInputMEQ2(e.target.value);
                    }}
                    onFocus={(e) => {
                      e.target.select();
                    }}
                  ></input>
                </div>
              </div>
            </div>
            <div className="row-doctorInputControllStudent">
              <button className="btn-submit-groupStudent" type="button">
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
                setTitleText("เพิ่มอาจารย์ และ MEQ");
                handleModleAddDoctor(true);
              }}
            >
              {"อาจารย์"}
            </button>
            <button
              className="btn-addingModal-savegroup"
              type="button"
              id="btnsavegroup"
            >
              {"บันทึก"}
            </button>
          </div>
        </div>
        <div className="box-menu-groupStudent">
          <div className="btn-menu-boxGroupStudent">
            <button type="button">{"เพิ่ม"}</button>
          </div>
          <div className="btn-menu-boxGroupStudent">
            <button type="button">{"ลบ"}</button>
          </div>
        </div>
      </div>
      <ModalBox
        idbox={"boxModal"}
        thisTitle={titleText}
        statusClose={setCloseModalbox}
        content={ContentAddDoctorModal()}
      ></ModalBox>
    </div>
  );
};
export default ContentGroupStudent;
