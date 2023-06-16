import { useState } from "react";
import { handleModalNavSlide, handleOpenModalbox } from "../config/modalConfig";
import ModalNavSlide from "../modal/modalNavSlide";
import ModalBox from "../modal/modalBox";
import moment from "moment/moment";
import { objectMonth, showMonthwithTH } from "../config/monthth";

const ContentWork = () => {
  const docGetId = (id) => {
    return document.getElementById(id);
  };

  const [selectYear, setSelectYear] = useState(new Date().getFullYear());
  const [selectMonth, setSelectMonth] = useState(
    moment(new Date()).format("MM")
  );

  const [openfilter, setOpenfilter] = useState(false);
  const [openMonthdrop, setOpenMonthdrop] = useState(false);
  const [statusClosemodal, setStatusClosemodal] = useState(false);

  const changeyear = (mode) => {
    let thisyear = parseInt(selectYear);

    if (mode) {
      let result = thisyear + 1;
      setSelectYear(result);
    } else {
      let result = thisyear - 1;
      setSelectYear(result);
    }
  };

  const nonedropAtall = () => {
    let objectIDboxgrid = [
      {
        idbox: "boxTypeReport",
      },
      { idbox: "boxPersonport" },
      {
        idbox: "boxAgroup",
      },
      { idbox: "boxAstudent" },
    ];
    let objectIDdropid = [
      {
        iddrop: "dropInfoTypeReport",
      },
      { iddrop: "dropInfoPersonport" },
      { iddrop: "dropInfogroup" },
      { iddrop: "dropInfoStudent" },
    ];

    objectIDboxgrid.map((ele) => {
      docGetId(ele.idbox).classList.remove("positionRelativeBox");
    });
    objectIDdropid.map((ele) => {
      console.log(docGetId(ele.iddrop));
      if (docGetId(ele.iddrop)) {
        docGetId(ele.iddrop).style.display = "none";
      }
    });
  };

  const handleOpenDropdown = (id, box) => {
    let lengthtable = document.getElementsByClassName("table-show-info").length;
    let table = document.getElementsByClassName("table-show-info");

    console.log(id);
    if (!openMonthdrop) {
      if (docGetId(id).style.display === "block") {
        if (box) {
          docGetId(box).classList.remove("positionRelativeBox");
        }

        setOpenMonthdrop(false);
        for (let i = 0; i < lengthtable; i++) {
          table[i].style.position = "relative";
        }
        docGetId(id).style.display = "none";
      } else {
        if (box) {
          docGetId(box).classList.add("positionRelativeBox");
        }

        setOpenMonthdrop(true);

        for (let i = 0; i < lengthtable; i++) {
          table[i].style.position = "static";
        }
        docGetId(id).style.display = "block";
      }
    } else {
      if (docGetId(id).style.display === "block") {
        if (box) {
          docGetId(box).classList.remove("positionRelativeBox");
        }

        setOpenMonthdrop(false);
        docGetId(id).style.display = "none";
      } else {
        if (box) {
          nonedropAtall();
          docGetId(box).classList.add("positionRelativeBox");
        }

        for (let i = 0; i < lengthtable; i++) {
          table[i].style.position = "static";
        }
        docGetId(id).style.display = "block";
      }
    }
  };

  const handleContentmodal = () => {
    return (
      <div className="body-modalbox-contentwork">
        {/* แบบประเมิน */}
        <div className="rowinput-modalbox-contentwork">
          <div className="boxgrid-modal-contentwork">
            <span>{`แบบประเมิน`}</span>
          </div>
          <div className="boxgrid-modal-contentwork" id="boxTypeReport">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown("dropInfoTypeReport", "boxTypeReport");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfoTypeReport"
            ></div>
          </div>
        </div>
        {/* ผู้ประเมิน */}
        <div className="rowinput-modalbox-contentwork">
          <div className="boxgrid-modal-contentwork">
            <span>{`ผู้ประเมิน`}</span>
          </div>
          <div className="boxgrid-modal-contentwork" id="boxPersonport">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown("dropInfoPersonport", "boxPersonport");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfoPersonport"
            ></div>
          </div>
        </div>
        {/* กลุ่ม */}
        <div className="rowinput-modalbox-contentwork">
          <div className="boxgrid-modal-contentwork">
            <span>{`กลุ่ม`}</span>
          </div>
          <div className="boxgrid-modal-contentwork" id="boxAgroup">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown("dropInfogroup", "boxAgroup");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfogroup"
            ></div>
          </div>
        </div>
        {/* นักศึกษาแพทย์ */}
        <div className="rowinput-modalbox-contentwork">
          <div className="boxgrid-modal-contentwork">
            <span>{`นศพ`}</span>
          </div>
          <div className="boxgrid-modal-contentwork" id="boxAstudent">
            <input
              className="input-rowinput-modalboxContentwork"
              type="text"
            ></input>
            <button
              className="btn-rowinput-modalboxContentwork"
              onClick={() => {
                handleOpenDropdown("dropInfoStudent", "boxAstudent");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropInfo-boxgrid-contentwork"
              id="dropInfoStudent"
            ></div>
          </div>
        </div>
        <div className="box-datetime-contentwork">
          <div className="col-datetime-contentwork">
            <div className="rowinput-modalbox-contentwork">
              <div className="timegrid-modal-contentwork">
                <span>{`วันที่`}</span>
              </div>
              <div className="timegrid-modal-contentwork">
                <input
                  className="input-rowinput-modalboxContentwork"
                  type="date"
                ></input>
              </div>
            </div>
            <div className="rowinput-modalbox-contentwork">
              <div className="timegrid-modal-contentwork">
                <span>{`เวลา`}</span>
              </div>
              <div className="timegrid-modal-contentwork">
                <div className="boxinputtimeContentwork">
                  <input type="number" className="input-timeSTS"></input>
                  <span style={{ fontSize: "15px" }}>{":"}</span>
                  <input type="number" className="input-timeSTS"></input>
                </div>
                <span style={{ margin: "0 5px" }}>{"ถึง"}</span>
                <div className="boxinputtimeContentwork">
                  <input type="number" className="input-timeSTS"></input>
                  <span style={{ fontSize: "15px" }}>{":"}</span>
                  <input type="number" className="input-timeSTS"></input>
                </div>
              </div>
            </div>
          </div>
          <div className="col-datetimesubmit-contentwork">
            <button className="btn-confirm-modalContentwork" type="button">
              {"บันทึก"}
            </button>
          </div>
        </div>
        <div className="box-special-modalboxcontentwork">
          {/* <div className="infoHeade-special-boxcontentwork">
            <div className="special-input-boxcontentwork">
              <div>
                <span>{"หัวข้อเรื่อง"}</span>
              </div>
              <div>
                <input type="input"></input>
                <button>
                  <i className="bi-caret-down"></i>
                </button>
              </div>
            </div>
          </div> */}

          <div className="inforeport-special-boxcontentwork">
            <div className="special-report-boxcontentwork">
              <div className="box-report-input">
                <div>
                  <span>{"หอผู้ป่วย"}</span>
                </div>
                <div className="inputradio-special-boxcontentwork">
                  <div>
                    <input type="radio"></input>
                    <span>{"test"}</span>
                    <input type="radio"></input>
                    <span>{"test"}</span>
                    <input type="radio"></input>
                    <span>{"test"}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="special-report-boxcontentwork">
              <div className="box-report-input">
                <div>
                  <span>{"การวินิจฉัย"}</span>
                </div>
                <div className="col-boxreport-input">
                  <div className="sub-col-boxreport">
                    <div className="input-special-boxcontentwork">
                      <input type="text"></input>
                    </div>
                  </div>
                  <div className="sub-col-boxreport">
                    <div className="grid-date-subcol">
                      <div>
                        <span>{"วันที่ผู้ป่วย Admit"}</span>
                      </div>
                      <div className="date-special-boxcontentwork">
                        <input type="date"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-report-input">
                <div>
                  <span>{"ชื่อผู้ป่วย"}</span>
                </div>
                <div className="col-boxreport-input">
                  <div className="sub-col-boxreport">
                    <div className="input-special-boxcontentwork">
                      <input type="text"></input>
                    </div>
                  </div>
                  <div className="sub-col-boxreport">
                    <div className="grid-date-subcol">
                      <div>
                        <span>{"วันที่จ่าย/รับผู้ป่วย"}</span>
                      </div>
                      <div className="date-special-boxcontentwork">
                        <input type="date"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box-report-input">
                <div>
                  <span>{"เลขที่โรงพยาบาล"}</span>
                </div>
                <div className="col-boxreport-input">
                  <div className="sub-col-boxreport">
                    <div className="input-special-boxcontentwork">
                      <input type="text"></input>
                    </div>
                  </div>
                  <div className="sub-col-boxreport">
                    <div className="grid-date-subcol">
                      <div>
                        <span style={{ fontSize: "11px" }}>
                          {"วันที่ส่งรายงานผู้ป่วย"}
                        </span>
                      </div>
                      <div className="date-special-boxcontentwork">
                        <input type="date"></input>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="body-contentwork"
      onClick={(e) => {
        if (e.target === docGetId("NavSlideMOdal")) {
          setOpenfilter(false);
          handleModalNavSlide(
            false,
            "NavSlideMOdal",
            "bodyNavslideModal",
            "contentNavslideModle"
          );
        }
      }}
    >
      <div className="header-contentwork">
        <div className="box-textheader-contentwork">
          <h3>{`จัดกลุ่มงานประเมิน`}</h3>
          <button
            className="btn-menu-filter"
            type="button"
            id="btnfilterWork"
            style={!openfilter ? {} : { display: "none" }}
            onClick={() => {
              setOpenfilter(true);
              handleModalNavSlide(
                true,
                "NavSlideMOdal",
                "bodyNavslideModal",
                "contentNavslideModle"
              );
            }}
          >
            <i className="bi-funnel i-btn-filter"></i>
          </button>
          <button
            className="close-btn-menu-filter"
            id="btnclosefilterwork"
            style={openfilter ? { display: "block" } : { display: "none" }}
            type="button"
            onClick={() => {
              setOpenfilter(false);
              handleModalNavSlide(
                false,
                "NavSlideMOdal",
                "bodyNavslideModal",
                "contentNavslideModle"
              );
            }}
          >
            <i className="bi-x-lg i-btn-filter"></i>
          </button>
        </div>
        <div className="box-btnclosebody-contentwork">
          <button className="btn-closebody-contentwork">{"ปิด"}</button>
        </div>
      </div>
      <div className="menu-nav-contentwork">
        {/* menu year */}
        <div className="contentwork-year">
          <span>{"ปี"}</span>
          <input
            type="number"
            className="input-year-contentwork"
            value={selectYear}
            onChange={(e) => {
              setSelectYear(e.target.value);
            }}
            onFocus={(e) => e.target.select()}
          ></input>
          <div className="box-buttonUPDOWN">
            <button
              className="this-up-year"
              onClick={() => {
                changeyear(true);
              }}
            >
              <i className="bi-caret-up"></i>
            </button>
            <button
              className="this-down-year"
              onClick={() => {
                changeyear(false);
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
          </div>
        </div>
        {/* menu month */}
        <div className="contentwork-month">
          <div>
            <span>{"เดือน"}</span>
          </div>
          <div className="dropDownBox-monthContentwork">
            <input
              type="text"
              className="input-month-contentwork"
              value={showMonthwithTH(selectMonth)}
              onChange={(e) => {
                setSelectMonth(e.target.value);
              }}
              onFocus={(e) => e.target.select()}
            ></input>
            <button
              className="this-month-drop"
              onClick={() => {
                handleOpenDropdown("dropMonthContentwork");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div className="dropinfo-Contentwork" id="dropMonthContentwork">
              {objectMonth().map((res, index) => {
                return (
                  <div
                    className="lineMonthDropinfo-contentwork"
                    key={index}
                    onClick={() => {
                      handleOpenDropdown("dropMonthContentwork");
                      setSelectMonth(res.mnum);
                    }}
                  >
                    <span>{res.mth}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* menu group */}
        <div className="contentwork-group">
          <div>
            <span>{"กลุ่ม"}</span>
          </div>
          <div className="dropDownBox-groupContentwork">
            <input type="text" className="input-group-contentwork"></input>
            <button
              className="this-group-drop"
              onClick={() => {
                handleOpenDropdown("dropGroupContentwork");
              }}
            >
              <i className="bi-caret-down"></i>
            </button>
            <div
              className="dropinfo-Contentwork"
              id="dropGroupContentwork"
            ></div>
          </div>
        </div>
        {/* menu buttonAll */}
        <div className="contentwork-buttonAll">
          <button type="button">{"งานทั้งหมด"}</button>
        </div>
        {/* menu radiobtn */}
        <div className="this-radiobtn-contentwork">
          <div className="row-radiobtn">
            <input type="radio"></input>
            <span>{"ทั้งหมด"}</span>
          </div>
          <div className="row-radiobtn">
            <input type="radio"></input>
            <span>{"ค้างประเมิน"}</span>
          </div>
          <div className="row-radiobtn">
            <input type="radio"></input>
            <span>{"ประเมินแล้ว"}</span>
          </div>
        </div>
      </div>
      <div className="boxcontent-contentwork">
        <div className="box-content">
          <div className="row-info-contentwork">
            <div className="col-info-contentwork">
              <table className="table-show-info" style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th>{"งานประเมิน"}</th>
                    <th>{"ประเภท"}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width={"90%"}>{"(งานประเมิน)"}</td>
                    <td width={"10%"}>{"(ประเภท)"}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-info-contentwork">
              <div className="title-info-contentwork">
                <span>{"Case&Topic ผู้นำเสนอ"}</span>
              </div>
              <div className="infoBoxcol-relative-contentwork">
                <table className="table-show-info">
                  <thead>
                    <tr>
                      <th>{"วันที่"}</th>
                      <th>{"เวลา"}</th>
                      <th>{"กลุ่ม"}</th>
                      <th>{"อาจารย์"}</th>
                      <th>{"นักศึกษา"}</th>
                      <th>{"UP"}</th>
                      <th>{"C"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{"(วันที่)"}</td>
                      <td>{"(เวลา)"}</td>
                      <td>{"(กลุ่ม)"}</td>
                      <td>{"(อาจารย์)"}</td>
                      <td>{"(นักศึกษา)"}</td>
                      <td>{"(UP)"}</td>
                      <td>{"(C)"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="title-header-contentwork">
            <h4>{"รายละเอียดงานของอาจารย์"}</h4>
          </div>
          <div className="row-info-contentwork">
            <div className="col-info-contentwork">
              <div className="infoBoxcol-relative-contentwork">
                <table className="table-show-info" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>{`อาจารย์`}</th>
                      <th>{`จำนวน`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td width={"90%"}>{`(อาจารย์)`}</td>
                      <td width={"10%"}>{`(จำนวน)`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-info-contentwork">
              <div className="infoBoxcol-relative-contentwork">
                <table className="table-show-info" style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th>{`งานประเมินสะสม`}</th>
                      <th>{`จำนวน`}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td width={"90%"}>{`งานประเมินสะสม`}</td>
                      <td width={"10%"}>{`จำนวน`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div className="box-content">
          <div className="boxcontent-btnmenu-contentwork">
            <button
              className="btn-menu-contentwork"
              type="button"
              onClick={() => {
                handleOpenModalbox("boxAddworkDoctor");
              }}
            >
              {"เพิ่ม"}
            </button>
          </div>
          <div className="boxcontent-btnmenu-contentwork">
            <button className="btn-menu-contentwork" type="button">
              {"ลบ"}
            </button>
          </div>
        </div>
      </div>
      <ModalNavSlide
        idbox={"NavSlideMOdal"}
        selectyear={selectYear}
        yearselect={setSelectYear}
        openDrop={openMonthdrop}
        setopenDrop={setOpenMonthdrop}
      ></ModalNavSlide>
      <ModalBox
        idbox={"boxAddworkDoctor"}
        thisTitle={"เพิ่มข้อมูลงาน"}
        statusClose={setStatusClosemodal}
        content={handleContentmodal()}
      ></ModalBox>
    </div>
  );
};
export default ContentWork;
