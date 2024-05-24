import { useEffect, useRef, useState } from "react";
import FetchControlWork from "../data/fetchControlWork";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import moment from "moment";
import { HolderlineonTable } from "../config/holdlinetable";
import { PDFDocument, rgb, scale, StandardFonts } from "pdf-lib";
import pica from "pica";

import * as pdfjsLib from "pdfjs-dist/webpack.mjs";
import html2canvas from "html2canvas";
import Compressor from "compressorjs";
import Spinnerpage from "../config/spinnerpage";

const ContentFile = (props) => {
  const cookies = new Cookies();
  const usertoken = cookies.get("tokenEye");
  const fileSelectPDF = useRef(null);
  const mobilefileSelectPDF = useRef(null);
  const [boxdroplistinfo, setBoxdroplistinfo] = useState(false);
  const [infostudentfile, setInfostudentfile] = useState([]);
  const [urlpdf, setUrlpdf] = useState("");
  const [infofilename, setInfofilename] = useState({ filename: "", date: "" });
  const [idfile, setIdfile] = useState("");
  const [imageurldata, setImageurldata] = useState([]);
  const [imgchoose, setImgchoose] = useState([]);
  const [resizedFileURL, setResizedFileURL] = useState(null);

  const handleselectfile = (infowork, filecompressor) => {
    let thisFile = fileSelectPDF.current.files[0];
    console.log("filepdf >>>", filecompressor);
    if (parseInt(filecompressor.size) > 16777216) {
      Swal.fire({
        icon: "warning",
        title: "ขนาดไฟล์ !!!",
        text: "ขนาดไฟล์เกินกำหนด !!",
        showConfirmButton: false,
        timer: 1800,
      });
      fileSelectPDF.current.value = "";
      return;
    }
    console.log(
      "ข้อมูลที่ทำการเพิ่ม",
      infowork.Id,
      infowork.student_id,
      infowork.grp_id
    );
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
        let filepdf = new File([filecompressor], `${thisFile.name}`, {
          type: thisFile.type,
        });
        let filesend = new FormData();
        filesend.append("file", filepdf);
        filesend.append("work_id", infowork.Id);
        filesend.append("work_date", moment(new Date()).format("YYYY-MM-DD"));
        filesend.append("student_id", infowork.student_id);
        filesend.append("grp_id", infowork.grp_id);
        // console.log("filesend formdata >>",filesend.get("file"))
        // console.log("filesend formdata >>",filesend.get("work_id"))
        if (filesend.get("work_id") === infowork.Id) {
          FetchControlWork.fetchUpstudentfilework(filesend, usertoken).then(
            () => {
              handlegetstudentfile(infowork.Id);
            }
          );
        }

        Swal.fire({
          // title: "อัพโหลดไฟล์",
          // text: "อัพโหลดไฟล์แล้วเรียบร้อย",
          showConfirmButton: false,
          icon: "success",
          timer: 1700,
          background: "none",
        });

        // document.getElementById("modalProgressbar").style.display = "block";
      } else {
        console.log("ยกเลิกอัพ");
        fileSelectPDF.current.value = "";
      }
    });
  };

  //ทดสอบฝั่งชั่นเพื่อ resize pdf
  async function compressPDF(inputBytes) {
    try {
      const pdfDoc = await PDFDocument.load(inputBytes);

      // Create a new PDF document
      const newPdfDoc = await PDFDocument.create();

      // // Add pages from original document to new document
      const copiedPages = await newPdfDoc.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices()
      );
      copiedPages.forEach((page) => {
        newPdfDoc.addPage(page);
      });

      // // Serialize the new PDF document
      const newPdfBytes = await newPdfDoc.save();

      return newPdfBytes;
    } catch (error) {
      console.log("ผิดอีกละ", error);
    }
  }

  const handletrycompresspdf = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const inputPdfBytes = new Uint8Array(event.target.result);

        // Call the compressPDF function with inputPdfBytes
        const compressedPdfBytes = await compressPDF(inputPdfBytes);

        // Do something with the compressed PDF bytes, like save to a file or upload to a server
        const blob = new Blob([compressedPdfBytes], {
          type: "application/pdf",
        });
        const url_compresspdf = URL.createObjectURL(blob);
        const taga = document.createElement("a");
        taga.href = url_compresspdf;
        taga.download = "trycompressPDF.pdf";
        taga.click();
        console.log(url_compresspdf);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  //ทดสอบการเปลี่ยนไฟล์ pdf เป็น img
  const [imgtry_arr, setImgtry_arr] = useState([]);
  const [viewheight, setViewheight] = useState(null);
  const [viewwidth, setViewwidth] = useState(null);
  const handletrypdftoimg = async (event) => {
    document.getElementById("processsWait").style.display = "flex";
    const file_pdf = event.target.files[0];
    if (file_pdf) {
      const arr_resultbloa = [];
      const reader_file = new FileReader();
      reader_file.onload = async (e) => {
        const pdfData = e.target.result;
        const pdf = await pdfjsLib.getDocument({ data: pdfData }).promise;
        // console.log("ในเมื่อยากรู้ว่า pdf มีทั้งหมดกี่หน้า :>", pdf.numPages);
        const numofpages = pdf.numPages;
        //วนก่อน
        for (let numpages = 1; numpages <= numofpages; numpages++) {
          //ทำการแปลงไฟล์ pdf เป็นรูปภาพ
          const page = await pdf.getPage(numpages);
          const viewport = page.getViewport({ scale: 2 });
          setViewheight(viewport.height);
          setViewwidth(viewport.width);
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          };
          await page.render(renderContext).promise;
          // const canvasImage = await html2canvas(canvas); //ใช้ html2canvas
          const imageDataUrl = canvas.toDataURL("image/jpeg");
          new Compressor(dataURLtoFile(imageDataUrl, "converted.jpeg"), {
            quality: 0.4,
            success(result) {
              // setImgtry(URL.createObjectURL(result));
              //สร้าง object เพื่อรับค่าจาก compressor โดยให้อยู่ในรูปของ objectURL
              let object_result = {
                page: numpages,
                imgres_bloa: URL.createObjectURL(result),
              };
              arr_resultbloa.push(object_result);
              if (numpages === numofpages) {
                // console.log("วนจบรอบท้่าย");
                // console.log("arrforthis", arr_resultbloa);
                document.getElementById("processsWait").style.display = "none";
                setImgtry_arr(arr_resultbloa);
              }
            },
            error(err) {
              console.log("have a error !!!");
              console.log(err);
            },
          });
        }
      };
      reader_file.readAsArrayBuffer(file_pdf);
    }
  };

  // ฟังก์ชันสำหรับแปลง Data URL เป็น File
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  // จัดการสร้างหน้า PDF
  const generatePDF = async (urlimg_arr) => {
    const pdfDoc = await PDFDocument.create();

    //วนเพื่อนำรูป ไปวางใน pdf
    for (const pageData of urlimg_arr) {
      const page = pdfDoc.addPage([viewwidth, viewheight]);

      const imgUrl = pageData.imgres_bloa;
      const imgBytes = await fetch(imgUrl).then((res) => res.arrayBuffer());
      const img = await pdfDoc.embedJpg(imgBytes);
      const imgDims = img.scale(1);
      page.drawImage(img, {
        x: 0,
        y: 0,
        width: imgDims.width,
        height: imgDims.height,
      });
    }

    // สร้างไฟล์ PDF และส่งค่า
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    return blob;
  };

  useEffect(() => {
    if (!imgtry_arr[0]) return;
    // console.log("ตอนนี้ length ของ arrayคือ =", imgtry_arr.length, imgtry_arr);
    const urlpromiss = generatePDF(imgtry_arr);
    urlpromiss.then((res) => {
      console.log("urlpdfis", res);
      handleselectfile(props.selectinfo, res);
      // const urlpdf = URL.createObjectURL(res);
      // const tagA = document.createElement("a");
      // tagA.href = urlpdf;
      // tagA.download = "thisTESTpdf.pdf";
      // tagA.click();
    });

    // imgtry_arr.map((res, index) => {
    // const taga = document.createElement("a");
    // taga.href = res.imgres_bloa;
    // taga.download = `trycompressJPEG_${res.index + 1}.jpeg`;
    // taga.click();
    // console.log(`trycompressJPEG_${index + 1}.jpeg`);
    // console.log(`array[${index}]`, res.page);
    // });
  }, [imgtry_arr]);

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
        // console.log(">>>>>", data.url);
        setUrlpdf(`https://${data.url}`);
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

  const handlegetimgcomment = (idstudentcode, idwork) => {
    if (!idstudentcode) return;
    let info_body = {
      std_id: idstudentcode,
      work_id: idwork,
    };
    FetchControlWork.fetchgetImagecomment(info_body).then((data) => {
      if (data.status) {
        let arr_res = [];
        data.result.map((res) => {
          arr_res.push(`https://${res.url}`);
        });
        setImageurldata(arr_res);
      }
    });
  };

  const handleDownloadImage = () => {
    if (!imgchoose) return;
    try {
      imgchoose.map((img, imgindex) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", img, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "blob";
        xhr.onload = () => {
          const blob = xhr.response;
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.style.display = "none";
          a.href = url;
          a.download = `comment-${props.selectinfo.student_code}-${imgindex}.jpeg`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        };
        xhr.send();
      });
    } catch (error) {
      console.error("download image error", error);
    }
  };

  useEffect(() => {
    console.log("selectedinfo >>>", props.selectinfo);
    handlegetstudentfile(props.selectinfo.Id);
    handlegetimgcomment(props.selectinfo.student_code, props.selectinfo.Id);
  }, []);

  useEffect(() => {
    console.log("imgchoose", imgchoose);
  }, [imgchoose]);

  useEffect(() => {
    console.log("ifream url", urlpdf);
  }, [urlpdf]);

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
          className="btn-backprocess"
          type="button"
          onClick={() => {
            props.backtowork("workDoctor");
          }}
        >
          {"ย้อนกลับ"}
        </button>
      </div>
      <div className="body-filecontent">
        <div className="menu-select-filecontent">
          <div className="box-menufile">
            <h2 style={{ marginLeft: "10px" }}>ตัวเลือก</h2>
            {/* <div className="boxmenufile-span-reason">
              <span>{"ไม่สามารถอัพโหลดไฟล์ที่มีขนาดเกิน 16 MB"}</span>
            </div> */}
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
                  // handleselectfile(props.selectinfo); //อัพไฟล์โดยตรงอันเดิม
                  handletrypdftoimg(e);
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
          <h3>{"รายการรูป คอมเม้น"}</h3>
          <div className="boxshow-comment-img">
            {imageurldata[0]
              ? imageurldata.map((ele, index_ele) => {
                  return (
                    <div className="img-peviewshow" key={index_ele}>
                      <img
                        src={ele}
                        id={`imgID-${index_ele}`}
                        onClick={() => {
                          Swal.fire({
                            imageUrl: `${ele}`,
                            showConfirmButton: false,
                            showCloseButton: true,
                            background: "none",
                          });
                        }}
                      ></img>
                      <div>
                        <input
                          type="checkbox"
                          onClick={() => {
                            if (imgchoose[0]) {
                              let pass = true;
                              let arr_chk = [];
                              imgchoose.map((chk) => {
                                if (chk === ele) {
                                  pass = false;
                                  document.getElementById(
                                    `imgID-${index_ele}`
                                  ).style.boxShadow = "none";
                                } else {
                                  arr_chk.push(chk);
                                }
                              });
                              if (pass) {
                                //ใหม่เพิ่มเข้า
                                setImgchoose([...imgchoose, ele]);
                                document.getElementById(
                                  `imgID-${index_ele}`
                                ).style.boxShadow =
                                  "0 0 2px 1px rgba(27, 119, 39, 0.8)";
                              } else {
                                //เก่าเพิ่มเข้า แต่ไม่นับที่เหมือนกัน
                                setImgchoose(arr_chk);
                              }
                            } else {
                              //ยังไม่ได้เพิ่ม
                              setImgchoose([ele]);
                              document.getElementById(
                                `imgID-${index_ele}`
                              ).style.boxShadow =
                                "0 0 2px 1px rgba(27, 119, 39, 0.8)";
                            }
                          }}
                        ></input>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          <div className="box-btndownload">
            <button
              type="button"
              onClick={() => {
                handleDownloadImage();
              }}
            >
              {"ดาวน์โหลด"}
            </button>
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
                  // handleselectfile(props.selectinfo); //อัพไฟล์โดยตรงอันเดิม
                  handletrypdftoimg(e);
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
                            handleopendropdownlistpdf(boxdroplistinfo);
                            setInfofilename({
                              filename: data.file_real,
                              date: data.date,
                            });
                            handleshowstudentimage(
                              props.selectinfo.Id,
                              data.work_date,
                              data.file_name
                            );
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
        <div className="show-file-filecontent">
          {urlpdf !== "" ? (
            <iframe
              src={urlpdf}
              style={{ width: "100%", height: "100%" }}
            ></iframe>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="waitprocess-box" id="processsWait">
        <Spinnerpage></Spinnerpage>
      </div>
    </div>
  );
};
export default ContentFile;
