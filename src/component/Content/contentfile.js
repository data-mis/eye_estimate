import { useEffect, useRef, useState } from "react";
import FetchControlWork from "../data/fetchControlWork";
import Cookies from "universal-cookie";

const ContentFile = (props) => {
  const cookies = new Cookies();
  const usertoken = cookies.get("token");
  const fileSelectPDF = useRef(null);
  const [boxdroplistinfo, setBoxdroplistinfo] = useState(false);
  const [infostudentfile, setInfostudentfile] = useState([]);
  const [urlpdf, setUrlpdf] = useState("");
  const [infofilename, setInfofilename] = useState({ filename: "", date: "" });

  const PDFviewer = () => {
    // const url = `https://www.orimi.com/pdf-test.pdf`;

    return (
      <iframe src={urlpdf} style={{ width: "100%", height: "100%" }}></iframe>
    );
  };

  const handleselectfile = () => {
    let thisFile = fileSelectPDF.current.files[0];
    console.log("filepdf >>>", thisFile);

    let filepdf = new File([thisFile], `test.pdf`, { type: thisFile.type });
    console.log("newFile>>>", filepdf);
  };

  const handlegetstudentfile = (workid) => {
    console.log("workid >>>", workid);
    let object = {
      work_id: workid,
    };
    FetchControlWork.fetchgetStudentfile(object, usertoken).then((data) => {
      setInfostudentfile(data);
      console.log(data);
    });
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
    handlegetstudentfile(props.workid);
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
              style={{ display: "none" }}
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
                  handleselectfile();
                }
              }}
            ></input>
            <div className="box-fix-menufile">
              <button className="btn-menubtn-filecontent btn-add-filecontent">
                {"เพิ่ม"}
              </button>
              <button className="btn-menubtn-filecontent btn-del-filecontent">
                {"ลบ"}
              </button>
            </div>
          </div>
          <div className="box-showfile">
            <h2 style={{ marginLeft: "10px" }}>รายการ</h2>
            <div className="box-info-filecontent">
              {infostudentfile[0] ? (
                infostudentfile.map((data) => {
                  return (
                    <div
                      className="card-info-filecontent"
                      style={
                        infofilename.filename === data.file_real
                          ? { backgroundColor: "#546e7a", color: "#fefefe" }
                          : {}
                      }
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
              className="inputfile-pdf-filecontent"
              style={{ display: "none" }}
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
    </div>
  );
};
export default ContentFile;
