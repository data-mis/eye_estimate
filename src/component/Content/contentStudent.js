import { useEffect, useRef, useState } from "react";
import FetchController, { handleFatch } from "../data/fetchConroller";
import { searching } from "../config/searchConfig";
import ModalBox from "../modal/modalBox";
import { handleOpenModalbox } from "../config/modalConfig";
import Cookies from "universal-cookie";

const ContentStudent = (prop) => {
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

  const cookie = new Cookies();
  const usertoken = cookie.get("token");

  const handleYearselect = (status) => {
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

  const imgCanvasPreview = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();

    let canvas = document.getElementById("canvasPreview");
    let ctx = canvas.getContext("2d");
    let url = reader.readAsDataURL(file);

    console.log("img", file);
    console.log("reader", reader);
    console.log("url", url);
  };

  const modalContent = () => {
    return (
      <div className="body-content-modalStudent">
        <form className="form-modalContent">
          <div className="input-modalBox">
            <span>{"ปี"}</span>
            <input className="Modalinput-year" type="number"></input>
          </div>
          <div className="input-modalBox">
            <span>{"คำนำหน้า"}</span>
            <input className="Modalinput-ttl" type="text"></input>
          </div>
          <div className="input-modalBox">
            <span>{"ชื่อ"}</span>
            <input className="Modalinput-name" type="text"></input>
          </div>
          <div className="input-modalBox">
            <span>{"นามสกุล"}</span>
            <input className="Modalinput-lname" type="text"></input>
          </div>
          <div className="input-modalBox">
            <span>{"ประเภท"}</span>
            <input className="Modalinput-type" type="text"></input>
          </div>
          <div className="input-modalBox">
            <span>{"รหัสนักศึกษา"}</span>
            <input className="Modalinput-idStudent" type="text"></input>
          </div>
          <div className="input-modalBox">
            <span>{"อ.ที่ปรึกษา"}</span>
            <input className="Modalinput-perfessor" type="text"></input>
          </div>
          <div className="input-modalBox">
            <span>{"กลุ่ม"}</span>
            <input className="Modalinput-group" type="text"></input>
          </div>
          <div className="input-modalBox">
            <span>{"ขึ้นสาย"}</span>
            <input className="Modalinput-start" type="date"></input>
          </div>
          <div className="input-modalBox">
            <span>{"ลงสาย"}</span>
            <input className="Modalinput-stop" type="date"></input>
          </div>
          <div className="btn-modal-submit">
            <button type="submit">{"บันทึก"}</button>
          </div>
        </form>
        <div className="form-picture">
          <div className="preview-picture">
            <canvas className="canvas-perview" id="canvasPreview"></canvas>
            <img src={picURL}></img>
          </div>
          <div className="input-picture">
            <input
              className="input-picture-file"
              type="file"
              ref={inputPic}
              multiple={true}
              onChange={(e) => {
                console.log(e);
                imgCanvasPreview(e);
              }}
            ></input>
            <button type="button" className="btn-add-filePicture">
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
                <td>{"นาย"}</td>
                <td>{"สิรภพ"}</td>
                <td>{"หล้านันตา"}</td>
                <td>{"นศพ."}</td>
                <td>{"123456789"}</td>
                <td>{"อ.นพ.รุ่งเกียรติ จางไววิทย์"}</td>
                <td>{"ก1"}</td>
                <td>{"01-04-1566"}</td>
                <td>{"29-04-2566"}</td>
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
      <ModalBox content={modalContent()}></ModalBox>
    </div>
  );
};
export default ContentStudent;
