import { useEffect, useRef, useState } from "react";
import FetchControlWork from "../data/fetchControlWork";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import moment from "moment";
import { HolderlineonTable } from "../config/holdlinetable";

const ContentFile = (props) => {
  const cookies = new Cookies();
  const usertoken = cookies.get("token");
  const fileSelectPDF = useRef(null);
  const mobilefileSelectPDF = useRef(null);
  const [boxdroplistinfo, setBoxdroplistinfo] = useState(false);
  const [infostudentfile, setInfostudentfile] = useState([]);
  const [urlpdf, setUrlpdf] = useState("");
  const [infofilename, setInfofilename] = useState({ filename: "", date: "" });
  const [idfile, setIdfile] = useState("");

  const PDFviewer = () => {
    // const url = `https://www.orimi.com/pdf-test.pdf`;

    return (
      <iframe src={urlpdf} style={{ width: "100%", height: "100%" }}></iframe>
    );
  };

  const handleselectfile = (infowork) => {
    let thisFile = fileSelectPDF.current.files[0];
    console.log("filepdf >>>", thisFile);

    Swal.fire({
      titleText: `อัพโหลดไฟล์ \n${thisFile.name}`,
      icon: "question",
      showDenyButton: true,
      confirmButtonColor: "#558b2f",
      denyButtonColor: "#d01716",
      confirmButtonText: "อัพโหลด",
      denyButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        let filepdf = new File([thisFile], `${thisFile.name}`, {
          type: thisFile.type,
        });

        let filesend = new FormData();
        filesend.append("file", filepdf);
        filesend.append("work_id", infowork.Id);
        filesend.append("work_date", moment(new Date()).format("YYYY-MM-DD"));
        filesend.append("student_id", infowork.student_id);
        filesend.append("grp_id", infowork.grp_id);

        FetchControlWork.fetchUpstudentfilework(filesend, usertoken);

        // document.getElementById("modalProgressbar").style.display = "block";

        Swal.fire({
          // title: "อัพโหลดไฟล์",
          // text: "อัพโหลดไฟล์แล้วเรียบร้อย",
          showConfirmButton: false,
          icon: "success",
          timer: 1700,
          background: "none",
        });
      } else {
        console.log("ยกเลิกอัพ");
      }
    });
  };

  const handleDeleteFile = (workid) => {
    if (workid) {
      let object = { id: workid };
      console.log(object);
      Swal.fire({
        title: "เลือกลบไฟล์",
        text: "ต้องการลบข้อมูลหรือไม่ ???",
        icon: "question",
        showConfirmButton: true,
        showDenyButton: true,
        confirmButtonText: "ตกลง",
        denyButtonText: "ยกเลิก",
        confirmButtonColor: "#558b2f",
        denyButtonColor: "#d01716",
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("ลบไฟล์");
          FetchControlWork.fetchDelStudentfilework(object, usertoken).then(
            (data) => {
              console.log(data);
            }
          );
        }
      });
    } else {
      Swal.fire({
        title: "เลือกลบไฟล์",
        text: "ยังไม่ได้เลือกไฟล์ที่จะทำการลบ!!!",
        icon: "warning",
        showConfirmButton: false,
        timer: 1700,
      });
    }
  };

  const handlegetstudentfile = (workid) => {
    // console.log("workid >>>", workid);
    let object = {
      work_id: workid,
    };
    FetchControlWork.fetchgetStudentfile(object, usertoken).then((data) => {
      setInfostudentfile(data);
      console.log(data);
    });
  };

  const handleshowstudentimage = (idwork, workDate, namefile) => {
    let object = {
      work_id: idwork,
      work_date: workDate,
      file_name: namefile,
    };
    // console.log("!->", object);
    FetchControlWork.fetchgetimagestudentfile(object, usertoken).then(
      (data) => {
        console.log(">>>>>", data);
        setUrlpdf(`http://${data.url}`);
      }
    );
  };

  const handleopendropdownlistpdf = (mode) => {
    let docid = (id) => {
      return document.getElementById(id);
    };
    if (mode) {
      docid("dropinfofilecontent").style.display = "none";
      setBoxdroplistinfo(false);
    } else {
      docid("dropinfofilecontent").style.display = "block";
      setBoxdroplistinfo(true);
    }
  };

  useEffect(() => {
    // console.log("selectedinfo >>>", props.selectinfo);
    handlegetstudentfile(props.selectinfo.Id);
  }, []);

  return (
    <div className="content-filecontent">
      <div className="title-nav-filecontent">
        <span>{"ข้อมูล File"}</span>
        <input
          className="namefile-filecontent"
          value={`ชื่อไฟล์: ${infofilename.filename}    วันที่ : ${infofilename.date}`}
          readOnly
        ></input>
        <button
          type="button"
          onClick={() => {
            props.backtowork("workDoctor");
          }}
        >
          {"close"}
        </button>
      </div>
      <div className="body-filecontent">
        <div className="menu-select-filecontent">
          <div className="box-menufile">
            <h2 style={{ marginLeft: "10px" }}>ตัวเลือก</h2>
            <input
              className="inputfile-pdf-filecontent"
              type="file"
              accept=".pdf"
              ref={fileSelectPDF}
              onChange={(e) => {
                let val = e.target.value.split(".").pop();
                if (val !== "pdf") {
                  document.getElementsByClassName(
                    "inputfile-pdf-filecontent"
                  )[0].value = "";
                } else {
                  handleselectfile(props.selectinfo);
                }
              }}
            ></input>
            <div className="box-fix-menufile">
              <button
                className="btn-menubtn-filecontent btn-add-filecontent"
                onClick={() => {
                  document
                    .getElementsByClassName("inputfile-pdf-filecontent")[0]
                    .click();
                }}
              >
                {"เพิ่ม"}
              </button>
              <button
                className="btn-menubtn-filecontent btn-del-filecontent"
                onClick={() => {
                  console.log("ลบ");
                  handleDeleteFile(idfile);
                }}
              >
                {"ลบ"}
              </button>
            </div>
          </div>
          <div className="box-showfile">
            <h2 style={{ marginLeft: "10px" }}>รายการ</h2>
            <div className="box-info-filecontent">
              {infostudentfile[0] ? (
                infostudentfile.map((data, index) => {
                  return (
                    <div
                      className="card-info-filecontent"
                      id={`cardfileinfo-${index}`}
                      key={index}
                      style={
                        infofilename.filename === data.file_real
                          ? { backgroundColor: "#546e7a", color: "#fefefe" }
                          : {}
                      }
                      onClick={() => {
                        console.log(data);
                        HolderlineonTable(
                          "card-info-filecontent",
                          "cardfileinfo-",
                          index
                        );
                        setIdfile(data.Id);
                        handleshowstudentimage(
                          props.selectinfo.Id,
                          data.work_date,
                          data.file_name
                        );
                        // setUrlpdf("https://www.orimi.com/pdf-test.pdf");
                        // handleopendropdownlistpdf(boxdroplistinfo);
                        // setInfofilename({
                        //   filename: data.file_real,
                        //   date: data.date,
                        // });
                      }}
                    >
                      <span>{data.file_real}</span>
                    </div>
                  );
                })
              ) : (
                <div className="card-info-filecontent">
                  <span>{"-"}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="menu-mobile-filecontent">
          <div className="btnmenu-mobile-filecontent">
            <input
              className="inputfilemobile-pdf-filecontent"
              style={{ display: "none" }}
              type="file"
              accept=".pdf"
              ref={mobilefileSelectPDF}
              onChange={(e) => {
                let val = e.target.value.split(".").pop();
                if (val !== "pdf") {
                  document.getElementsByClassName(
                    "inputfilemobile-pdf-filecontent"
                  )[0].value = "";
                } else {
                  handleselectfile();
                }
              }}
            ></input>
            <button className="btn-menubtn-filecontent btn-add-filecontent">
              {"เพิ่ม"}
            </button>
            <button className="btn-menubtn-filecontent btn-del-filecontent">
              {"ลบ"}
            </button>
          </div>
          <div className="infocard-mobile-filecontent">
            <div className="menu-dropdown-filecontent">
              <input
                className="dropinput-filepdf-filecontent"
                type="text"
                onClick={() => {
                  handleopendropdownlistpdf(boxdroplistinfo);
                }}
                value={infofilename.filename}
                readOnly
              ></input>
              <button
                className="dropbtn-filepdf-filecontent"
                type="button"
                onClick={() => {
                  handleopendropdownlistpdf(boxdroplistinfo);
                }}
              >
                <i className="bi-filetype-pdf"></i>
              </button>
              <button
                className="btn-backtowork-filecontent"
                onClick={() => {
                  props.backtowork("workDoctor");
                }}
              >
                <i className="bi-arrow-left-square"></i>
              </button>
              <div
                className="dropinfo-filepdf-filecontent"
                id="dropinfofilecontent"
              >
                {infostudentfile[0]
                  ? infostudentfile.map((data, index) => {
                      return (
                        <div
                          className="card-info-filecontent"
                          key={index}
                          onClick={() => {
                            setUrlpdf("https://www.orimi.com/pdf-test.pdf");
                            handleopendropdownlistpdf(boxdroplistinfo);
                            setInfofilename({
                              filename: data.file_real,
                              date: data.date,
                            });
                          }}
                        >
                          <span>{data.file_real}</span>
                        </div>
                      );
                    })
                  : ""}
              </div>
            </div>
            <div>
              <input
                className="inputshowinfomobile-filecontent"
                type="text"
                value={`ชื่อไฟล์: ${infofilename.filename} วันที่: ${infofilename.date}`}
                readOnly
              ></input>
            </div>
          </div>
        </div>
        <div className="show-file-filecontent">{PDFviewer()}</div>
      </div>
      {/* <ModalBox
        idbox={"modalProgressbar"}
        content={Contentprogressbar()}
      ></ModalBox> */}
    </div>
  );
};
export default ContentFile;
